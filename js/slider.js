var Slider = function(id) {
	var id = id;
    var images = document.querySelectorAll("#" + id + " .slide");
    var holder = document.querySelector("#" + id + " .holder");
    var slider = document.getElementById(id);
    var width = slider.offsetWidth;
    var ratio = slider.offsetWidth/slider.offsetHeight;
    holder.style.width = images.length * 100 + '%';
	holder.style.left = 0;

    var slideToLeft = function() {
        if(parseInt(holder.style.left) > -width * (images.length-1)) {
            holder.style.left = parseInt(holder.style.left) - width + 'px';
        }
	};

	var slideToRight = function() {
        if(parseInt(holder.style.left) < 0) {
            holder.style.left = parseInt(holder.style.left) + width + 'px';
        }
	};

    var scroll = function() {
        for(var i=0; i<images.length; i++) {
            images[i].style.transform = 'translate3d(-' + (100 - holder.scrollLeft/6) + 'px,0,0)';
        }
    };

    var resize = function() {
        width = slider.offsetWidth;
        slider.style.height = width/ratio + 'px';
        console.log(slider.offsetWidth + ' ' + slider.offsetHeight);
        for(var i=0; i<images.length; i++) {
            images[i].style.width = slider.offsetWidth + 'px';
            images[i].style.height = slider.offsetHeight + 'px';
        }
    };
  
	return {
		start : function() {
            //resize();

			var that = this;
			document.querySelector('#' + id + ' .prev').addEventListener('click', function(){
				slideToRight();
			}, false);
	
			document.querySelector('#' + id + ' .next').addEventListener('click', function(){
				slideToLeft();
			}, false);

            slider.addEventListener('scroll', function(){
                scroll();
            });

            window.addEventListener('resize', function(){
                //resize();
            });
		}
	}
}

