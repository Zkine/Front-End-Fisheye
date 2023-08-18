const url = new URL(window.location.href);
const id = url.searchParams.get("id");

class Lightbox {
  static MediaAllSetect(Media, MediaTitleMap, MediaItems, MediaTitle) {
    const linkMedia = document.querySelector("#media-lightbox-id");
    console.log(linkMedia);
    const mediaAll = Array.from(document.querySelectorAll("#item-media-id"));
    Media = mediaAll.map(
      (e) => e.getAttribute("src") || e.children[0].getAttribute("src")
    );
    MediaTitleMap = mediaAll.map(
      (e) => e.getAttribute("alt") || e.children[0].getAttribute("alt")
    );

    MediaItems = Media.findIndex(
      (element) => element === linkMedia.attributes[1].textContent
    );

    MediaTitle = MediaTitleMap.findIndex(
      (element) => element === linkMedia.attributes[2].textContent
    );

    return [Media, MediaTitleMap, MediaItems, MediaTitle];
  }
  constructor(data) {
    this._data = data;
  }

  //création du DOM de la lightbox
  static async DomLightbox(e) {
    e.stopPropagation();

    const selectDomLightbox = document.getElementById("lightbox-modal");
    const section = document.createElement("section");
    section.classList.add("section-lightbox");
    section.id = "section-lightbox-id";
    selectDomLightbox.appendChild(section);

    const figureLightbox = document.createElement("figure");
    figureLightbox.classList.add("figure-lightbox");
    figureLightbox.id = "figure-lightbox-id";
    section.appendChild(figureLightbox);

    if (e.target.attributes[1].textContent.includes("jpg")) {
      const imgClick = e.target.attributes[1].textContent;
      const imgAlt = e.target.attributes[2].textContent;

      const imgLightbox = document.createElement("img");
      imgLightbox.classList.add("media-lightbox");
      imgLightbox.setAttribute("src", imgClick);
      imgLightbox.setAttribute("alt", imgAlt);
      imgLightbox.id = "media-lightbox-id";
      figureLightbox.insertAdjacentElement("afterbegin", imgLightbox);

      const figcaption = document.createElement("figcaption");
      figcaption.classList.add("figcaption-lightbox");
      figcaption.textContent = `${imgAlt}`;
      figureLightbox.insertAdjacentElement("beforeend", figcaption);
    } else if (e.target.children[0].attributes[2].textContent.includes("mp4")) {
      const videoClick = e.target.children[0].attributes[2].textContent;
      const videoAlt = e.target.children[0].attributes[1].textContent;

      const video = document.createElement("video");
      video.classList.add("media-lightbox");
      video.setAttribute("controls", "");
      figureLightbox.insertAdjacentElement("afterbegin", video);

      const source = document.createElement("source");
      source.id = "media-lightbox-id";
      source.setAttribute("src", `${videoClick}`);
      source.setAttribute("alt", `${videoAlt}`);
      source.setAttribute("type", "video/mp4");
      video.appendChild(source);

      const figcaptionVideo = document.createElement("figcaption");
      figcaptionVideo.classList.add("figcaption-lightbox");
      figcaptionVideo.textContent = `${videoAlt}`;
      figureLightbox.appendChild(figcaptionVideo);
    }
    const [media, mediaTitleMap, MediaItems, MediaTitle] =
      Lightbox.MediaAllSetect(e);
    let mediaItems = MediaItems;
    let mediaTitle = MediaTitle;
    if (
      mediaItems === media.length - 1 ||
      mediaTitle === mediaTitleMap.length - 1
    ) {
      mediaItems = -1;
      mediaTitle = -1;
    }
    const previousLink = document.createElement("a");
    previousLink.setAttribute("type", "button");
    if (media[mediaItems - 1]) {
      previousLink.setAttribute("href", `${media[mediaItems - 1]}`);
    } else if (media[mediaItems - 1] === undefined && mediaItems === 0) {
      mediaItems = media.length;
      previousLink.setAttribute("href", `${media[mediaItems - 1]}`);
      mediaItems = 0;
    } else if (media[mediaItems - 1] === undefined && mediaItems === -1) {
      mediaItems = media.length;
      previousLink.setAttribute("href", `${media[mediaItems - 2]}`);
      mediaItems = -1;
    }
    previousLink.classList.add("previous-link");
    previousLink.id = "previous-link-id";
    section.appendChild(previousLink);

    const nextLink = document.createElement("a");
    nextLink.setAttribute("type", "button");
    nextLink.setAttribute("href", `${media[mediaItems + 1]}`);
    nextLink.classList.add("next-link");
    nextLink.id = "next-link-id";
    section.appendChild(nextLink);

    const buttonModal = document.createElement("button");
    buttonModal.classList.add("button-modal");
    section.appendChild(buttonModal);

    buttonModal.addEventListener("click", Lightbox.lightboxClose.bind(this));
    nextLink.addEventListener("click", Lightbox.nextImg.bind(this));
    previousLink.addEventListener("click", Lightbox.prevImg.bind(this));

    return section;
  }

