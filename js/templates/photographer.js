const url = new URL(window.location.href);
const id = url.searchParams.get("id");

class Lightbox {
  //initialisation de la lightbox

  static initLightbox() {}

  constructor() {
    this.$imgSection = document.querySelectorAll("img");
    console.log(this.$imgSection);
    // const link = array.form();
  }

  //création du DOM de la lightbox
  static DomLightbox(e) {
    const imgClick = e.target.children[0].attributes[1].value;
    const imgAlt = e.target.children[0].attributes[2].value;
    const imgDescriptoin = e.target.childNodes[1].childNodes[0].textContent;

    e.stopPropagation();
    const selectDomLightbox = document.getElementById("lightbox-modal");
    const section = document.createElement("section");
    section.classList.add("section-lightbox");
    section.id = "section-lightbox-id";
    selectDomLightbox.appendChild(section);

    const figure = document.createElement("figure");
    figure.classList.add("figure-lightbox");
    section.appendChild(figure);

    const img = document.createElement("img");
    img.classList.add("img-lightbox");
    img.setAttribute("src", imgClick);
    img.setAttribute("alt", imgAlt);
    figure.insertAdjacentElement("afterbegin", img);

    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("figcaption-lightbox");
    figure.insertAdjacentElement("beforeend", figcaption);

    const p = document.createElement("p");
    p.classList.add("descriptif-img");
    p.textContent = imgDescriptoin;
    figcaption.insertAdjacentElement("beforeend", p);

    const previousLink = document.createElement("a");
    previousLink.setAttribute("type", "button");
    previousLink.classList.add("previous-link");
    previousLink.id = "previous-link-id";
    figure.appendChild(previousLink);

    const nextLink = document.createElement("a");
    nextLink.setAttribute("type", "button");
    nextLink.classList.add("next-link");
    nextLink.id = "next-link-id";
    figure.appendChild(nextLink);

    const buttonModal = document.createElement("button");
    buttonModal.classList.add("button-modal");
    figure.appendChild(buttonModal);

    buttonModal.addEventListener("click", this.lightboxClose.bind(this));

    return section;
  }

  // fermeture de la modale
  lightboxClose(e) {
    const sectionModal = e.target.closest("#lightbox-modal");
    const section = sectionModal.querySelector("#section-lightbox-id");
    return sectionModal.removeChild(section);
  }

  static nextImg() {
    return;
  }
}

class PhotographerTemplate extends Lightbox {
  constructor(data) {
    super();
    // renvoi les données data pour la création du DOM - photographer.html
    this._data = data;
    this.$imgSection = document.getElementById("img-section");
    // affichage des likes
    this.$claculLikes = document.getElementById("calcul-like");
    this.$claculLikes.textContent = MediaModel.MediaFullLickes();
    // affichage du prix
    this.$claculPrice = document.getElementById("calcul-price");
    this.$claculPrice.textContent = MediaModel.MediaFullprice();
  }

  renderBanner() {
    // création du banner de la page photographer.html
    const divBanner = document.createElement("div");
    divBanner.classList.add("photograph-banner");

    const divh1 = document.createElement("div");
    divBanner.insertAdjacentElement("afterbegin", divh1);

    const h1 = document.createElement("h1");
    h1.classList.add("photographer-h1");
    h1.textContent = `${this._data.name}`;
    divh1.insertAdjacentElement("afterbegin", h1);

    const city = document.createElement("p");
    city.classList.add("photographer-city");
    city.textContent = `${this._data.city}, ${this._data.country}`;
    divh1.insertAdjacentElement("beforeend", city);

    const citation = document.createElement("q");
    citation.classList.add("photographer-citation");
    citation.textContent = `${this._data.tagline}`;
    divh1.insertAdjacentElement("beforeend", citation);

    const button = document.createElement("button");
    button.classList.add("contact_button");
    button.id = "displayModal";
    button.textContent = "Contactez-moi";
    divBanner.insertAdjacentElement("beforeend", button);

    const divImg = document.createElement("div");
    divImg.classList.add("conteneur-img");
    divBanner.insertAdjacentElement("beforeend", divImg);

    const portrait = document.createElement("img");
    portrait.setAttribute(
      "src",
      `../../assets/photographers/${this._data.portrait}`
    );
    portrait.setAttribute("alt", `Portrait d'${this._data.name}`);
    portrait.classList.add("portait-img");
    divImg.insertAdjacentElement("afterbegin", portrait);
    return divBanner;
  }

  renderMedia() {
    // /création des médias de la page photographer.html
    if (this._data.Mediaimage && this._data.Mediaimage.includes("jpg")) {
      const articlePhoto = document.createElement("article");
      articlePhoto.classList.add("article-media");
      this.$imgSection.insertAdjacentElement("afterbegin", articlePhoto);

      const figurePhoto = document.createElement("figure");
      figurePhoto.classList.add("figurePhoto");
      figurePhoto.id = "imgModal";
      articlePhoto.insertAdjacentElement("afterbegin", figurePhoto);

      const articleImg = document.createElement("img");
      articleImg.classList.add("articleimg");
      articleImg.setAttribute("src", `${this._data.Mediaimage}`);
      articleImg.setAttribute("alt", `${this._data.MediaTitle}`);
      figurePhoto.insertAdjacentElement("beforeend", articleImg);

      const figcaptionImg = document.createElement("figcaption");
      figcaptionImg.classList.add("figcaption-Media");
      figcaptionImg.textContent = `${this._data.MediaTitle}`;
      figurePhoto.insertAdjacentElement("beforeend", figcaptionImg);

      const pPhoto = document.createElement("p");
      pPhoto.classList.add("number-likes");
      pPhoto.textContent = `${this._data.Medialikes}`;
      figurePhoto.insertAdjacentElement("beforeend", pPhoto);

      const buttonHeart = document.createElement("button");
      buttonHeart.classList.add("buttonHeart");
      figurePhoto.insertAdjacentElement("beforeend", buttonHeart);

      figurePhoto.addEventListener("click", Lightbox.DomLightbox.bind(this));

      return articlePhoto;
    } else if (this._data.Mediavideo && this._data.Mediavideo.includes("mp4")) {
      const articleVideo = document.createElement("article");
      articleVideo.classList.add("article-media");
      this.$imgSection.insertAdjacentElement("beforeend", articleVideo);

      const figcaptionVideo = document.createElement("figcaption");
      figcaptionVideo.classList.add("figcaption-Media");
      figcaptionVideo.textContent = `${this._data.MediaTitle}`;
      articleVideo.insertAdjacentElement("beforeend", figcaptionVideo);

      const video = document.createElement("video");
      video.classList.add("articleimg");
      video.setAttribute("alt", `${this._data.MediaTitle}`);
      video.setAttribute("src", `${this._data.Mediavideo}`);
      video.setAttribute("controls", "controls");
      figcaptionVideo.insertAdjacentElement("afterbegin", video);

      const pVideo = document.createElement("p");
      pVideo.classList.add("number-likes");
      pVideo.textContent = `${this._data.Medialikes}`;
      figcaptionVideo.insertAdjacentElement("afterend", pVideo);

      const buttonHeart = document.createElement("button");
      buttonHeart.classList.add("buttonHeart");
      pVideo.insertAdjacentElement("afterend", buttonHeart);

      return articleVideo;
    }
  }
}
