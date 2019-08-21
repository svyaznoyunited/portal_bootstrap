function InputSelectRF( Model, field, id, options=[], onchange=function(){ /*pass*/ } ) {
  var sp = $( h.sp, { 'id': id,'class': c.spr, 'data-live-search': 'true', 'data-width': '100%' } );
  for ( o in options ) {
    sp.append( $(h.o, { 'value': options[o].val, 'text': options[o].name  }) );
  }
  sp.val( Model.data[ field ] );
  sp[0].onchange = function() {
    Model.saved = false;
    Model.data[ field ] = this.value;
    onchange();
  }
  return sp;
}
function SPUpdate( spInstance, newData ) {
  spInstance.html( '' );
  for ( o in newData ) {
    spInstance.append( $(h.o, { 'value': newData[o].val, 'text': newData[o].name  }) );
  }
  spInstance.selectpicker( 'refresh' );
}
function InputTextRF( Model, field, id  ) {
  var input = $( h.in, { 'type': 'text', 'class': c.fcl, 'id': id } );
  input.val( Model.data[field] );
  input[0].oninput = function() {
    Model.saved = false;
    Model.data[field] = this.value;
  }
  return input;
}

function DelBtnInstance( model ) {
  var delBtn = $( h.bt, { 'class': c.close, 'text': '✖', css: { 'position': 'absolute', 'right': '1rem', 'top': '1rem','z-index': '950' } } );
  delBtn[0].onmouseenter = function() {
      $(this).parent().addClass( 'del-danger' );
  }
  delBtn[0].onmouseleave = function() {
      $(this).parent().removeClass( 'del-danger' );
  }
  delBtn[0].onclick = function() {
    $( this ).parent().remove();
    model.parent.removeChild( model );
  }
  return delBtn;
}