  // fermeture de la modale
  static lightboxClose(e) {
    e.stopPropagation();
    const sectionModal = e.target.closest("#lightbox-modal");
    const section = sectionModal.querySelector("#section-lightbox-id");
    return sectionModal.removeChild(section);
  }

  static nextImg(e) {
    e.preventDefault();
    e.stopPropagation();
    // récupération du lien de l'image affichée dans la constante linkMedia
    const sectionLithtbox = e.target.closest("#section-lightbox-id");
    const [media, mediaTitleMap, MediaItems, MediaTitle] =
      Lightbox.MediaAllSetect(e);
    let mediaItems = MediaItems;
    let mediaTitle = MediaTitle;
    if (
      mediaItems === media.length - 1 ||
      mediaTitle === mediaTitleMap.length - 1
    ) {
      mediaItems = -1;
      mediaTitle = -1;
    }

    sectionLithtbox.innerHTML = "";
    const figureLightbox = document.createElement("figure");
    figureLightbox.classList.add("figure-lightbox");
    figureLightbox.id = "figure-lightbox-id";
    sectionLithtbox.appendChild(figureLightbox);
    if (media[mediaItems + 1].includes("jpg")) {
      const newImg = document.createElement("img");
      newImg.classList.add("media-lightbox");
      newImg.setAttribute("src", `${media[mediaItems + 1]}`);
      newImg.setAttribute("alt", `${mediaTitleMap[mediaTitle + 1]}`);
      newImg.id = "media-lightbox-id";
      figureLightbox.insertAdjacentElement("afterbegin", newImg);

      const newfigcaption = document.createElement("figcaption");
      newfigcaption.classList.add("figcaption-lightbox");
      newfigcaption.textContent = `${mediaTitleMap[mediaTitle + 1]}`;
      figureLightbox.appendChild(newfigcaption);
    } else if (media[mediaItems + 1].includes("mp4")) {
      const video = document.createElement("video");
      video.classList.add("media-lightbox");
      video.setAttribute("controls", "");
      figureLightbox.insertAdjacentElement("afterbegin", video);

      const source = document.createElement("source");
      source.id = "media-lightbox-id";
      source.setAttribute("src", `${media[mediaItems + 1]}`);
      source.setAttribute("alt", `${mediaTitleMap[mediaTitle + 1]}`);
      source.setAttribute("type", "video/mp4");
      video.appendChild(source);

      const figcaptionVideo = document.createElement("figcaption");
      figcaptionVideo.classList.add("figcaption-lightbox");
      figcaptionVideo.textContent = `${mediaTitleMap[mediaTitle + 1]}`;
      figureLightbox.appendChild(figcaptionVideo);
    }
    const previousLink = document.createElement("a");
    previousLink.setAttribute("type", "button");
    if (media[mediaItems - 0]) {
      previousLink.setAttribute("href", `${media[mediaItems - 0]}`);
    } else if (media[mediaItems - 0] === undefined && media.length - 2) {
      mediaItems = media.length;
      previousLink.setAttribute("href", `${media[mediaItems - 1]}`);
    }

    previousLink.classList.add("previous-link");
    previousLink.id = "previous-link-id";
    sectionLithtbox.appendChild(previousLink);

    const nextLink = document.createElement("a");
    nextLink.setAttribute("type", "button");
    if (media[mediaItems + 2]) {
      nextLink.setAttribute("href", `${media[mediaItems + 2]}`);
    } else if (
      media[mediaItems + 2] === undefined &&
      mediaItems == media.length - 2
    ) {
      mediaItems = -1;
      nextLink.setAttribute("href", `${media[mediaItems + 1]}`);
    } else if (
      media[mediaItems + 2] === undefined &&
      mediaItems === media.length
    ) {
      mediaItems = -1;
      nextLink.setAttribute("href", `${media[mediaItems + 2]}`);
    }
    nextLink.classList.add("next-link");
    nextLink.id = "next-link-id";
    sectionLithtbox.appendChild(nextLink);

    const buttonModal = document.createElement("button");
    buttonModal.classList.add("button-modal");
    sectionLithtbox.appendChild(buttonModal);

    buttonModal.addEventListener("click", Lightbox.lightboxClose.bind(this));
    nextLink.addEventListener("click", Lightbox.nextImg.bind(this));
    previousLink.addEventListener("click", Lightbox.prevImg.bind(this));

    return sectionLithtbox;
  }

