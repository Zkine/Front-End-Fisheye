class Modale {
  static focusInput(arrayInput, ImputModal, aside) {
    aside = document.getElementById("contact_modal-id");
    ImputModal = document.querySelectorAll(
      "#modale_titre-id, #label-prenom-id, #prenom, #label-nom-id, #nom,#label-mail-id, #mail, #label-message-id, #message, #button-envoi-id, #button-close-id"
    );
    arrayInput = [...ImputModal];
    return { arrayInput, ImputModal, aside };
  }

  static variableModal(
    imputPrenom,
    imputNom,
    imputEmail,
    imputMessage,
    btnValidate,
    formData
  ) {
    imputPrenom = document.getElementById("prenom");
    imputNom = document.getElementById("nom");
    imputEmail = document.getElementById("mail");
    imputMessage = document.getElementById("message");
    btnValidate = document.getElementById("button-envoi-id");
    formData = document.querySelectorAll(".modale_paragraphe");

    return {
      imputPrenom,
      imputNom,
      imputEmail,
      imputMessage,
      btnValidate,
      formData,
    };
  }

  static renderModale(e) {
    e.stopPropagation();
    const name = document.getElementById("photographer-h1-id");
    const aside = document.getElementById("contact_modal-id");
    aside.classList.add("contact_modal");
    aside.setAttribute("aria-labelledby", "modale_titre-id");
    aside.setAttribute("aria-hidden", false);
    const bannerDocument = document.getElementById("banner-id");
    bannerDocument.setAttribute("aria-hidden", "true");
    const mainDocument = document.getElementById("main-id");
    mainDocument.classList.add("no-scroll");
    mainDocument.setAttribute("aria-hidden", "true");
    // si le dom n'est pas créé en controlant que la class de fermeture est absente, nous créons le dom
    if (!aside.classList[1]) {
      const divModale = document.createElement("div");
      divModale.classList.add("div_Modale");
      divModale.id = "div-Modale-id";
      aside.appendChild(divModale);

      const article = document.createElement("article");
      article.classList.add("modale_article");
      divModale.insertAdjacentElement("afterbegin", article);

      const h2 = document.createElement("h2");
      h2.classList.add("modale_titre");
      h2.id = "modale_titre-id";
      h2.setAttribute("tabindex", "0");
      h2.textContent = `Contactez-moi ${name.textContent}`;
      article.appendChild(h2);

      const divForm = document.createElement("div");
      divForm.classList.add("div_form");
      divModale.insertAdjacentElement("beforeend", divForm);

      const form = document.createElement("form");
      form.classList.add("modale_form");
      form.setAttribute("name", "form");
      divForm.insertAdjacentElement("afterbegin", form);

      const paragraphePrenom = document.createElement("p");
      paragraphePrenom.classList.add("modale_paragraphe");
      paragraphePrenom.setAttribute("data-error-visible", "false");
      paragraphePrenom.setAttribute(
        "data-error",
        "2 caractères minimums,les traits d'union et les espaces sont autorisés."
      );
      form.appendChild(paragraphePrenom);

      const lablePrenom = document.createElement("label");
      lablePrenom.setAttribute("for", "prenom");
      lablePrenom.classList.add("label-modale");
      lablePrenom.id = "label-prenom-id";
      lablePrenom.setAttribute("tabindex", "0");
      lablePrenom.textContent = "Prénom";
      paragraphePrenom.insertAdjacentElement("afterbegin", lablePrenom);

      const inputPrenom = document.createElement("input");
      inputPrenom.setAttribute("type", "text");
      inputPrenom.setAttribute("name", "prenom");
      inputPrenom.classList.add("input-modale");
      inputPrenom.id = "prenom";
      inputPrenom.setAttribute("aria-labelledby", "label-prenom-id");
      inputPrenom.setAttribute("aria-invalid", "true");
      inputPrenom.setAttribute("aria-required", "true");
      paragraphePrenom.insertAdjacentElement("beforeend", inputPrenom);

      const paragrapheNom = document.createElement("p");
      paragrapheNom.classList.add("modale_paragraphe");
      paragrapheNom.setAttribute("data-error-visible", "false");
      paragrapheNom.setAttribute(
        "data-error",
        "2 caractères minimums,les traits d'union et les espaces sont autorisés."
      );
      form.appendChild(paragrapheNom);

      const lableNom = document.createElement("label");
      lableNom.setAttribute("for", "nom");
      lableNom.classList.add("label-modale");
      lableNom.id = "label-nom-id";
      lableNom.setAttribute("tabindex", "0");
      lableNom.textContent = "Nom";
      paragrapheNom.insertAdjacentElement("afterbegin", lableNom);

      const inputNom = document.createElement("input");
      inputNom.setAttribute("type", "text");
      inputNom.setAttribute("name", "nom");
      inputNom.classList.add("input-modale");
      inputNom.id = "nom";
      inputNom.setAttribute("aria-labelledby", "label-nom-id");
      inputNom.setAttribute("aria-invalid", "true");
      inputNom.setAttribute("aria-required", "true");
      paragrapheNom.insertAdjacentElement("beforeend", inputNom);

      const paragrapheMail = document.createElement("p");
      paragrapheMail.classList.add("modale_paragraphe");
      paragrapheMail.setAttribute("data-error-visible", "false");
      paragrapheMail.setAttribute(
        "data-error",
        "Pour valider votre email, un @ ainsi qu'un . en fin de l'email est obligatoire."
      );
      form.appendChild(paragrapheMail);

      const lableMail = document.createElement("label");
      lableMail.setAttribute("for", "mail");
      lableMail.classList.add("label-modale");
      lableMail.id = "label-mail-id";
      lableMail.setAttribute("tabindex", "0");
      lableMail.textContent = "Email";
      paragrapheMail.insertAdjacentElement("afterbegin", lableMail);

      const inputmail = document.createElement("input");
      inputmail.setAttribute("type", "text");
      inputmail.setAttribute("name", "mail");
      inputmail.classList.add("input-modale");
      inputmail.id = "mail";
      inputmail.setAttribute("aria-labelledby", "label-mail-id");
      inputmail.setAttribute("aria-invalid", "true");
      inputmail.setAttribute("aria-required", "true");
      paragrapheMail.insertAdjacentElement("beforeend", inputmail);

      const paragrapheMessage = document.createElement("p");
      paragrapheMessage.classList.add("modale_paragraphe");
      paragrapheMessage.setAttribute("data-error-visible", "false");
      paragrapheMessage.setAttribute(
        "data-error",
        " Veuillez entrer un minimum de 65 caractères pour valider votre message."
      );
      form.appendChild(paragrapheMessage);

      const lableMessage = document.createElement("label");
      lableMessage.setAttribute("for", "message");
      lableMessage.classList.add("label-modale");
      lableMessage.id = "label-message-id";
      lableMessage.setAttribute("tabindex", "0");
      lableMessage.textContent = "Votre message";
      paragrapheMessage.insertAdjacentElement("afterbegin", lableMessage);

      const textareaMessage = document.createElement("textarea");
      textareaMessage.setAttribute("name", "message");
      textareaMessage.classList.add("textarea-modale");
      textareaMessage.id = "message";
      textareaMessage.setAttribute("aria-labelledby", "label-message-id");
      textareaMessage.setAttribute("aria-invalid", "true");
      textareaMessage.setAttribute("aria-required", "true");
      paragrapheMessage.insertAdjacentElement("beforeend", textareaMessage);

      const buttonEnvoi = document.createElement("button");
      buttonEnvoi.setAttribute("type", "submit");
      buttonEnvoi.classList.add("button-envoi");
      buttonEnvoi.id = "button-envoi-id";
      buttonEnvoi.setAttribute("aria-label", "send");
      buttonEnvoi.textContent = "Envoyer";
      form.appendChild(buttonEnvoi);

      const buttonClose = document.createElement("button");
      buttonClose.setAttribute("type", "button");
      buttonClose.classList.add("button-close");
      buttonClose.id = "button-close-id";
      buttonClose.setAttribute("aria-label", "Close Contact form");
      buttonClose.setAttribute("aria-pressed", "false");
      divForm.insertAdjacentElement("beforeend", buttonClose);

      const closeModal = document.getElementById("button-close-id");
      closeModal.addEventListener("click", Modale.modalClose);
      closeModal.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
          return Modale.modalClose(e);
        }
      });

      const { imputPrenom, imputNom, imputEmail, imputMessage, btnValidate } =
        Modale.variableModal(e);
      // const imputPrenom = document.getElementById("prenom");
      imputPrenom.addEventListener("input", (e) => inputControl(e));

      // const imputNom = document.getElementById("nom");
      imputNom.addEventListener("input", (e) => inputControl(e));

      // const imputEmail = document.getElementById("mail");
      imputEmail.addEventListener("input", (e) => inputControl(e));

      // const imputMessage = document.getElementById("message");
      imputMessage.addEventListener("input", (e) => inputControl(e));

      // const btnValidate = document.getElementById("button-envoi-id");
      btnValidate.addEventListener("click", (e) => validate(e));

      const { ImputModal } = Modale.focusInput(e);
      ImputModal.forEach((i) =>
        i.addEventListener("keydown", (e) => {
          if (e.code === "Escape") {
            return Modale.modalClose(e);
          } else if (e.code === "Tab") {
            return Modale.focusInputModal(e);
          }
        })
      );

      const h2Id = document.getElementById("modale_titre-id");
      h2Id.focus();

      return divModale;

      //sinon si le dom est créé en controlant si la classe contact_modal_close est présente,
      //on remove la class retournée par la fonction modaleClose pour réouvrir la modale
    } else if (aside.classList[1].includes("contact_modal_close")) {
      const btnClose = document.getElementById("button-close-id");
      btnClose.setAttribute("aria-pressed", "false");
      aside.classList.remove("contact_modal_close");
      const h2Id = document.getElementById("modale_titre-id");
      h2Id.focus();
    }
  }

  // fermeture de la modale
  static modalClose(e) {
    e.stopPropagation();
    e.preventDefault();
    const mainDocument = document.getElementById("main-id");
    const sectionModal = e.target.closest("#contact_modal-id");
    const bannerDocument = document.getElementById("banner-id");
    const BtnModalOpen = document.getElementById("displayModal");
    if (sectionModal.classList[0].includes("contact_modal")) {
      bannerDocument.setAttribute("aria-hidden", "false");
      mainDocument.classList.remove("no-scroll");
      mainDocument.setAttribute("aria-hidden", "false");
      sectionModal.setAttribute("aria-hidden", "true");
      e.target.setAttribute("aria-pressed", "true");
      sectionModal.classList.add("contact_modal_close");
      document.form.reset();
      e.type === "keydown" && BtnModalOpen.focus();
    }
  }

  // function qui gére le focus de la modale
  static focusInputModal = (e) => {
    e.preventDefault();
    let { arrayInput, aside } = Modale.focusInput(e);
    let indexBtn = arrayInput.findIndex(
      (b) => b === aside.querySelector(":focus")
    );
    if (e.shiftKey === true) {
      indexBtn--;
    } else {
      indexBtn++;
    }

    if (indexBtn >= arrayInput.length) {
      indexBtn = 0;
    } else if (indexBtn < 0) {
      indexBtn = arrayInput.length - 1;
    }
    return arrayInput[indexBtn].focus();
  };
}
const contactModal = () => {
  setTimeout(() => {
    const buttonContact = document.getElementById("displayModal");
    buttonContact.addEventListener("click", Modale.renderModale);
  }, 1800);
};

