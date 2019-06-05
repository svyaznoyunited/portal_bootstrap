class Select {
    constructor(name, dataSource=null, onchange=function() { return null }) {
        this.dataSourse = G.ApiPath + dataSource;
        this.name = name;
        this.techname = name.replace(/\s/g, '');
        this.onchange = onchange;
        this.value = null;
        this.httpData = null;
        this.DOM = $('<div>', {
            'class': 'col-sm-12'
        }).append([
            $('<div>', {
                css: {
                    'margin': '1rem 0 1rem',
                    'text-transform': 'uppercase',
                    'font-weight': '300',
                    'letter-spacing': '5px'
                }
            }).append(`<strong>${this.name}</strong>`)
            ,$('<div>', {
                'class': 'dropdown bootstrap-select dropup'
            }).append($('<select>', {
                'class': 'selectpicker'
                ,'data-live-search': 'true'
                ,'tabindex': '-98'
            }).append('<option selected disabled>Выберите из списка</option>'))
        ]);
        if (dataSource != null) {
            this.getData();
        }
    }

    getData() {
        let self = this;
        $.ajax({
            url: self.dataSourse
            ,contentType: 'application/json'
            ,dataType: 'json'
            ,data: this.httpData
            ,success: function(e) {
                $(self.DOM.children()[1].children[0]).children('select').html("<option selected disabled>Выберите из списка</option>");
                for (let elem in e) {
                    $(self.DOM.children()[1].children[0]).children('select').append($('<option>', {
                        'value': e[elem].id
                    }).append(e[elem].name));
                }
                $('.selectpicker').selectpicker('refresh');
            }
        });
    }

    customOptions( array ) {
        for (i in array) {
            $(this.DOM.children()[1].children[0]).append($('<option>', {
                'value': array[i][0]
            }).append( array[i][1] ));
        }
        $('.selectpicker').selectpicker('refresh');
    }

    init() {
        let self = this;
        self.DOM.appendTo('#selects');
        $(self.DOM.children()[1].children[0]).on('change', function() {
            self.value = $(this).val();
            self.onchange();
        });
    }

    reinit() {
        this.getData();
    }

}

class Selects {
    constructor() {
        this.a = [];
    }
    new(a, b) {
        this.a.push(new Select(a, b));
    }
    init() {
        for (i in this.a) {
            this[this.a[i].techname] = this.a[i];
        }
    }
    initChilds() {
        for (i in this.a) {
            this.a[i].init();
        }
    }
    getQualification() {
        let self = this;
        $.ajax({
            url: G.ApiPath + 'init_education_plan.html'
            ,contentType: 'application/json'
            ,dataType: 'json'
            ,data: {
                city_id: self.Город.value
                ,merch_id: self.Торговаяточка.value
                ,position_id: self.Должность.value
                ,type: self.Тип.value
                ,person_id: G.User           
            },success: function( e ) {
                console.log( e );
            } 
            
        
        });
    }
}