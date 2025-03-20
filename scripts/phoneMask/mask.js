// Импортируем maskList
import { maskList } from "./mask_list.js";

const mask = (selector) => {
  function setMask() {
    let matrix = "+###############";

    maskList.forEach((item) => {
      let code = item.code.replace(/[\s#]/g, ""),
        phone = this.value.replace(/[\s#-)(]/g, "");

      if (phone.startsWith(code)) {
        // Используем startsWith вместо includes
        matrix = item.code;
      }
    });

    let i = 0,
      val = this.value.replace(/\D/g, "");

    this.value = matrix.replace(/(?!\+)./g, function (a) {
      return /[#\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ""
        : a;
    });
  }

  document.querySelectorAll(selector).forEach((input) => {
    input.addEventListener("input", setMask.bind(input)); // Используем bind
    input.addEventListener("focus", setMask.bind(input));
    input.addEventListener("blur", setMask.bind(input));
  });
};

export default mask;
