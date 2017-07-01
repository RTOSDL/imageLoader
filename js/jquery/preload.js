//图片预加载
(function($){

	function Preload(imgs , options){
		this.imgs = imgs;
		this.opts = $.extend({}, Preload.DEFAULTS , options);
		
		if(this.opts.order === 'ordered'){
			this._ordered();
		}else{
			this._unordered();
		}
		
	}

	Preload.DEFAULTS = {
		order : "unordered",
		each : null,
		all : null
	};

	Preload.prototype._unordered = function(){
		var imgs = this.imgs,
			opts = this.opts,
			count = 0,
			len = imgs.length;

		$.each(imgs, function(i, src) {
			// console.log(i);
			// console.log(src);
			// if(typeof src != 'string') return;
			// console.log(Image);
			var imgObj = new Image();	
			console.log(imgObj);
			$(imgObj).on('load error', function() {
				opts.each && opts.each();
				console.log(Math.round((count+1) / len * 100) + '%');
				if(count >= len-1){
					opts.all && opts.all();
				}
				count++;

			});
			imgObj.src = src;
		});
	};

	Preload.prototype._ordered = function(){
		var imgs = this.imgs,
			len = imgs.length,
			count = 0,
			opts = this.opts;

		load();

		function load(){
			var imgObj = new Image();

			$(imgObj).on('load error',  function() {
				
				if(count>=len){

				}else{
					load();
				}
				count++;
			});
			console.log(imgObj);
			imgObj.src = imgs[count];
		}


	};
	$.extend({
		preload : function(imgs , opts){
			new Preload(imgs , opts);
		}
	});
	

})(jQuery);