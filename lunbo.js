$(function(){
		//封装一个函数 先去调用banner（）函数 再去设置banner（）函数
		//duration 多少秒切换一次
		//palyTime 切换的时长
		var duration=3000;
		var playTime=1000;
		banner(duration,playTime);
		$('.scrollBanner').hover(function(){$('.arr_left,.arr_right,.scroll_num').css('display','block')},function(){$('.arr_left,.arr_right,.scroll_num').css('display','none')});
	});
		function banner(duration,playTime){
			var $newli=$("bannerBox li").eq(0).clone();
			$('.bannerBox').append($newli);
			var $oUL=$(".bannerBox");
			var $oLIs= $oUL.children();
			var $oNavlist=$('.scroll_num').children();
			var $arrLeft=$('.arr_left');
			var $arrRight=$('.arr_right');
			var index=0;
			var imgLength=$oLIs.length-1;
			clearTime($oUL);
			clearTime($arrLeft);
			clearTime($arrRight);
			clearTime($oNavlist);
			//下一张按钮
			$arrRight.on("click",function(){
				index++;
				if (index>imgLength) {
					index=1; 
					$oUL.css({
						'left':0+"px"
					})
				}
				console.log(index);
				move(index);
			});
			//上一张按钮
			$arrLeft.on('click',function(){
					index--;
					if (index<0) {
						index=2;
						$oUL.css({'left':-(imgLength)*$oLIs.eq(0).width()+"px"})
						
					}
					console.log(index);
					move(index);
				});
			$oNavlist.each(function(){
				var _index=$(this).index();
				$(this).on('click',function(){
					if (_index>imgLength) {
						_index=1;
					}
					move(_index);
				})
			});
				var timer=setInterval(function(){
					$arrRight.click();
				},duration)
				//鼠标滑入滑出事件
				function clearTime($ele){
					$ele.hover(function(){clearInterval(timer);},
					function(){
						timer=setInterval(function(){
					$arrRight.click();
				},duration);
					})
					
				};
				//点击事件的轮播
				function move(index){
					$oUL.stop().animate({
						'left':index*(-$oLIs.eq(0).width())+"px"
					},playTime);
					$oNavlist.removeClass('current');
					$oNavlist.eq(index>=imgLength)?0:(index).addClass('current');
				}
			}
		
