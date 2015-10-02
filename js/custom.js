var SiteEffect = (function(){
	function _add(element, eventName, listener) {
        if (element.attachEvent) {
            element.attachEvent("on" + eventName, listener);
        } else if (element.addEventListener) {
            element.addEventListener(eventName, listener, false);
        }
    }
	
	function _keyDownListener(event) {
		var code = event.keyCode || event.which;
		if (code == 13) { 
			event.preventDefault();
			return false;
		}
    }

    var toggleClickToSelect = function(event) {
        var selection = event.target.getAttribute('data-toggle');
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
				//selectList.style.display = "block";
			}
			
			document.querySelector('#' + parentGroup + ' .wrapper').appendChild(button);
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
		var method = event.target.getAttribute('data-toggle');
		
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
			/*Event listener for contact page*/
            var items = document.querySelectorAll('span.click-to-select');
            var spans = document.querySelectorAll('.selection span');
            var closes = document.querySelectorAll('.selection i');
			var contactMethods = document.querySelectorAll('#contact-method span');

            for(var i=0; i<items.length; i++) {
                items[i].addEventListener('click', toggleClickToSelect);
            }

            for(var i=0; i<spans.length; i++) {
                spans[i].addEventListener('click', toggleSelection);
            }

            for(var i=0; i<closes.length; i++) {
                closes[i].addEventListener('click', closeSelection);
            }
			
			for(var i=0; i<contactMethods.length; i++) {
				contactMethods[i].addEventListener('click', toggleMethod);
			}
			
			/*Scroll to top*/
			document.querySelector('.scroll-up').addEventListener('click', function(){
				window.scrollTo(0,0);
			});
			
			/*Disable enter key submit*/
			_add(window, "keydown", _keyDownListener);
        }
    }

})();

SiteEffect.init();