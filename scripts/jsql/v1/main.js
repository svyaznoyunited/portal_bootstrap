const Q_KEYWORDS = ['SELECT', 'WHERE']

function Q_KW_PARSE(name, value) {
  let object = new Object();
  object[name] = { INDEX: value };
  return object;
}
class JSQLArray {
	constructor(array) {
		this.A = array;
		this.len = this.A.length
    return this;
	}

	add(data) {
		this.A.push(data);
		this.len = this.A.length;
		return this.len;
	}
	JSQL(string) {
    return JSQL(this, string);
	}
}


function JSQL(context, string) {
  string = string.replace(/\n/g, '').replace(/\t/g, ' ');
  let parsedString = {}
  for ( let elem in Q_KEYWORDS ) {
    parsedString[ Q_KEYWORDS[ elem ] ] = {}
    parsedString[ Q_KEYWORDS[ elem ] ].index = string.indexOf( Q_KEYWORDS[ elem ] )
  }

  parsedString.SELECT.string = "";
  parsedString.WHERE.string = "";

  for (let i in string) {
    if ( i < parsedString.WHERE.index ) {
      parsedString.SELECT.string += string[i];
    } else {
      parsedString.WHERE.string += string[i];
    }
  }

  return parsedString;

}

const A = function(Array=[]) {
  return new JSQLArray(Array);
}
