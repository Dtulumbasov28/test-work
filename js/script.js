const prevBtn = document.querySelector(".elements__arrow-prev");
const nextBtn = document.querySelector(".elements__arrow-next");
const slider = document.querySelector(".slider");
const computedStyles = window.getComputedStyle(slider);
const sliderSingle = document.querySelectorAll(".slider-single");
const containerSlider = document.querySelector(".container");
const innerSlider = document.querySelector(".slider-inner");



let dragSlider = function () {
  // Переменные
  let pressed = false;
  let startX;
  let x;

  // mousedown
  slider.addEventListener("mousedown", (e) => {
    pressed = true;
    startX = e.offsetX - innerSlider.offsetLeft;
    slider.style.cursor = "grabbing";
  });

  // mouseneter
  slider.addEventListener("mouseenter", () => {
    slider.style.cursor = "grab";
  });

  // mouseup
  slider.addEventListener("mouseup", () => {
    slider.style.cursor = "grab";
  });

  // window
  window.addEventListener("mouseup", () => {
    pressed = false;
  });

  // Слушатель события mousemove
  slider.addEventListener("mousemove", (e) => {
    if (!pressed) return;
    e.preventDefault();

    x = e.offsetX;

    innerSlider.style.left = `${x - startX}px`;

    checkBoundry();
  });

  // Проверка границ внешнего и внутреннего ползунков
  function checkBoundry() {
    let outer = slider.getBoundingClientRect();
    let inner = innerSlider.getBoundingClientRect();
    let forty = parseInt(40); // костыль:(


    if (parseInt(innerSlider.style.left) > 0) {
      innerSlider.style.left = "0px";
    } else if (inner.right < outer.right) {
      innerSlider.style.left = `-${inner.width - outer.width + forty}px`;
    }
  }
};

// Вызов
dragSlider();

// Функцонал кнопок prev-next
let loop = function (direction, e) {
  if (direction === "nextBtn") {
    innerSlider.appendChild(innerSlider.firstElementChild);
  } else {
    innerSlider.insertBefore(
      innerSlider.lastElementChild,
      innerSlider.firstElementChild
    );
  }
};
nextBtn.addEventListener("click", (e) => {
  loop("nextBtn", e);
});

prevBtn.addEventListener("click", (e) => {
  loop("prevBtn", e);
});

// Таймер
const timer = setInterval((e) => {
	loop();
}, 3000);

///// Реализация слайдера без Drop&Down с помощью перестановки элементов в начало-в конец списка

// const prevBtn = document.querySelector(".elements__arrow-prev");
// const nextBtn = document.querySelector(".elements__arrow-next");
// const innerSlider = document.querySelector(".slider-inner");

// const loop = (direction, e) => {
//   e.preventDefault();
//   if (direction === "nextBtn") {
// 	innerSlider.appendChild(innerSlider.firstElementChild);
//   } else {
// 	innerSlider.insertBefore(innerSlider.lastElementChild, innerSlider.firstElementChild);
//   }
// };

// nextBtn.addEventListener("click", (e) => {
//   loop("nextBtn", e);
// });

// prevBtn.addEventListener("click", (e) => {
//   loop("prevBtn", e);
// });



