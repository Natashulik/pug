document.addEventListener("DOMContentLoaded", () => {
  // modal
  const showBtns = document.querySelectorAll("[data-open-modal]");
  const closeBtns = document.querySelectorAll(".btn-close");
  const modals = document.querySelectorAll(".modal");

  showBtns.forEach(showBtn => {
    showBtn.addEventListener("click", () => {
      const modalId = showBtn.getAttribute("data-open-modal");

      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add("active");
      }
    });
  });

  closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
      const modal = closeBtn.closest(".modal");

      if (modal) {
        modal.classList.remove("active");
      }
    });
  });

  window.addEventListener("click", event => {
    const modal = event.target.closest(".modal");
    if (
      modal &&
      !modal.querySelector(".modal__container").contains(event.target)
    ) {
      modal.classList.remove("active");
    }
  });

  modals.forEach(modal => {
    const form = modal.querySelector(".modal__form");

    if (form) {
      form.addEventListener("submit", event => {
        modal.classList.remove("active");
      });
    }
  });

  //dropdown

  const dropdownBtn = document.querySelector(".dropdown__button");
  const dropdownBtnText = document.querySelector(".dropdown__button-text");
  const dropdownContent = document.querySelector(".dropdown__content");
  const dropdownItems = document.querySelectorAll(".dropdown__item");

  dropdownBtn.addEventListener("click", function () {
    dropdownContent.classList.toggle("show");
    dropdownBtn.classList.toggle("show");
  });

  dropdownItems.forEach(item => {
    item.addEventListener("click", function () {
      dropdownItems.forEach(el => el.classList.remove("selected"));
      item.classList.add("selected");

      dropdownBtnText.textContent = item.textContent;
      dropdownContent.classList.toggle("show");
      dropdownBtn.classList.toggle("show");
    });
  });

  window.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown")) {
      dropdownContent.classList.remove("show");
      dropdownBtn.classList.remove("show");
    }
  });

  //header
  const serviceBtn = document.querySelector(".header__service-button");
  const serviceBlock = document.querySelector(".header__service");
  const burgerIcon = document.querySelector(".header__service-image");
  const crossIcon = serviceBtn.querySelector(".header__service-close");

  serviceBtn.addEventListener("click", function () {
    serviceBlock.classList.toggle("show");

    if (serviceBlock.classList.contains("show")) {
      burgerIcon.style.display = "none";
      crossIcon.style.display = "block";
    } else {
      burgerIcon.style.display = "block";
      crossIcon.style.display = "none";
    }
  });

  //burger
  const burgerBtn = document.querySelector(".header__mobile-burger");
  const burgerCloseIcon = document.querySelector(" .header__burger-close");
  const burgerBurgerIcon = document.querySelector(" .header__burger-image");

  burgerBtn.addEventListener("click", function () {
    serviceBlock.classList.toggle("show");

    if (serviceBlock.classList.contains("show")) {
      burgerBurgerIcon.style.display = "none";
      burgerCloseIcon.style.display = "block";
    } else {
      burgerBurgerIcon.style.display = "block";
      burgerCloseIcon.style.display = "none";
    }
  });
});
