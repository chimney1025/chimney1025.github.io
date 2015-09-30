var FormSelect = (function(){

    var toggleShowHide = function(event) {
        var selection = event.target.getAttribute('data-select');
        document.getElementById(selection).style.display == "block"
        ? document.getElementById(selection).style.display = "none"
        : document.getElementById(selection).style.display = "block";
    };

    var toggleSelection = function(event) {
        var button = event.target;

        button.classList.contains('active')
            ? button.classList.remove('active')
            : button.classList.add('active');
    }

    return {
        init: function() {
            var items = document.querySelectorAll('input');

            for(var i=0; i<items.length; i++) {
                if(items[i].getAttribute('data-select')) {
                    items[i].addEventListener('click', toggleShowHide);
                }
            }

            var spans = document.querySelectorAll('.selection span');
            for(var i=0; i<spans.length; i++) {
                spans[i].addEventListener('click', toggleSelection);
            }
        }
    }

})();

FormSelect.init();