function contextMenuElement(a,b,c,d) {
	this.name = a;
	this.title = b;
	this.method = c;
	this.class = d;
}


class TableContextMenu {

	constructor( a, target ) {
		this.isActive = false;
		this.cm_config = a;
		this.domObject = $('<div>', {id: "context-menu"});
		this.params = [];
		this.target = target;
		for (var i in a) {
			$('<div>', {
				id: a[i].name
				,'class': `context-menu-element ${a[i].class}`
			}).append(a[i].title)
			.appendTo(this.domObject);
		}

	}

	__init__() {
		
		let cm_variable = this;

		$('<style>').append(`
			#context-menu {
				position: absolute;
				top: 0px;
				left: 0px;
				display: none;
				background: #a770ef;
				border-radius: 2px;
				letter-spacing: 1px;
				color: #fefefe;
				font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-weight: 400;
			}

			.context-menu-element {
				padding: 5px 15px;
				cursor: pointer;
				transition: 300ms linear;
			}

			.context-menu-element:hover {
				background-color: #cf8bf3;
			}
		`).appendTo('body');

		$(cm_variable.domObject).appendTo('body');

		$('body').click(function(e) {
			if (
				e.originalEvent.path[0].tagName == 'TD'
				&& e.originalEvent.path[1].id != ""
				&& e.originalEvent.path[3].id == cm_variable.target
			) {
				cm_variable.showMenu(e);
				try {
				cm_variable.setParams(
				{
					ID: e.originalEvent.path[1].id
					,OE: e.originalEvent.path
				});
			} catch(errSetParams) {
				console.error(errSetParams);
			}
			} else {
			  cm_variable.hideMenu();
			}
			if (
				e.originalEvent.path[0]
				.className.indexOf("context-menu-element") == 0
			) {
			  cm_variable.callMethod(e.originalEvent.path[0].id);
			}
		});
	}

	showMenu( e ) {
		try {
			if (this.isActive) {
			  this.hideMenu();
			}
			$(this.domObject).css('top', e.pageY);
			$(this.domObject).css('left', e.pageX);
			$(this.domObject).slideDown(100);
			this.isActive = true;
		} catch (errShowContextMenu) {
			console.error(errShowContextMenu);
			this.isActive = false;
		}
	}

	hideMenu() {
	  $(this.domObject).slideUp(1);
	  this.isActive = false;
	}

	callMethod( methodName ) {
		for (var f in this.cm_config) {
			if ( this.cm_config[f].name == methodName ) {
				return this.cm_config[f].method( this.params );
			}
		}
	}

	setParams( data ) {
		this.params = [];
		this.params.push( data );
	}

}
