class FormRows {
  constructor() {
    this.aRows = [];
    this.configTypes = [
      {
        name: 'Переключатель'
        ,constructor: class Switcher {
          constructor( rowIndex ) {
            this.type = 'switcher';
            this.min = '';
            this.max = '';
            this.rowIndex = rowIndex;
            this.domObj = [];
          }

          __initDOM__() {
            this.domObj = [
              $('<input>', {
                'type': 'number'
                ,'class': 'form-control'
                ,'id': `row_${this.rowIndex}_config_min`
                ,'maxlength': '50'
                ,'placeholder': 'Баллы мин.'
                ,'value': this.min
                ,'onkeyup': `RC.aRows[${this.rowIndex}].configSet('min', this.value)`
                ,css: {
                  'margin-bottom': '1rem'
                }
              })
              ,$('<input>', {
                'type': 'number'
                ,'class': 'form-control'
                ,'id': `row_${this.rowIndex}_config_max`
                ,'maxlength': '50'
                ,'placeholder': 'Баллы макс.'
                ,'value': this.max
                ,'onkeyup': `RC.aRows[${this.rowIndex}].configSet('max', this.value)`
                ,css: {
                  'margin-bottom': '1rem'
                }
              })
            ]
          }

        }
      },{
        name: 'Вариатор'
        ,constructor: class Range {
          constructor( rowIndex ) {
            this.type = 'range';
            this.min = '';
            this.max = '';
            this.step = '';
            this.rowIndex = parseInt(rowIndex);
            this.domObj = [ ];
          }

          __initDOM__() {
            this.domObj = [
              $('<input>', {
                'type': 'number'
                ,'class': 'form-control'
                ,'id': `row_${this.rowIndex}_config_min`
                ,'maxlength': '50'
                ,'placeholder': 'Баллы мин.'
                ,'value': this.min
                ,'onkeyup': `RC.aRows[${this.rowIndex}].configSet('min', this.value)`
              })
              ,$('<input>', {
                'type': 'number'
                ,'class': 'form-control'
                ,'id': `row_${this.rowIndex}_config_max`
                ,'maxlength': '50'
                ,'placeholder': 'Баллы мaкс.'
                ,'value': this.max
                ,'onkeyup': `RC.aRows[${this.rowIndex}].configSet('max', this.value)`
                ,css : {
                  'margin': '1rem 0 1rem'
                }
              })
              ,$('<input>', {
                'type': 'number'
                ,'class': 'form-control'
                ,'id': `row_${this.rowIndex}_config_step`
                ,'maxlength': '50'
                ,'placeholder': 'Шаг'
                ,'value': this.step
                ,'onkeyup': `RC.aRows[${this.rowIndex}].configSet('step', this.value)`
                ,css : {
                  'margin-bottom': '1rem'
                }
              })
            ]
          }

        }
      }
    ]
  }

  save() {

    let json = {
      name: $('#materialRegisterFormFirstName').val()
      ,array: []
    }

    for (let elem in this.aRows) {
      var a = this.aRows[elem];
      json.array.push({
        index: a.index
        ,name: a.name
        ,typeIndex: a.type
        ,type: a.configObj.type
        ,values: {
          min: a.configObj.min,
          max: a.configObj.max,
          step: ( typeof a.configObj.step == "undefined" ) ? null : a.configObj.step
        }
      });
    }

    console.log( json );

    $.ajax({
      url: G.ApiUrl + 'set_data.html'
      ,method: "POST"
      ,data: {
        name: json.name
        ,object_id: G.object_id
        ,json: JSON.stringify(json)
        ,user: '6675262515522859746'
      }
      ,success: function(e) {
        G.object_id = JSON.parse(e).objectId;
      }
    });

  }

  index() {

    $("#form_row_data").html('');

    for (let row in this.aRows) {
      this.aRows[row].index = row;
      this.aRows[row].__init__();

    }
  }

  remove(index) {
    this.aRows.splice(index, 1);
    this.index();
  }

  new() {
    this.aRows.push(new FormRow(this.configTypes));
    this.index();
  }
}

class FormRow {

  constructor(configTypes) {
    this.name = "";
    this.type = 999;
    this.config = "";
    this.configObj = null;
    this.index = null;
    this.domObj = null;
    this.configTypes = configTypes;
  }

  nameSet() {
    this.name = $('#row_'+this.index+'_name').val();
  }

  typeSet(type=null) {
    if ( type == null ) {
      this.type = $('#row_'+this.index+'_type').val();
    } else {
      this.type = type;
      $('#row_'+this.index+'_type').val(type);
    }
    this.configObj = new RC.configTypes[this.type].constructor(this.index);
    this.configObj.__initDOM__()
  }

  configSet(paramName, value) {
    let iValue = parseInt(value);
    this.configObj[paramName] = iValue;
    this.configObj.__initDOM__();
  }