  static prevImg(e) {
    e.preventDefault();
    e.stopPropagation();
    //récupération du lien de l'image affichée dans la constante linkMedia
    const sectionLithtbox = e.target.closest("#section-lightbox-id");
    const [media, mediaTitleMap, MediaItems, MediaTitle] =
      Lightbox.MediaAllSetect(e);
    let mediaItems = MediaItems;
    let mediaTitle = MediaTitle;
    if (mediaItems === 0 || mediaTitle === 0) {
      mediaItems = media.length;
      mediaTitle = mediaTitleMap.length;
    }

    sectionLithtbox.innerHTML = "";
    const figureLightbox = document.createElement("figure");
    figureLightbox.classList.add("figure-lightbox");
    figureLightbox.id = "figure-lightbox-id";
    sectionLithtbox.appendChild(figureLightbox);
    if (media[mediaItems - 1].includes("jpg")) {
      const newImg = document.createElement("img");
      newImg.classList.add("media-lightbox");
      newImg.setAttribute("src", `${media[mediaItems - 1]}`);
      newImg.setAttribute("alt", `${mediaTitleMap[mediaTitle - 1]}`);
      newImg.id = "media-lightbox-id";
      figureLightbox.insertAdjacentElement("afterbegin", newImg);

      const newfigcaption = document.createElement("figcaption");
      newfigcaption.classList.add("figcaption-lightbox");
      newfigcaption.textContent = `${mediaTitleMap[mediaTitle - 1]}`;
      figureLightbox.insertAdjacentElement("beforeend", newfigcaption);
    } else if (media[mediaItems - 1].includes("mp4")) {
      const video = document.createElement("video");
      video.classList.add("media-lightbox");
      video.setAttribute("controls", "");
      figureLightbox.insertAdjacentElement("afterbegin", video);

      const source = document.createElement("source");
      source.id = "media-lightbox-id";
      source.setAttribute("src", `${media[mediaItems - 1]}`);
      source.setAttribute("alt", `${mediaTitleMap[mediaTitle - 1]}`);
      source.setAttribute("type", "video/mp4");
      video.appendChild(source);

      const figcaptionVideo = document.createElement("figcaption");
      figcaptionVideo.classList.add("figcaption-lightbox");
      figcaptionVideo.textContent = `${mediaTitleMap[mediaTitle - 1]}`;
      figureLightbox.appendChild(figcaptionVideo);
    }
    const previousLink = document.createElement("a");
    previousLink.setAttribute("type", "button");
    if (media[mediaItems - 2]) {
      previousLink.setAttribute("href", `${media[mediaItems - 2]}`);
    } else if (media[mediaItems - 2] === undefined && mediaItems === 1) {
      mediaItems = media.length;
      previousLink.setAttribute("href", `${media[mediaItems - 1]}`);
      mediaItems = 1;
    }
    previousLink.classList.add("previous-link");
    previousLink.id = "previous-link-id";
    sectionLithtbox.appendChild(previousLink);

    const nextLink = document.createElement("a");
    nextLink.setAttribute("type", "button");
    if (media[mediaItems + 0]) {
      nextLink.setAttribute("href", `${media[mediaItems + 0]}`);
    } else if (
      media[mediaItems + 0] === undefined &&
      mediaItems === media.length
    ) {
      mediaItems = -1;
      nextLink.setAttribute("href", `${media[mediaItems + 1]}`);
    } else if (
      media[mediaItems + 0] === undefined &&
      mediaItems === media.length - 1
    ) {
      nextLink.setAttribute("href", `${media[mediaItems + 1]}`);
    }
    nextLink.classList.add("next-link");
    nextLink.id = "next-link-id";
    sectionLithtbox.appendChild(nextLink);

    const buttonModal = document.createElement("button");
    buttonModal.classList.add("button-modal");
    sectionLithtbox.appendChild(buttonModal);

    buttonModal.addEventListener("click", Lightbox.lightboxClose.bind(this));
    nextLink.addEventListener("click", Lightbox.nextImg.bind(this));
    previousLink.addEventListener("click", Lightbox.prevImg.bind(this));

    return sectionLithtbox;
  }
}

