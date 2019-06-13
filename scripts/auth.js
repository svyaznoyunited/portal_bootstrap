function mix( string ) {
	let data;
	let mark;
	let token;
	$.ajax({
		url: G.ApiPath + 'get_token.html'
		,dataType: 'json'
		,async: false
		,contentType: 'application/json'
		,success: function( e ) {
			data = e.data;
			mark = e.mark;
			token = e.token;
		}
	});
	let list = new SmartArray( data.split('') );
	let res = [];
	G.token = token;
	for ( ch in string ) {
		 let code = list.find( { val: string[ch], return: 'data' } )[0].name;
		 res.push( code );
	}
	return res.join( mark );
}

function unmix( string ) {
	let data;
	let mark;
	let token;
	$.ajax({
		url: G.ApiPath + 'get_token.html'
		,dataType: 'json'
		,async: false
		,contentType: 'application/json'
		,success: function( e ) {
			data = e.data;
			mark = e.mark;
			token = e.token;
		}
	});
	let list = data.split( '' );
	let aString = string.split( mark );
	let res = [];
	
	for (ch in aString) {
		console.log( aString[ch], list )
		res.push( list[aString[ch]] );
	}
	return res.join('');
}