var FormSelect = (function(){

    var toggleShowHide = function(event) {
        var selection = event.target.getAttribute('data-select');
        (document.getElementById(selection).style.display == "block")
        ? (document.getElementById(selection).style.display = "none")
        : (document.getElementById(selection).style.display = "block");
    };

    var toggleSelection = function(event) {
        var button = event.target;

        button.classList.contains('active')
            ? button.classList.remove('active')
            : button.classList.add('active');
    };
	
	var hideOverlay = function(event, modals) {
		console.log(event.target);
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