let dataMedia = [];

class SortMedia extends Lightbox {
  constructor(data) {
    super(data);
    dataMedia.push(data);
  }

  static renderPopulaire(e) {
    e.stopPropagation();
    console.log(dataMedia);
    const imgSection = document.getElementById("img-section");
    imgSection.innerHTML = "";
    dataMedia.sort(function (a, b) {
      if (a._MediaLikes < b._MediaLikes) return -1;
      if (b._MediaLikes > b._MediaLikes) return 1;
      return 0;
    });
    if (dataMedia[0]._name) {
      dataMedia.shift();
    }
    const dataMediaAll = dataMedia;
    console.log(dataMediaAll);
    dataMediaAll.forEach((e) => {
      const articlePhoto = document.createElement("article");

      articlePhoto.classList.add("article-media");
      articlePhoto.id = "article-media-id";
      imgSection.insertAdjacentElement("afterbegin", articlePhoto);

      const figurePhoto = document.createElement("figure");
      figurePhoto.classList.add("figure-media");
      figurePhoto.id = "imgModal";
      articlePhoto.insertAdjacentElement("afterbegin", figurePhoto);
      if (e.MediaItems && e.MediaItems.includes("jpg")) {
        const Img = document.createElement("img");
        Img.classList.add("item-media");
        Img.setAttribute("src", `${e.MediaItems}`);
        Img.setAttribute("alt", `${e.MediaTitle}`);
        Img.id = "item-media-id";
        figurePhoto.insertAdjacentElement("beforeend", Img);

        const figcaptionImg = document.createElement("figcaption");
        figcaptionImg.classList.add("figcaption-media");
        figcaptionImg.textContent = `${e.MediaTitle}`;
        figurePhoto.insertAdjacentElement("beforeend", figcaptionImg);
      } else if (e.MediaItems && e.MediaItems.includes("mp4")) {
        const video = document.createElement("video");
        video.classList.add("item-media");
        video.id = "item-media-id";
        figurePhoto.insertAdjacentElement("afterbegin", video);

        const source = document.createElement("source");
        source.id = "source-id";
        source.setAttribute("alt", `${e.MediaTitle}`);
        source.setAttribute("src", `${e.MediaItems}`);
        source.setAttribute("type", "video/mp4");
        video.appendChild(source);

        const figcaptionVideo = document.createElement("figcaption");
        figcaptionVideo.classList.add("figcaption-media");
        figcaptionVideo.textContent = `${e.MediaTitle}`;
        figurePhoto.appendChild(figcaptionVideo);
      }
      const pVideo = document.createElement("p");
      pVideo.classList.add("number-likes");
      pVideo.textContent = `${e.Medialikes}`;
      figurePhoto.insertAdjacentElement("afterend", pVideo);

      const buttonHeart = document.createElement("button");
      buttonHeart.classList.add("buttonHeart");
      pVideo.insertAdjacentElement("afterend", buttonHeart);

      const mediaId = document.getElementById("item-media-id");
      mediaId.addEventListener("click", Lightbox.DomLightbox.bind(this));

      return articlePhoto;
    });
  }
  static renderDate(e) {
    e.stopPropagation();
    const imgSection = document.getElementById("img-section");
    imgSection.innerHTML = "";
    dataMedia.sort(function (a, b) {
      if (a._MediaDate < b._MediaDate) return -1;
      if (b._MediaDate > b._MediaDate) return 1;
      return 0;
    });
    if (dataMedia[0]._name) {
      dataMedia.shift();
    }
    const dataMediaAll = dataMedia;
    console.log(dataMediaAll);
    dataMediaAll.forEach((e) => {
      const articlePhoto = document.createElement("article");

      articlePhoto.classList.add("article-media");
      articlePhoto.id = "article-media-id";
      imgSection.insertAdjacentElement("afterbegin", articlePhoto);

      const figurePhoto = document.createElement("figure");
      figurePhoto.classList.add("figure-media");
      figurePhoto.id = "imgModal";
      articlePhoto.insertAdjacentElement("afterbegin", figurePhoto);
      if (e.MediaItems && e.MediaItems.includes("jpg")) {
        const Img = document.createElement("img");
        Img.classList.add("item-media");
        Img.setAttribute("src", `${e.MediaItems}`);
        Img.setAttribute("alt", `${e.MediaTitle}`);
        Img.id = "item-media-id";
        figurePhoto.insertAdjacentElement("beforeend", Img);

        const figcaptionImg = document.createElement("figcaption");
        figcaptionImg.classList.add("figcaption-media");
        figcaptionImg.textContent = `${e.MediaTitle}`;
        figurePhoto.insertAdjacentElement("beforeend", figcaptionImg);
      } else if (e.MediaItems && e.MediaItems.includes("mp4")) {
        const video = document.createElement("video");
        video.classList.add("item-media");
        video.id = "item-media-id";
        figurePhoto.insertAdjacentElement("afterbegin", video);

        const source = document.createElement("source");
        source.id = "source-id";
        source.setAttribute("alt", `${e.MediaTitle}`);
        source.setAttribute("src", `${e.MediaItems}`);
        source.setAttribute("type", "video/mp4");
        video.appendChild(source);

        const figcaptionVideo = document.createElement("figcaption");
        figcaptionVideo.classList.add("figcaption-media");
        figcaptionVideo.textContent = `${e.MediaTitle}`;
        figurePhoto.appendChild(figcaptionVideo);
      }
      const pVideo = document.createElement("p");
      pVideo.classList.add("number-likes");
      pVideo.textContent = `${e.Medialikes}`;
      figurePhoto.insertAdjacentElement("afterend", pVideo);

      const buttonHeart = document.createElement("button");
      buttonHeart.classList.add("buttonHeart");
      pVideo.insertAdjacentElement("afterend", buttonHeart);

      const mediaId = document.getElementById("item-media-id");
      mediaId.addEventListener("click", Lightbox.DomLightbox.bind(this));

      return articlePhoto;
    });
  }

