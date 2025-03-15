// Получаем все кнопки отправки и все поля ввода
const buttons = document.querySelectorAll(".send");
const inputs = document.querySelectorAll(".input");

// Функция для проверки поля
function validateInput(input) {
  if (input.value.trim() === "") {
    input.style.border = "2px solid #fd7583"; // Добавляем красную обводку
    return false; // Поле не прошло проверку
  } else {
    input.style.border = "2px solid #9bcc37"; // Убираем обводку
    return true; // Поле прошло проверку
  }
}

// Функция для проверки всех полей
function validateForm() {
  let isValid = true; // Предполагаем, что форма валидна

  inputs.forEach((input) => {
    if (!validateInput(input)) {
      isValid = false; // Если хотя бы одно поле не прошло проверку
    }
  });

  return isValid; // Возвращаем результат проверки
}

// Добавляем обработчики для всех кнопок отправки
buttons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем отправку формы

    if (validateForm()) {
      console.log("Форма валидна, можно отправлять!");
      // Здесь можно добавить отправку формы, например:
      // document.querySelector(".interview__form").submit();
    } else {
      console.log("Пожалуйста, заполните все поля.");
    }
  });
});

// Убираем красную обводку при вводе текста
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    if (input.value.trim() !== "") {
      input.style.border = ""; // Убираем обводку
    }
  });
});