contactModal();

// regex permettant de valider les données inscrites par l'utilisateur
const regexName = new RegExp("^[a-zA-Z]{0,10}[ -]{0,1}[a-zA-Z]{2,10}$");
const regexEmail = new RegExp(
  "^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,4}$"
);
const regExMessage = new RegExp("^([a-zA-Z0-9.-_,:) \\n]){65,}$");

// function qui avertit l'utilisateur de la validation du formulaire à l'input
const inputControl = (e) => {
  e.stopPropagation();
  const { formData } = Modale.variableModal(e);
  const testPrenomNom = regexName.test(e.target.value);
  const testEmail = regexEmail.test(e.target.value);
  const testMessage = regExMessage.test(e.target.value);

  const inputName = e.target.attributes[1].textContent;
  switch (inputName) {
    case "prenom":
      if (testPrenomNom) {
        formData[0].dataset.errorVisible = false;
        e.target.setAttribute("aria-invalid", "false");
      } else {
        formData[0].dataset.errorVisible = true;
        e.target.setAttribute("aria-invalid", "true");
      }
      break;
    case "nom":
      if (testPrenomNom) {
        formData[1].dataset.errorVisible = false;
        e.target.setAttribute("aria-invalid", "false");
      } else {
        formData[1].dataset.errorVisible = true;
        e.target.setAttribute("aria-invalid", "true");
      }
      break;
    case "mail":
      if (testEmail) {
        formData[2].dataset.errorVisible = false;
        e.target.setAttribute("aria-invalid", "false");
      } else {
        formData[2].dataset.errorVisible = true;
        e.target.setAttribute("aria-invalid", "true");
      }
      break;
    case "textarea-modale":
      if (testMessage) {
        formData[3].dataset.errorVisible = false;
        e.target.setAttribute("aria-invalid", "false");
      } else {
        formData[3].dataset.errorVisible = true;
        e.target.setAttribute("aria-invalid", "true");
      }
      break;
    default:
      console.log("error");
  }
};

