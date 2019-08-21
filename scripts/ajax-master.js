var LOADING = $('<div>', {
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

$('<style>').append(`
@keyframes spin {
	0% {
		transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		-webkit-transform: rotate(0deg);
		}
	100% {
		transform: rotate(360deg);
		-ms-transform: rotate(360deg);
		-webkit-transform: rotate(360deg);
		}
	}
-webkit-@keyframes spin {
	0% {
		transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		-webkit-transform: rotate(0deg);
		}
	100% {
		transform: rotate(360deg);
		-ms-transform: rotate(360deg);
		-webkit-transform: rotate(360deg);
		}
	}
`).appendTo('head');

function Loading( target ) {
	LOADING.appendTo( target ? target : 'body' );
}
function Loaded() {
	LOADING.fadeOut( 300, function() {
		LOADING.remove();
	} );
	LOADING.fadeIn();
}
$(document).ajaxStart(function(){
  Loading();
  LOADING.css('background-color', 'rgba(255, 0, 0, 0, 0.5)');
});
$(document).ajaxError(function(event, xhr, settings, error){
  LOADING.css('background-color', '#ff2400');
  $('#err-message-content').text(`${settings.url} : ${error}`)
  $('#loader').fadeOut(300);
  $('#err_message').fadeIn(300);
  console.error(event, xhr, settings, error);
  
});

$(document).ajaxSuccess(function(event, xhr, settings){
  Loaded();
});
