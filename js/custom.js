var FormSelect = (function(){

    var toggleShowHide = function(event) {
        var selection = event.target.getAttribute('data-select');
        (document.getElementById(selection).style.display == "block")
        ? (document.getElementById(selection).style.display = "none")
        : (document.getElementById(selection).style.display = "block");
    };

    var toggleSelection = function(event) {
        var button = event.target;
		var group = button.getAttribute('data-group');
		var parent = button.parentNode;
		var parentGroup = parent.getAttribute('data-group');
		var selectList = document.getElementById(parentGroup);
		
		if(parentGroup) {
			if(selectList.style.display == "none") {
				selectList.style.display = "block";
			}
			
			document.querySelector('#' + parentGroup + ' .well').appendChild(button);
		} else {
			if(parent.children.length == 1) {
				document.getElementById(group).appendChild(button);
				parent.parentNode.style.display = "none"
			} else {
				document.getElementById(group).appendChild(button);
			}
		}
		
    };
	
	var hideOverlay = function(event, modals) {
	}

    return {
        init: function() {
            var items = document.querySelectorAll('input');
			var modals = document.querySelectorAll('.selection');
            var spans = document.querySelectorAll('.selection span');

            for(var i=0; i<items.length; i++) {
                if(items[i].getAttribute('data-select')) {
                    items[i].addEventListener('click', toggleShowHide);
                }
            }

            for(var i=0; i<spans.length; i++) {
                spans[i].addEventListener('click', toggleSelection);
            }
			
			document.addEventListener('click', function(e){
				hideOverlay(e, modals);
			});
        }
    }

})();

FormSelect.init();