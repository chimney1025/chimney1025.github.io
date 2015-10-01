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

    var closeSelection = function(event) {
        event.target.parentNode.style.display = "none";
    };
	
	var toggleMethod = function(event) {
		var method = event.target.getAttribute('data-method');
		
		if(document.getElementById(method).style.display == "block") {
			document.getElementById(method).style.display = "none";
			event.target.classList.remove("selected");
		} else {
			document.getElementById(method).style.display = "block";
			event.target.classList.add("selected");
		}
		
	};

    return {
        init: function() {
            var items = document.querySelectorAll('span.click-to-select');
            var spans = document.querySelectorAll('.selection span');
			var dropdowns = document.querySelectorAll('form select option span');
            var closes = document.querySelectorAll('.selection .close');
			var contactMethods = document.querySelectorAll('#contact-method span');

            for(var i=0; i<items.length; i++) {
                if(items[i].getAttribute('data-select')) {
                    items[i].addEventListener('click', toggleShowHide);
                }
            }

            for(var i=0; i<spans.length; i++) {
                spans[i].addEventListener('click', toggleSelection);
            }

            for(var i=0; i<dropdowns.length; i++) {
                dropdowns[i].addEventListener('click', toggleSelection);
            }

            for(var i=0; i<closes.length; i++) {
                closes[i].addEventListener('click', closeSelection);
            }
			
			for(var i=0; i<contactMethods.length; i++) {
				contactMethods[i].addEventListener('click', toggleMethod);
			}
        }
    }

})();

FormSelect.init();