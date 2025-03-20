import mask from "./phoneMask/mask.js";
import { maskList } from "./phoneMask/mask_list.js";

document.addEventListener("DOMContentLoaded", function () {
  //Phone mask
  mask("[data-tel-input]");

  const phoneInputs = document.querySelectorAll(".interview__number");

  phoneInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value == "+") input.value = "";
    });
    input.addEventListener("blur", () => {
      if (input.value == "+") input.value = "";
    });
  });

  const form = document.querySelector(".interview__form");
  const inputs = {
    name: form.querySelector(".interview__name"),
    phone: form.querySelector(".interview__number"),
    email: form.querySelector(".interview__email"),
    position: form.querySelector(".interview__position"),
    category: form.querySelectorAll('input[name="category"]'),
    categoryContainer: form.querySelector(".interview__category"),
  };

  // Валидация в реальном времени для email и телефона
  inputs.phone.addEventListener("input", validatePhone);
  inputs.email.addEventListener("input", validateEmail);
  inputs.name.addEventListener("input", validateName);
  inputs.position.addEventListener("input", validatePosition);

  // Обработчик отправки формы
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData();

    // Добавляем обычные поля
    formData.append("name", inputs.name.value);
    formData.append("phone", inputs.phone.value);
    formData.append("email", inputs.email.value);
    formData.append("position", inputs.position.value);
    formData.append(
      "questions",
      document.querySelector(".interview__questions").value
    );
    formData.append(
      "category",
      document.querySelector('input[name="category"]:checked').value
    );

    // Добавляем файлы
    selectedFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    // Выводим formData в консоль
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    if (validateForm()) {
      alert("Форма успешно отправлена!");
      form.reset();
      selectedFiles = [];
      updateFilesList();
    }
  });

  function validateForm() {
    let isValid = true;

    // Валидация телефона
    if (!validatePhone()) isValid = false;

    // Валидация email
    if (!validateEmail()) isValid = false;

    // Валидация name
    if (!validateName()) isValid = false;

    // Валидация position
    if (!validatePosition()) isValid = false;

    // Валидация категории
    const categoryChecked = Array.from(inputs.category).some(
      (radio) => radio.checked
    );
    if (!categoryChecked) {
      inputs.categoryContainer.classList.add("invalid");
      isValid = false;
    }

    return isValid;
  }

  function validateName() {
    if (!inputs.name.value.trim()) {
      inputs.name.classList.remove("valid");
      inputs.name.classList.add("invalid");
      return false;
    } else {
      inputs.name.classList.remove("invalid");
      inputs.name.classList.add("valid");
      return true;
    }
  }

  function validatePosition() {
    if (!inputs.position.value.trim()) {
      inputs.position.classList.remove("valid");
      inputs.position.classList.add("invalid");
      return false;
    } else {
      inputs.position.classList.remove("invalid");
      inputs.position.classList.add("valid");
      return true;
    }
  }

  function validatePhone() {
    let isValid = true;
    phoneInputs.forEach((input) => {
      const matrix = getMaskForInput(input);
      const isComplete = isMaskComplete(input.value, matrix);

      // console.log(`matrix: ${matrix}, length: ${matrix.length}`);
      // console.log(`isComplete: ${isComplete}`);

      if (isComplete) {
        input.classList.add("valid");
        input.classList.remove("invalid");
      } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
      }

      if (!isComplete) isValid = false;
    });
    return isValid;
  }

  function getMaskForInput(input) {
    let matrix = "+###############";
    const phone = input.value.replace(/[\s#-)(]/g, "");

    maskList.forEach((item) => {
      const code = item.code.replace(/[\s#]/g, "");
      if (phone.startsWith(code)) {
        matrix = item.code;
      }
    });
    return matrix;
  }

  function isMaskComplete(value, mask) {
    const cleanValue = value.replaceAll(" ", "");
    const cleanMask = mask.replaceAll(" ", "");

    // console.log(`cleanValue: ${cleanValue},  cleanValue: ${cleanValue.length}`);
    // console.log(`cleanMask: ${cleanMask},  cleanMask: ${cleanMask.length}`);

    return cleanValue.length === cleanMask.length;
  }

  function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(inputs.email.value.trim());
    inputs.email.classList.toggle("invalid", !isValid);
    inputs.email.classList.toggle("valid", isValid);
    return isValid;
  }

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.multiple = true;
  fileInput.style.display = "none";

  const filesList = document.createElement("div");
  filesList.className = "files-list";
  document.querySelector(".interview__actions").prepend(filesList);

  let selectedFiles = [];

  // Обработчик клика по кнопке "Прикрепить резюме"
  document
    .querySelector(".interview__button--transparent")
    .addEventListener("click", function (e) {
      e.preventDefault();
      fileInput.click();
    });

  // Обработчик выбора файлов
  fileInput.addEventListener("change", function (e) {
    const newFiles = Array.from(e.target.files);
    selectedFiles = [...selectedFiles, ...newFiles];
    updateFilesList();
  });

  // Функция обновления списка файлов
  function updateFilesList() {
    filesList.innerHTML = "";
    selectedFiles.forEach((file, index) => {
      const fileItem = document.createElement("div");
      fileItem.className = "file-item";

      const fileName = document.createElement("span");
      fileName.textContent = file.name;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "×";
      deleteBtn.className = "delete-file";
      deleteBtn.onclick = () => removeFile(index);

      fileItem.append(fileName, deleteBtn);
      filesList.appendChild(fileItem);
    });
  }

  // Функция удаления файла
  function removeFile(index) {
    selectedFiles = selectedFiles.filter((_, i) => i !== index);
    updateFilesList();
  }

  // Сброс ошибок при ручном вводе
  inputs.name.addEventListener("input", () =>
    inputs.name.classList.remove("invalid")
  );
  inputs.position.addEventListener("input", () =>
    inputs.position.classList.remove("invalid")
  );
  inputs.category.forEach((radio) => {
    radio.addEventListener("change", () =>
      inputs.categoryContainer.classList.remove("invalid")
    );
  });
});