  __init__() {

    this.domObj = $('<div>', {
      'class': 'row'
      ,css: {
        'margin': '1rem'
      }
    }).append('<div>', {
      'class': 'col-3'
    }).append('<div>', {
      'class': 'md-form'
    });

    $(this.domObj).append([
      $('<div>', {
        'class': 'col-6'
      }).append([
        $('<input>', {
          'onkeyup': `RC.aRows[${this.index}].nameSet()`
          ,'type': 'text'
          ,'class': 'form-control'
          ,'id': `row_${this.index}_name`
          ,'maxlength': '300'
        }).val(this.name)
        ,$('<label>', {
          'for': `row_${this.index}_name`
        })
      ]),
      ,$('<div>', {
        'class': 'col-3'
      }).append([
        $('<select>', {
          'onchange': `RC.aRows[${this.index}].typeSet()`
          ,'id': `row_${this.index}_type`
          ,'class': 'form-control'
        }).append(this.configTypesDom()).val(this.type)
      ])
      ,$('<div>', {
        'class': 'col-2'
      }).append([
        $('<button>', {
          'class': 'setting-button form-control btn btn-info'
          ,'onclick': 'javascript:PopUpShow('+this.index+')'
          ,css: {
            'margin': '3px'
          , 'padding': '0'
          }
        }).append('Настроить')
      ])
      ,$('<div>', {
        'class': 'col'
      }).append([
        $('<span>', {
          'class': 'close'
          ,'onclick': `RC.remove(${this.index})`
        })
      ])
    ]).appendTo("#form_row_data");
  }

  configTypesDom() {
    let returnDOM = []

    returnDOM.push(
      $('<option>', {
        'class': 'mdb-select md-form'
        ,'selected': true
        ,'disabled': true
        ,'value': 999
      }).append('Выберите тип оценки')
    );

    for (let elem in this.configTypes) {
      returnDOM.push(
        $('<option>', {
          'value': elem
        }).append(this.configTypes[elem].name)
      );
    }

    return returnDOM;
  }

}

let RC;



function PopUpShow(index){
  $('#configSetFeilds').html('');
  try {
    $('#configSetFeilds').append(RC.aRows[index].configObj.domObj);
    $("#popup1").show();
  } catch(errGetDomByIndex) {
    console.error(errGetDomByIndex);
    alert('Выбери тип оценки!');
  }

}
function PopUpHide(){
    $("#popup1").hide();
}


function getData(id, v) {
  $.ajax({
    url: G.AppUrl + 'data/lists/' + id + '.json?v='
    ,contentType: 'application/json'
    ,dataType: 'json'
    ,success: function(e) {
      $('#materialRegisterFormFirstName').val(e.name);
      $('#materialRegisterFormFirstName').change();
      for (elem in e.array) {
        var row = e.array[elem]
        RC.new()
        RC.aRows[elem].name = row.name;
        RC.aRows[elem].typeSet(row.typeIndex);

        for (vals in row.values) {
          RC.aRows[elem].configSet(vals, row.values[vals]);
        }
      }
      RC.index();
    }
  });
}

let AJAXLoads = $('<div>', {
  'id': 'loader_background'
  ,'onclick': 'function() {return false}'
  ,css: {
    'position': 'fixed'
    ,'z-index': '10000'
    ,'height' : '100%'
    , 'width' : '100%'
    ,'background-color': 'rgba(255,255,255,0.6)'
    ,'top': '0'
    ,'left': '0'
    ,'transition': '300ms linear'
  }
}).append([$('<div>', {
  'id' : 'loader'
  ,css: {
    'position': 'relative'
    ,'border' : '5px solid #f3f3f3'
    ,'border-radius' : '50%'
    ,'border-top' : '5px solid #4c1e87'
    ,'width' : '150px'
    ,'height' : '150px'
    ,'-webkit-animation' : 'spin 1s linear infinite'
    ,'animation' : 'spin 1s linear infinite'
    ,'z-index': '10001'
    ,'margin' : 'auto'
    ,'top' : '40%'
  }
}), $('<div>', {
  'id' : 'err_message'
  ,css: {
    'position': 'relative'
    ,'border' : 'none'
    ,'width' : 'max-content'
    ,'height' : 'max-content'
    ,'z-index': '10001'
    ,'margin' : 'auto'
    ,'top' : '40%'
    ,'color': '#fefefe'
    ,'display' : 'none'
  }
}).append([ $('<span>', {
  css: {
    'font-size': ''
    ,'font-weight': 'bold'
  }
}).append('<h5>Произошла ошибка:<h5><br/>')
  ,$('<span>', {
    'id': 'err-message-content'
    , css: {
      'font-size': ''
  }}).append('errText')
])
  ]);

$(document).ajaxStart(function(){
  AJAXLoads.appendTo('body');
  AJAXLoads.css('background-color', 'rgba(255, 0, 0, 0, 0.5)');
});

$(document).ajaxError(function(event, xhr, settings, error){
  AJAXLoads.css('background-color', '#ff2400');
  $('#err-message-content').text(`${settings.url} : ${error}`)
  $('#loader').fadeOut(300);
  $('#err_message').fadeIn(300);
  console.error(event, xhr, settings, error)
  
});

$(document).ajaxSuccess(function(event, xhr, settings){
  AJAXLoads.remove();
});
