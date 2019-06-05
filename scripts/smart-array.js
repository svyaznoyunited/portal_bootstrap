class SmartArray {
	constructor( array ) {
		this.a = array;
		this.data = this.sort( array );
		
		this.len = array.length;
	}

	sort( array ) {
		let context = { };
		for ( let i in array ) {
			if ( typeof array[i] == 'object' ) {
				context[i] = this.sort( array[i] );
			} else {
				context[i] = { 
					val: array[i]
					, lastChild: true 
					, parent: context
					, name: i
				};
			}
		}
		return context;
	}

	find( a, b, c='=' ) {
		let result = [];
		for ( let i in this.data ){
			switch( c ) {
                case '=':
					if ( this.xPath( i + a ) === b ) {
						result.push( this.a[i] );
					}
					break;
                case '!=':
					if ( this.xPath( i + a ) !== b ) {
						result.push( this.a[i] );
					}
					break;
                case '<':
					if ( this.xPath( i + a ) < b ) {
						result.push( this.a[i] );
					}
					break;
                case '>':
					if ( this.xPath( i + a ) > b ) {
						result.push( this.a[i] );
					}
					break;
                case '<=':
					if ( this.xPath( i + a ) <= b ) {
						result.push( this.a[i] );
					}
					break;
                case '>=':
					if ( this.xPath( i + a ) >= b ) {
						result.push( this.a[i] );
					}
					break;
				case '~':
					try {
						if ( this.xPath( i + a ).indexOf( b ) != -1 ) {
							result.push( this.a[i] );
						}
					} catch (errGetStr) {
						console.error( errGetStr );
					}
					break;
				default:
					console.info(`Неизвестный операнд "${c}"`);
					break;
			}
		}
        return result;
	}
	
	extractChild( parent, child ) {
		try {
			return parent[child];
		} catch (errGetChild) {
			//console.error(errGetChild);
			return null;
		}
	}
	
	xPath( string ) {
		let aPath = string.split('/');
		let result;
		for ( let elem in this.data ) {
			let x = this.data;
			for ( let p in aPath ) {
				x = this.extractChild( x, aPath[p] );
				if ( x == null) {
					break;
				}
			}
			result = x;
			
			break;
		}
		console.info( result )
		return result;
	}
}