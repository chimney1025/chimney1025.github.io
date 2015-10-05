/*Switch between Sticky button and normal button when scroll to a certain point*/
var Sticky = function(id){
    this.element = document.getElementById(id);
	this.button = document.querySelector('#' + id + ' a');
};

Sticky.prototype.init = function(option) {
    var self = this;
    var didScroll = false;

    window.onscroll = function(){
        didScroll = true;
    };

    setInterval(function() {
        if(didScroll) {
            didScroll = false;
            if(window.scrollY >= option.space) {
				self.button.classList.remove('selected');
                self.element.classList.remove(option.style);
            } else {
                self.button.classList.add('selected');
                self.element.classList.add(option.style);
            }
        }
    });
};

/*Clicking effects on the contact form*/
var FormEffect = function(){
			
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

    function closeAllSelection(event) {
		var popups = document.querySelectorAll('.selection');
		
		//console.log(event.target);
		
        for(var i=0; i<popups.length; i++) {
			if(!event.target.classList.contains('selection')) {
				popups[i].style.display = "none";
			}
			
		}
    }

    function toggleClickToSelect(event) {
        var selection = event.target.getAttribute('data-toggle');
		closeAllSelection(event);
		
		if(document.getElementById(selection).style.display == "none") {
			document.getElementById(selection).style.display = "block"
		}
    }

    function toggleSelection(event) {
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
		
    }

    function closeSelection(event) {
        event.target.parentNode.style.display = "none";
    }

    return {
        init: function() {
			/*Event listener for contact page*/
			var items = document.querySelectorAll('span.click-to-select');
            var spans = document.querySelectorAll('.selection span');
            var closes = document.querySelectorAll('.selection i');

            for(var i=0; i<items.length; i++) {
                items[i].addEventListener('click', toggleClickToSelect);
            }

            for(var i=0; i<spans.length; i++) {
                spans[i].addEventListener('click', toggleSelection);
            }

            for(var i=0; i<closes.length; i++) {
                closes[i].addEventListener('click', closeSelection);
            }
			
			//_add(window, "click", closeAllSelection);
			
			/*Disable enter key submit*/
			_add(window, "keydown", _keyDownListener);
			
			/*Scroll to top*/
			document.querySelector('.scroll-up').addEventListener('click', function(){
				window.scrollTo(0,0);
			});
        }
    }
};