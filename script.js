window.addEventListener("DOMContentLoaded", function() {
	
	let canvas = document.querySelector('#canvas'),
			ctx = canvas.getContext('2d'),
			counter = document.querySelector("#counter");

	canvas.height = 500; // Высота canvas
	canvas.width = 500; // Ширина canvas

	let x = canvas.width / 2, // Начальное положение x
			y = canvas.height / 2; // Начальное полежение y

	let stepCount = 0, // Счётчик кол-ва шагов
			direction, // Направление
			timer, // Таймер
			mouseX, // Координаты выстрела x 
			mouseY, // Координаты выстрела y
			countShot = 0;

	function start() {
		// Убрать прошый контекст
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// Если шаги закончились
		if (stepCount == 0) {
			// Генерация нового количества шагов
			stepCount = Math.floor(5 * Math.random());
			// Генерация нового направления движения мишени
			direction = Math.floor(8 * Math.random());
		} else {
			// Если не закончились - шагать дальше
			stepCount--;
		}
		// Задание направления движения. 
		// Всего 8 направлений: север, восток, юг, запад, сев-вост, юго-вост, юго-зап, сев-зап
		switch(direction) {
			// Движение на север
			case 0:
				y -= 4;
				break;
			// Движение на восток
			case 1:
				x += 4;
				break;
			// Движение на юг
			case 2:
				y += 4;
				break;
			// Движение на запад
			case 3:
				x -= 4;
				break;
			// Движение на сев-вост
			case 4:
				y -= 4;
				x += 4;
				break;
			// Движение на юго-вост
			case 5:
				y += 4;
				x += 4;
				break;
			// Движение на юго-зап
			case 6:
				y += 4;
				x -= 4;
				break;
			// Движение на сев-зап
				y -= 4;
				x -= 4;
				break;
			// Движение по-уполчанию на восток
			default:
				// x++;
				break;
		}
		// Проверка на соударение со стенками
		if(x < 0){
		 direction = 1;
		} else if(x > 447){
		 direction = 3;
		} else if(y < 0){ 
		 direction = 2;
		} else if(y > 447){
		 direction = 4;
		}﻿

		// Большой круг
		ctx.beginPath();
		ctx.fillStyle = "#F0DE3D";
		ctx.arc(x, y, 50, 0, Math.PI * 2, false);
		ctx.fill();

		// Маленький круг
		ctx.beginPath();
		ctx.fillStyle = "#D62A05";
		ctx.arc(x, y, 10, 0, Math.PI * 2, false);
		ctx.fill();

		counter.innerHTML = countShot;
		console.log(x, y);
		// Таймер на отрисовку в 0.1мс
		timer = setTimeout(start, 100);
	}

	function shot() {

		// Провека на поподание в красный круг
		if ( mouseX <= (x + 10) && mouseX >= (x - 10) && 	mouseY <= (y + 10) && mouseY >= (y - 10) ) {
			countShot++;
		} else {
			countShot--;
		}
	}

	// Событие выстрела (Клик по мышке)
	canvas.addEventListener("click", (event) => {
		// Координаты выстрела
		mouseX = event.offsetX;
		mouseY = event.offsetY;

		shot();
	});

	start();
});