  static renderTitre(e) {
    e.stopPropagation();
    const imgSection = document.getElementById("img-section");
    imgSection.innerHTML = "";
    dataMedia.sort(function (a, b) {
      if (a._MediaTitle > b._MediaTitle) return -1;
      if (b._MediaTitle < b._MediaTitle) return 1;
      return 0;
    });
    if (dataMedia[0]._name) {
      dataMedia.shift();
    }
    const dataMediaAll = dataMedia;
    console.log(dataMediaAll);
    dataMediaAll.forEach((e) => {
      const articlePhoto = document.createElement("article");

      articlePhoto.classList.add("article-media");
      articlePhoto.id = "article-media-id";
      imgSection.insertAdjacentElement("afterbegin", articlePhoto);

      const figurePhoto = document.createElement("figure");
      figurePhoto.classList.add("figure-media");
      figurePhoto.id = "imgModal";
      articlePhoto.insertAdjacentElement("afterbegin", figurePhoto);
      if (e.MediaItems && e.MediaItems.includes("jpg")) {
        const Img = document.createElement("img");
        Img.classList.add("item-media");
        Img.setAttribute("src", `${e.MediaItems}`);
        Img.setAttribute("alt", `${e.MediaTitle}`);
        Img.id = "item-media-id";
        figurePhoto.insertAdjacentElement("beforeend", Img);

        const figcaptionImg = document.createElement("figcaption");
        figcaptionImg.classList.add("figcaption-media");
        figcaptionImg.textContent = `${e.MediaTitle}`;
        figurePhoto.insertAdjacentElement("beforeend", figcaptionImg);
      } else if (e.MediaItems && e.MediaItems.includes("mp4")) {
        const video = document.createElement("video");
        video.classList.add("item-media");
        video.id = "item-media-id";
        figurePhoto.insertAdjacentElement("afterbegin", video);

        const source = document.createElement("source");
        source.id = "source-id";
        source.setAttribute("alt", `${e.MediaTitle}`);
        source.setAttribute("src", `${e.MediaItems}`);
        source.setAttribute("type", "video/mp4");
        video.appendChild(source);

        const figcaptionVideo = document.createElement("figcaption");
        figcaptionVideo.classList.add("figcaption-media");
        figcaptionVideo.textContent = `${e.MediaTitle}`;
        figurePhoto.appendChild(figcaptionVideo);
      }
      const pVideo = document.createElement("p");
      pVideo.classList.add("number-likes");
      pVideo.textContent = `${e.Medialikes}`;
      figurePhoto.insertAdjacentElement("afterend", pVideo);

      const buttonHeart = document.createElement("button");
      buttonHeart.classList.add("buttonHeart");
      pVideo.insertAdjacentElement("afterend", buttonHeart);

      const mediaId = document.getElementById("item-media-id");
      mediaId.addEventListener("click", Lightbox.DomLightbox.bind(this));

      return articlePhoto;
    });
  }
}
// écoute le boutton popularité et envoie à la fonction renderPopulaire()
const btnPopulaire = document.getElementById("button-populaire-id");
btnPopulaire.addEventListener("click", SortMedia.renderPopulaire.bind(this));

