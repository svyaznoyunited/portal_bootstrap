const print = function() {
  for ( i in arguments ) {
    console.log( arguments[i] );
  }
  return arguments.length;
}

// Упрощённое общение с API
const $ObjFromAPI = ( RequestData ) => {
  var response;
  var dataToSend = {};
  for ( elem in RequestData ) {
    dataToSend[elem] = RequestData[elem];
  }
  $.ajax({
    url: window.location.origin + '/api/v1/$.html'
    ,method: 'GET'
    ,async: false
    ,contentType: 'application/json'
    ,dataType: 'json'
    ,data: dataToSend
    ,success: function( data ) {
      response = data;
    }
  });
  return response;
}

//Пустышка для использования как значение по умолчанию
const EmptyFunc = () => null;

//Быстрый доступ к текстовым представлениям тегов
const HTMLTagAlias = {
  d: '<div>'
  ,s: '<span>'
  ,i: '<input>'
  ,o: '<option>'
  ,l: '<label>'
}

//Алиас для упрощённого доступа
var $H = HTMLTagAlias;

//Обёртки DOM
const $WRAPPERS = {
  TextField: ( dataField, labelText ) => [
    dataField
    ,$( $H.l, { 'for': dataField[0].id, 'text': labelText } )
  ]
}

//Псевдореактивные поля для моделей и некоторые функции для работы с ними
var $RX = {
  TextField: function(
    Model
    ,field
    ,classlist=''
    ,onchange=EmptyFunc
  ) {
    var input = $($H.i, {
      'type': 'text'
      ,'class': classlist
      ,'id': Model.name + '-' + field + '-' + Model.data.id
    });
    input.val( Model.data[field] );
    input[0].onchange = function() {
      Model.saved = false;
      Model.data[field] = this.value;
    }
    return input;
  }
  ,SelectField: function(
    Model
    ,field
    ,classlist=''
    ,options=[]
    ,onchange=EmptyFunc
  ) {
    var input = $($H.i, {
      'type': 'text'
      ,'class': 'selectpicker ' + classlist
      ,'data-live-search': 'true'
      ,'data-width': '100%'
      ,'id': Model.name + '-' + field + '-' + Model.data.id
    });
    for ( o in options ) {
      input.append( $( $H.o, {
        'value': options[o].value
        ,'text': options[o].text
      }));
    }
    input.val( Model.data[ field ] );
    input[0].onchange = function() {
      Model.saved = false;
      Model.data[ field ] = this.value;
      onchange();
    }
    return input;
  }
  ,SelectUpdate: ( select, newData ) => {
    select.val( null )
    select.html( '' );
    for ( o in newData ) {
      select.append( $( $H.o, { 'value': newData[o].value, 'text': newData[o].text  }) );
    }
    select.selectpicker( 'refresh' );
  }
}

//Дефолты
const $DEFAULT = {
  ModelCallbacks: {
    onBeforeInit: EmptyFunc
    ,onInit: EmptyFunc
    ,onDestroy: EmptyFunc
    ,onSave: EmptyFunc
  }
  ,ModelTemplate: () => $( $H.d, { 'class': 'container' })
}


//Модель
const $MODEL = function(modelObj={
  name:'Noname'
  ,data:{}
  ,template:$DEFAULT.ModelTemplate()
  ,callbacks:$DEFAULT.ModelCallbacks
  ,childconfig: {}
  ,parent: null
}) {

  modelObj.callbacks.onBeforeInit();

  this.__parent__ = modelObj.parent;

  if ( modelObj.data ) {
    this.saved = true;
    this.new = false;
  } else {
    this.saved=this.new=false;
  }

  this.name = modelObj.name;
  //Реальные данные
  this.data = modelObj.data;

  //DOM представления данных
  this.views = {};
  //На случай предварительной инициализации jQuery объектов
  this.viewsByType = {
    text: []
    ,select: []
  };

  this.TextField = ( field, classlist='', onchange=EmptyFunc ) => {
    this.views[ field ] = new $RX.TextField( this, field, classlist, onchange );
    this.viewsByType.text.push( this.views[ field ] );
  }

  this.SelectField = ( field, classlist='', options=[], onchange=EmptyFunc ) => {
    this.views[ field ] = new $RX.SelectField( this, field, options, classlist, onchange );
    this.viewsByType.select.push( this.views[ field ] );
  }

  //Разрешаем детей модельке
  this.childConfig = (params={
    name: 'Noname'
    ,template:$DEFAULT.ModelTemplate()
    ,callbacks:$DEFAULT.ModelCallbacks
    ,hasChilds:false
    ,childsConfig:{}
  }) => {
    this.childs = [];
    this.__childconfig__ = {
       name: params.name
       ,template: params.template
       ,callbacks: params.callbacks
       ,childConfig: params.childsConfig
    }
  }

  if ( modelObj.childconfig ) {
    this.childConfig( modelObj.childconfig );
  }

  //Добавление детёныша
  this.addChild = ( data ) => {
    if ( !this.__childconfig__ ) {
      console.error( 'Дочерние элементы не сконфигурированы.' );
      return false;
    }
    this.childs.push( new $MODEL({
      name:this.__childconfig__.name
      ,data: data
      ,template:this.__childconfig__.template
      ,callbacks: this.__childconfig__.callbacks
      ,childConfig: this.__childconfig__.childsConfig
      ,parent: this
    }));
  }

  //Модель готова
  modelObj.callbacks.onInit();

};
