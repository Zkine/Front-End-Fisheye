class Modale {
  constructor() {
    // this.$regExNomPrenom = regExNomPrenom;
    // this.$regExEmail = regExEmail;
  }

  static renderModale(e) {
    e.stopPropagation();

    const name = document.getElementById("photographer-h1-id");

    const aside = document.getElementById("contact_modal-id");
    aside.classList.add("contact_modal");
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
      h2.textContent = `Contactez-moi ${name.textContent}`;
      article.appendChild(h2);

      const divForm = document.createElement("div");
      divForm.classList.add("div_form");
      divModale.insertAdjacentElement("beforeend", divForm);

      const form = document.createElement("form");
      form.classList.add("modale_form");
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
      lablePrenom.textContent = "Prénom";
      paragraphePrenom.insertAdjacentElement("afterbegin", lablePrenom);

      const inputPrenom = document.createElement("input");
      inputPrenom.setAttribute("type", "text");
      inputPrenom.setAttribute("name", "prenom");
      inputPrenom.classList.add("input-modale");
      inputPrenom.id = "prenom-id";
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
      lableNom.textContent = "Nom";
      paragrapheNom.insertAdjacentElement("afterbegin", lableNom);

      const inputNom = document.createElement("input");
      inputNom.setAttribute("type", "text");
      inputNom.setAttribute("name", "nom");
      inputNom.classList.add("input-modale");
      inputNom.id = "nom-id";
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
      lableMail.textContent = "Email";
      paragrapheMail.insertAdjacentElement("afterbegin", lableMail);

      const inputmail = document.createElement("input");
      inputmail.setAttribute("type", "text");
      inputmail.setAttribute("name", "mail");
      inputmail.classList.add("input-modale");
      inputmail.id = "mail-id";
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
      lableMessage.textContent = "Votre message";
      paragrapheMessage.insertAdjacentElement("afterbegin", lableMessage);

      const textareaMessage = document.createElement("textarea");
      textareaMessage.setAttribute("name", "mail");
      textareaMessage.classList.add("textarea-modale");
      textareaMessage.id = "textarea-modale-id";
      paragrapheMessage.insertAdjacentElement("beforeend", textareaMessage);

      const buttonEnvoi = document.createElement("button");
      buttonEnvoi.classList.add("button-envoi");
      buttonEnvoi.id = "button-envoi-id";
      buttonEnvoi.textContent = "Envoyer";
      form.appendChild(buttonEnvoi);

      const buttonClose = document.createElement("button");
      buttonClose.classList.add("button-close");
      buttonClose.id = "button-close-id";
      divForm.insertAdjacentElement("beforeend", buttonClose);

      const fontawesomeCross = document.createElement("i");
      const classesFontAwesome = ["fa-solid", "fa-xmark"];
      classesFontAwesome.forEach(() => {
        fontawesomeCross.classList.add(...classesFontAwesome);
      });
      buttonClose.appendChild(fontawesomeCross);

      const closeModal = document.getElementById("button-close-id");
      closeModal.addEventListener("click", Modale.modalClose.bind(this));

      const imputPrenom = document.getElementById("prenom-id");
      imputPrenom.addEventListener("input", (e) => inputControl(e));

      const imputNom = document.getElementById("nom-id");
      imputNom.addEventListener("input", (e) => inputControl(e));

      const imputEmail = document.getElementById("mail-id");
      imputEmail.addEventListener("input", (e) => inputControl(e));

      const imputMessage = document.getElementById("textarea-modale-id");
      imputMessage.addEventListener("input", (e) => inputControl(e));

      const btnValidate = document.getElementById("button-envoi-id");
      btnValidate.addEventListener("click", (e) => validate(e));

      return divModale;

      //sinon si le dom est créé en controlant si la classe contact_modal_close est présente,
      //on remove la class retournée par la fonction modaleClose pour réouvrir la modale
    } else if (aside.classList[1].includes("conctact_modal_close")) {
      aside.classList.remove("conctact_modal_close");
    }
  }

  // fermeture de la modale
  static modalClose(e) {
    e.stopPropagation();
    const sectionModal = e.target.closest("#contact_modal-id");
    if (sectionModal.classList[0].includes("contact_modal")) {
      sectionModal.classList.add("conctact_modal_close");
    }
  }
}

const asynsEcoute = async () => {
  setTimeout(() => {
    const buttonContact = document.getElementById("displayModal");
    buttonContact.addEventListener("click", Modale.renderModale.bind(this));
  }, 1000);
};
asynsEcoute();
// regex permettant de valider les données inscrites par l'utilisateur
const regexName = new RegExp("^[a-zA-Z]{0,10}[ -]{0,1}[a-zA-Z]{2,10}$");
const regexEmail = new RegExp(
  "^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,4}$"
);
const regExMessage = new RegExp("^([a-zA-Z0-9.-_,:) \n]){65,}$");

// vérification du prénom
const inputControl = (e) => {
  e.stopPropagation();
  const formData = document.querySelectorAll(".modale_paragraphe");
  const testPrenomNom = regexName.test(e.target.value);
  const testEmail = regexEmail.test(e.target.value);
  const testMessage = regExMessage.test(e.target.value);

  const inputName = e.target.attributes[1].textContent;
  switch (inputName) {
    case "prenom":
      if (testPrenomNom) {
        formData[0].dataset.errorVisible = false;
      } else {
        formData[0].dataset.errorVisible = true;
      }
      break;
    case "nom":
      if (testPrenomNom) {
        formData[1].dataset.errorVisible = false;
      } else {
        formData[1].dataset.errorVisible = true;
      }
      break;
    case "mail":
      if (testEmail) {
        formData[2].dataset.errorVisible = false;
      } else {
        formData[2].dataset.errorVisible = true;
      }
      break;
    case "textarea-modale":
      if (testMessage) {
        formData[3].dataset.errorVisible = false;
      } else {
        formData[3].dataset.errorVisible = true;
      }
      break;
    default:
      console.log();
  }
};

const validate = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const formData = document.querySelectorAll(".modale_paragraphe");
  const imputPrenom = document.getElementById("prenom-id");
  const imputNom = document.getElementById("nom-id");
  const imputEmail = document.getElementById("mail-id");
  const imputMessage = document.getElementById("textarea-modale-id");

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
  }
};
