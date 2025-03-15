const buttons = document.querySelectorAll(".send");
const inputs = document.querySelectorAll(".input");

buttons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем отправку формы

    inputs.forEach((input) => {
      const errorIcon = input.nextElementSibling; // Иконка ошибки
      const validIcon = errorIcon.nextElementSibling; // Иконка галочки

      if (input.value.trim() === "") {
        input.classList.remove("valid");
        input.classList.add("error");
        errorIcon.style.display = "block"; // Показываем иконку ошибки
        validIcon.style.display = "none"; // Скрываем иконку галочки
      } else {
        input.classList.remove("error");
        input.classList.add("valid");
        errorIcon.style.display = "none"; // Скрываем иконку ошибки
        validIcon.style.display = "block"; // Показываем иконку галочки
      }
    });
  });
});

// Убираем класс с ошибкой и добавляем галочку при вводе текста
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    const errorIcon = input.nextElementSibling; // Иконка ошибки
    const validIcon = errorIcon.nextElementSibling; // Иконка галочки

    if (input.value.trim() !== "") {
      input.classList.remove("error");
      input.classList.add("valid");
      errorIcon.style.display = "none"; // Скрываем иконку ошибки
      validIcon.style.display = "block"; // Показываем иконку галочки
    } else {
      input.classList.remove("valid");
      errorIcon.style.display = "none"; // Скрываем иконку ошибки
      validIcon.style.display = "none"; // Скрываем иконку галочки
    }
  });
});
