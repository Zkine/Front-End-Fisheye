const url = new URL(window.location.href);
const id = url.searchParams.get("id");

class PhotographerTemplate {
  constructor(data) {
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

      const imgHeart = document.createElement("img");
      imgHeart.classList.add("imgHeart");
      imgHeart.setAttribute("src", "../../assets/icons/heart.svg");
      imgHeart.setAttribute("alt", "heart");
      buttonHeart.insertAdjacentElement("afterbegin", imgHeart);

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

      const imgHeart = document.createElement("img");
      imgHeart.classList.add("imgHeart");
      imgHeart.setAttribute("src", "../../assets/icons/heart.svg");
      imgHeart.setAttribute("alt", "heart");
      buttonHeart.insertAdjacentElement("afterbegin", imgHeart);
      return articleVideo;
    }
  }
}