// validation du formulaire lorsque l'utilisateur appuie sur le bouton de validation
const validate = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const { imputPrenom, imputNom, imputEmail, imputMessage, formData } =
    Modale.variableModal(e);

  const testPrenom = regexName.test(imputPrenom.value);
  const testNom = regexName.test(imputNom.value);
  const testMail = regexEmail.test(imputEmail.value);
  const testMessage = regExMessage.test(imputMessage.value);

  if (!testPrenom) {
    formData[0].dataset.errorVisible = true;
  } else if (testPrenom) {
    formData[0].dataset.errorVisible = false;
  }

  if (!testNom) {
    formData[1].dataset.errorVisible = true;
  } else if (testNom) {
    formData[1].dataset.errorVisible = false;
  }

  if (!testMail) {
    formData[2].dataset.errorVisible = true;
  } else if (testMail) {
    formData[2].dataset.errorVisible = false;
  }

  if (!testMessage) {
    formData[3].dataset.errorVisible = true;
  } else if (testMessage) {
    formData[3].dataset.errorVisible = false;
  }

  if (testPrenom && testNom && testMail && testMessage) {
    console.log(
      `Prémon: ${imputPrenom.value}\nNom: ${imputNom.value}\nEmail: ${imputEmail.value}\nMessage: ${imputMessage.value}`
    );
    return Modale.modalClose(e);
  }
};
