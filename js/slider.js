var Slider = function(id) {
	var id = id;
    var imageholder = document.querySelector("#" + id + " .holder");
	imageholder.style.left = 0;

    var slideToLeft = function() {
		imageholder.style.left = parseInt(imageholder.style.left) - 640 + 'px';
	};

	var slideToRight = function() {
		imageholder.style.left = parseInt(imageholder.style.left) + 640 + 'px';
	};
  
	return {
		start : function() {
			var that = this;
			document.querySelector('#' + id + ' .prev').addEventListener('click', function(){
				slideToRight();
			}, false);
	
			document.querySelector('#' + id + ' .next').addEventListener('click', function(){
				slideToLeft();
			}, false);
		}
	}
}

