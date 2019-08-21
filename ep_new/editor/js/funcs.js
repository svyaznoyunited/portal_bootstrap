function print() {
  for ( arg in arguments ) {
    console.log( arguments[arg] )
  }
}
function toUrlStr( obj ) {
  strObj = '';
  try {
    strObj = JSON.stringify( obj );
  } catch( errParseObjToUrlString ) {
    strObj = JSON.stringify( { err: errParseObjToUrlString } );
  }
  return strObj;
}
function ObjectFromAPI( RequestData ) {
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

function InputTextInstance( dataField, labelText ) {
  return [
    dataField
    ,$( h.lb, { 'for': dataField[0].id, 'text': labelText } )
  ]
}
