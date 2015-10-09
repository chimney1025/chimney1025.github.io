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
		//closeAllSelection(event);
		
		if(document.getElementById(selection).style.display == "block") {
			document.getElementById(selection).style.display = "none";
		} else {
			document.getElementById(selection).style.display = "block";
		}
    }

    function toggleSelection(event) {
        var button = event.target;
		var group = button.getAttribute('data-item');
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
			/*
			// Using event bubbling
			_add(document.getElementById('contactForm', 'click', function(event) {
				var item = event.target;
				
				if(item.getAttribute('data-toggle')) {
					return toggleClickToSelect(event);
				}
				
				if(item.getAttribute('data-item')) {
					return toggleSelection(event);
				}
				
				if(item.getAttribute('data-close')) {
					return closeSelection(event);
				}
			});
			*/
			
			/*
			// Using jQuery
			$('.click-to-select').click(toggleClickToSelect);
			$('.selection span').click(toggleSelection);
			$('.selected-items span').click(toggleSelection);
			$('.selection .icon-cancel').click(closeSelection);
			*/
			
			var selections = document.querySelectorAll('.click-to-select');
			var spans = document.querySelectorAll('.selection span');
			var selected = document.querySelectorAll('.selected-items span');
			var close = document.querySelectorAll('.selection .icon-cancel');
			
			for(var i=0; i<selections.length; i++) {
				_add(selections[i], "click", toggleClickToSelect);
			}
			
			for(var i=0; i<spans.length; i++) {
				_add(spans[i], "click", toggleSelection);
			}
			
			for(var i=0; i<selected.length; i++) {
				_add(selected[i], "click", toggleSelection);
			}
			
			for(var i=0; i<close.length; i++) {
				_add(close[i], "click", closeSelection);
			}
			
			//_add(window, "click", closeAllSelection);
			
			/*Disable enter key submit*/
			_add(window, "keydown", _keyDownListener);
        }
    }
};