// Модуль формы новый проект
var newProject = (function (){ //самовызывающаяся функция

	var init = function(){ // только это будет доступно извне
				console.log('иницилизация модуля формы новый проект');
				_setUpListners();
		},

		_setUpListners = function() { //слежка за событиями
			$('#form-newproject').on('submit', _submitForm);// когда сабмит - вызываем метод сабмитформ
			$('#form-newproject').on('change', '.upload-file', _fileValue);//когда быбрали файл
			$('#form-newproject').on('click', '.upload-file', _removeUploadError);//убираем ошибку когда добавили файл
		},

		 _removeUploadError = function(){ // 
		 		var upload = $('.upload'),
		 			upVal = upload.val(),
		 			btnUpload = $('.button-upload');

		 		upload.removeClass('input-error');
		 		btnUpload.removeClass('upload-error');
				upload.next('.tooltip-box').remove('.tooltip-box');
		},

		_fileValue = function(){ // присвоение скрытого value поддельному

		$('.file').each(function(){
    	$(this).find('.upload').val($(this).find('.upload-file').val());
		});

    	$(this).parents('.file').find('.upload').val($(this).val());
		},
		
		_submitForm = function (ev) {
			console.log('Работа с формой новый проект');

			ev.preventDefault();//отменяем сам сабмит формы

		  	var form = $(this),// эта форма
		  		host = form.attr('action'),// адрес php-файла куда будет отправляться наш запрос
		  		resultObject = _ajaxForm(form, host);// результат ajax запроса

		  	

		  	if (resultObject) {  //проверка наличие переменной ajax
		  		resultObject.done(function(ans) {
		  			var mes = ans.mes,
		  			status = ans.status;

		  			if ( status === 'OK'){ //проверка ок - срабатывает этот код
		  				form.trigger('reset'); //очищаем форму
		  				// сообщение вставляем в блок и выводим окно попап с успехом
		  			} else{
		  				form.find('.error-result').text(mes).show(); // блок с ошибкой если ошибка сервера
		  			}
		  		});
		  	}
		},
		_ajaxForm = function (form, host) { //здесь сам ajax

			if (!validation.validateForm(form)) return false; //ошибка, если не проходит валидацию

			var data = form.serialize();//забираем значения инпутов в data

			return $.ajax({ // возвращаем def Object
				type: 'POST',
				host: host,
				dataType: 'JSON',
				data: data
			}).fail( function(ans){
				console.log('Проблемы в коде php');
				// form.find('.error-result').text('На сервере произошла ошибка').show();
			});
		};
	return {
		init: init 
	};
})();

newProject.init();