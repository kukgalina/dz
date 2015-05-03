// открытый Модуль валидации
var validation = (function (){

	var init = function(){

			console.log('иницилизация модуля валидации');

				_setUpListners();
			},

		validateForm = function (form) { //проверяет поля на заполненность
			console.log('Проверяем инпуты формы');

			var element = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
				elemNext = element.next('.tooltip-box');

				valid = true;

			elemNext.remove();

			$.each(element, function(index, val) {
				var element = $(val),
				val = element.val(),
				textError = element.attr('data-valid'),
				pos = element.attr('data-position');
				
			if(val.length === 0){// если пустой инпут, то добавляем обводку и тултип
				element.addClass('input-error');
				element.tooltip({ content: textError, position: pos});
				valid = false;
			}

		});

		return valid;
		},


		_setUpListners = function() { //слежка за событиями
			
			$('form').on('keydown', '.input-error', _removeError); //удаляем красную обводку у инпутов
			$('form').on('reset', _clearForm); // при нажатии очистить - удаляем всё: тултипы, сообщения и обводки
			
		},

		_clearForm = function() { //очищает форму

			var form = $(this);
			
			form.find('.tooltip-box').remove();// удаляем тултипы
			form.find('.input-error').removeClass('input-error');//убирает красную обводку
			form.find('.error-result, success-result').text('').hide(); //скрываем сообщения с сервера 
		},

		_removeError = function() { //убирает красную обводку у инпутов  и тултипы
			
			var next = $(this).next();

			$(this).removeClass('input-error');
			next.remove();
		};


	return {
		init: init,
		validateForm: validateForm
	};
})();
validation.init();
