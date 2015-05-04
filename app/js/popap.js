var popup = (function (){

	var init = function(){

		console.log('иницилизация модуля попап');
 				_setUpListners();
 			},

		opening = function() { //открытие
 			var popupnew = $('.popup-newproject'),
 				popupbg = $('.popup-bg');
 			
			popupnew.fadeIn(300);
			popupbg.fadeIn(300);
			_positionCenter(popupnew);
 		},

 		_setUpListners = function() { //слежка за событиями
			
			$('#site-name-new').on('click', opening);
			$('.popup-bg').css({opacity: 0.75});
 			$('.popup-close, .popup-bg').on('click', _closing); //при клике на Х и на фон закрытие
 		},

 		_positionCenter = function() {
 			var popup = $('.popup');

 			popup.css({
 				marginTop: '-' + popup.height() / 2 + 'px',
 				marginLeft: '-' + popup.width() / 2 + 'px'
 			})
 		},

 		_closing = function() { //закрытие
			var popupnew = $('.popup-newproject'),
 				popupbg = $('.popup-bg');

 			popupnew.fadeOut(300);
			popupbg.fadeOut(300);
 		};



 	return {
 		init: init,
 		opening: opening
 	};
})();
popup.init();