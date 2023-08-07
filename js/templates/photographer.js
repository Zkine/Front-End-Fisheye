const url = new URL(window.location.href);
const id = url.searchParams.get("id");

class PhotographerTemplate {
  constructor(data) {
    // renvoi les données data pour la création du DOM - photographer.html
    this._data = data;
  }

  render() {
    const article = document.createElement("article");
    article.classList.add("photograph-banner");
    // création du banner de la page
    if (this._data.name) {
      const divBanner = document.createElement("div");
      article.insertAdjacentElement("afterbegin", divBanner);

      const h1 = document.createElement("h1");
      h1.classList.add("photographer-h1");
      h1.textContent = `${this._data.name}`;
      divBanner.insertAdjacentElement("afterbegin", h1);

      const city = document.createElement("p");
      city.classList.add("photographer-city");
      city.textContent = `${this._data.city}, ${this._data.country}`;
      divBanner.insertAdjacentElement("beforeend", city);

      const citation = document.createElement("q");
      citation.classList.add("photographer-citation");
      citation.textContent = `${this._data.tagline}`;
      divBanner.insertAdjacentElement("beforeend", citation);

      const button = document.createElement("button");
      button.classList.add("contact_button");
      button.id = "displayModal";
      button.textContent = "Contactez-moi";
      article.insertAdjacentElement("beforeend", button);

      const divImg = document.createElement("div");
      divImg.classList.add("conteneur-img");
      article.insertAdjacentElement("beforeend", divImg);

      const portrait = document.createElement("img");
      portrait.setAttribute(
        "src",
        `../../assets/photographers/${this._data.portrait}`
      );
      portrait.setAttribute("alt", `Portrait d'${this._data.name}`);
      portrait.classList.add("portait-img");
      divImg.insertAdjacentElement("afterbegin", portrait);

      // const dinMain = document.createElement("div");
      // article.insertAdjacentElement("afterend", dinMain);

      // création de la section contenant l'addition des prix des photos ainsi que les lickes
      if (MediaModel.MediaFullLickes()) {
        const section = document.createElement("section");
        section.classList.add("photographer-section");
        article.insertAdjacentElement("afterend", section);

        const divLike = document.createElement("div");
        divLike.classList.add("conteneur-like");
        section.insertAdjacentElement("afterbegin", divLike);

        const spanLike = document.createElement("span");
        spanLike.classList.add("photographer-like");
        divLike.insertAdjacentElement("afterbegin", spanLike);

        const pLike = document.createElement("p");
        pLike.classList.add("calcul-like");
        pLike.textContent = `${MediaModel.MediaFullLickes()}`;
        spanLike.insertAdjacentElement("afterbegin", pLike);

        const spanheart = document.createElement("img");
        spanheart.setAttribute("src", "../../assets/icons/heart.svg");
        spanheart.setAttribute("alt", "icon like");
        spanheart.classList.add("icon-heart");
        spanLike.insertAdjacentElement("beforeend", spanheart);

        const spanPrice = document.createElement("span");
        spanPrice.classList.add("photographer-price");
        divLike.insertAdjacentElement("beforeend", spanPrice);

        const pPrice = document.createElement("p");
        pPrice.classList.add("calcul-price");
        pPrice.textContent = `${MediaModel.MediaFullprice()}€ / jour`;
        spanPrice.insertAdjacentElement("afterbegin", pPrice);

        const divTri = document.createElement("div");
        divTri.classList.add("divTri");
        section.insertAdjacentElement("beforeend", divTri);

        const pTri = document.createElement("p");
        pTri.textContent = "Trier par";
        divTri.insertAdjacentElement("afterbegin", pTri);

        const buttonTri = document.createElement("button");
        buttonTri.classList.add("buttonTri");
        buttonTri.textContent = "Populaire";
        divTri.insertAdjacentElement("beforeend", buttonTri);

        return article;
      }
    }
    if (this._data.Mediaimage) {
      // création de la section contenant les médias du photographe
      const sectionImg = document.createElement("section");
      sectionImg.classList.add("img-section");
      article.insertAdjacentElement("beforeend", sectionImg);
      if (this._data.Mediaimage && this._data.Mediaimage.includes("jpg")) {
        const articlePhoto = document.createElement("article");
        articlePhoto.classList.add("articlePhoto");
        sectionImg.insertAdjacentElement("afterbegin", articlePhoto);

        const figurePhoto = document.createElement("figure");
        figurePhoto.classList.add("figurePhoto");
        articlePhoto.insertAdjacentElement("afterbegin", figurePhoto);

        const articleImg = document.createElement("img");
        articleImg.classList.add("articleimg");
        articleImg.setAttribute("src", `${this._data.Mediaimage}`);
        articleImg.setAttribute("alt", `${this._data.MediaTitle}`);
        figurePhoto.insertAdjacentElement("afterbegin", articleImg);

        const figcaptionImg = document.createElement("figcaption");
        figcaptionImg.classList.add("figcaptionPhoto");
        figcaptionImg.textContent = `${this._data.MediaTitle}`;
        figurePhoto.insertAdjacentElement("beforeend", figcaptionImg);

        const pPhoto = document.createElement("p");
        pPhoto.classList.add("spanPhoto");
        pPhoto.textContent = `${this._data.Medialikes}`;
        figurePhoto.insertAdjacentElement("beforeend", pPhoto);
        return articlePhoto;
      } else if (this._data.Mediavideo) {
        const articleVideo = document.createElement("article");
        articleVideo.classList.add("articlePhoto");
        article.insertAdjacentElement("beforeend", articleVideo);

        const video = document.createElement("video");
        video.classList.add("articleimg");
        video.setAttribute("src", `${this._data.Mediavideo}`);
        articleVideo.insertAdjacentElement("beforeend", video);
        return articleVideo;
      } else {
        return sectionImg;
      }
    }
  }
}