// écoute le boutton popularité et envoie à la fonction renderPopulaire()
const btnDate = document.getElementById("button-date-id");
btnDate.addEventListener("click", SortMedia.renderDate.bind(this));

const btnTitre = document.getElementById("button-titre-id");
btnTitre.addEventListener("click", SortMedia.renderTitre.bind(this));

class PhotographerTemplate extends SortMedia {
  constructor(data) {
    super(data);
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

    const divTiltle = document.createElement("div");
    divTiltle.classList.add("div-title");
    divBanner.insertAdjacentElement("afterbegin", divTiltle);

    const h1 = document.createElement("h1");
    h1.classList.add("photographer-h1");
    h1.textContent = `${this._data.name}`;
    divTiltle.insertAdjacentElement("afterbegin", h1);

    const city = document.createElement("p");
    city.classList.add("photographer-city");
    city.textContent = `${this._data.city}, ${this._data.country}`;
    divTiltle.insertAdjacentElement("beforeend", city);

    const citation = document.createElement("q");
    citation.classList.add("photographer-citation");
    citation.textContent = `${this._data.tagline}`;
    divTiltle.insertAdjacentElement("beforeend", citation);

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
    const articlePhoto = document.createElement("article");
    articlePhoto.classList.add("article-media");
    articlePhoto.id = "article-media-id";
    this.$imgSection.insertAdjacentElement("afterbegin", articlePhoto);

    const figurePhoto = document.createElement("figure");
    figurePhoto.classList.add("figure-media");
    figurePhoto.id = "imgModal";
    articlePhoto.insertAdjacentElement("afterbegin", figurePhoto);

    if (this._data.MediaItems.includes("jpg")) {
      const Img = document.createElement("img");
      Img.classList.add("item-media");
      Img.setAttribute("src", `${this._data.MediaItems}`);
      Img.setAttribute("alt", `${this._data.MediaTitle}`);
      Img.id = "item-media-id";
      figurePhoto.insertAdjacentElement("beforeend", Img);

      const figcaptionImg = document.createElement("figcaption");
      figcaptionImg.classList.add("figcaption-media");
      figcaptionImg.textContent = `${this._data.MediaTitle}`;
      figurePhoto.insertAdjacentElement("beforeend", figcaptionImg);
    } else if (this._data.MediaItems.includes("mp4")) {
      const video = document.createElement("video");
      video.classList.add("item-media");
      video.id = "item-media-id";
      figurePhoto.insertAdjacentElement("afterbegin", video);

      const source = document.createElement("source");
      source.id = "source-id";
      source.setAttribute("alt", `${this._data.MediaTitle}`);
      source.setAttribute("src", `${this._data.MediaItems}`);
      source.setAttribute("type", "video/mp4");
      video.appendChild(source);

      const figcaptionVideo = document.createElement("figcaption");
      figcaptionVideo.classList.add("figcaption-media");
      figcaptionVideo.textContent = `${this._data.MediaTitle}`;
      figurePhoto.appendChild(figcaptionVideo);
    }
    const pVideo = document.createElement("p");
    pVideo.classList.add("number-likes");
    pVideo.textContent = `${this._data.Medialikes}`;
    figurePhoto.insertAdjacentElement("afterend", pVideo);

    const buttonHeart = document.createElement("button");
    buttonHeart.classList.add("buttonHeart");
    pVideo.insertAdjacentElement("afterend", buttonHeart);

    const mediaId = document.getElementById("item-media-id");
    mediaId.addEventListener("click", Lightbox.DomLightbox.bind(this));

    return articlePhoto;
  }
}
