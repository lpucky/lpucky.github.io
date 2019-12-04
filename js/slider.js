$(function(){
	/* Задаем переменные с текущим слайдом и с количеством слайдов. Проверяем наличие 
	слайдов/элементов в слайдере. Если элементы есть - скрываем все слайды, отображаем текущий слайд. Если элементов 
	нет - записываем в консоль ошибку.*/
	
	// Номер начального слайда (отсчет начинается с нуля)
	var slide = 0;

	// Таймер автоматического перелистывания слайдов
	var timer = {
		// Должен ли работать по-умолчанию или нет
		isOn: false,
		// Работает ли в данный момент
		isWork: false,
		// Пауза, в мс
		time: 5000};

	var timerId;

	// Узнаем количество слайдов
	var slidesLength = $('.slider .slide').length - 1;

	// Проверяем, есть ли слайды в слайдере. Нет - возвращаем ошибку в консоль
	if(slidesLength < 0){
		return console.log('Ошибка - изображения в слайдере не найдены.');
	};

	//Отображаем нужный слайд
	showSlide(slide);

	//Событие при клике на точку
	$('.slider .slider-dots').on('click', '.dot:not(.active)', function() {
		// Задаем переменной slide значение индекса элемента, по которому произведен клик
		slide = $(this).index();
		//Отображаем нужный слайд
		showSlide(slide);
	});

	// Событие при клике на левую стрелку
	$('.slider .arrow-left').on('click', function() {
		// Записываем в переменндую предыдущий слайд
		prevSlide()

		//Отображаем нужный слайд
		showSlide(slide);
	});

	// Событие при клике на правую стрелку
	$('.slider .arrow-right').on('click', function() {
		// Записываем в переменндую следующий слайд
		nextSlide();

		//Отображаем нужный слайд
		showSlide(slide);
	});

	// Если таймер должен работать по-умолчанию - запускаем автоматическое перелистывание
	if(timer.isOn == true){
		// Таймер должен работать - запускаем его
		timerOn();

		// Таймер на паузу, если была нажата стрелка в слайдере
		$('.slider .arrow').on('click', timerOff);

		// Запускаем таймер если мышка вне слайдера
		$('.slider').on('mouseleave', timerOn);

		// Запускаем таймер если был скролл
		$(window).scroll(timerOn);
	}

	// Высота обертки слайда равна высоте слайда с position absolute
	resizeSlideswrapper();
	window.onresize = function(){
		resizeSlideswrapper();
	};



	// Фнукция функция отображения слайда
	function showSlide(slide){
		// Скрываем отображаемый слайд
		$('.slider .slide:visible').stop().fadeTo(600, 0);
		// Делаем новый выбранный слайд видимым
		$('.slider .slide').eq(slide).stop().fadeTo(600, 1);
		

		//Убираем класс active точки, у которой он есть
		$('.slider .slider-dots .dot.active').removeClass('active');
		//добавляем класс active для точки, по которой произведен клик
		$('.slider .slider-dots .dot').eq(slide).addClass('active');
	};

	// Функция записи в переменндую предыдущего слайда
	function prevSlide(){
		// Проверяем, первый ли это слайд
		if(slide <= 0){
			// Слайд первый - задаем переменной slide значение индекса последнего элемента
			slide = $('.slider .slide:last').index();
		}else{
			// Слайд не первый - задаем переменной slide значение индекса предыдущего элемента
			slide -= 1;
		};
	}

	// Функция записи в переменндую следующего слайда
	function nextSlide(){
		// Проверяем, последний ли это слайд
		if(slide >= slidesLength){
			// Слайд последний - задаем переменной slide значение индекса первого элемента
			slide = $('.slider .slide:first').index();
		}else{
			// Слайд не последний - задаем переменной slide значение индекса следующего элемента
			slide += 1;
		};
	}


	// Функция автоматического перелистывания
	function sliderInterval(){
		// Записываем в переменндую следующий слайд
		nextSlide();

		// Отображаем нужный слайд
		showSlide(slide);
	}

	// Функция включения таймера
	function timerOn(){
		// Запускаем таймер если он выключен
		if(timer.isWork == false){
			// Таймер выключен - включаем
			timerId = setInterval(sliderInterval, timer.time);
			// Обновляем данные о работе таймера
			timer.isWork = true;
		}
	}

	// Функция выключения таймера
	function timerOff(){
		// Выключаем таймер если он включен
		if(timer.isWork == true){
			// Таймер включен - выключаем
			clearTimeout(timerId);
			// Обновляем данные о работе таймера
			timer.isWork = false;
		}
	}

	// Задает высоту обертки слайдов равной высоте слайда
	function resizeSlideswrapper(){
		$('.slider .slideswrapper').height($('.slider .slideswrapper .slide').innerHeight());
	};
});