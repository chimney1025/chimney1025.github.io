var Slider = (function() {
  var index = 0;
  var images = document.querySelectorAll(".slide");
  
  var slide = function() {
    var last, next;
  
    if(index < 0) {
	  index = images.length-1;
	} else if(index >= images.length) {
	  index = 0;
	}
  
	last = (index-1>=0)?(index-1):(images.length-1);
	next = (index+1<images.length)?(index+1):(0);
	
    images[last].className = "slide";
    images[next].className = "slide active";
    images[index].className = "slide";
  }
  
  return {
    start: function() {
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			slide();
			index++;
		}, 2000);
	},
	prev: function() {
		slide();
	    index--;
	},
	next: function() {
		slide();
	    index++;
	},
	stop: function() {
		clearInterval(this.timer);
	}
  }
})();