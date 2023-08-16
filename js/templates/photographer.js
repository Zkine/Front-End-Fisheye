const url = new URL(window.location.href);
const id = url.searchParams.get("id");
let mediaLightbox = [];
let mediaTitleLightbox = [];

class Lightbox {
  constructor(data) {
    this._data = data;
    if (this._data.MediaItems && this._data.MediaItems.includes("jpg")) {
      mediaLightbox.push(this._data.MediaItems);
      mediaTitleLightbox.push(this._data._MediaTitle);
    } else if (this._data.MediaItems && this._data.MediaItems.includes("mp4")) {
      mediaLightbox.push(this._data.MediaItems);
      mediaTitleLightbox.push(this._data._MediaTitle);
    }
  }

  //création du DOM de la lightbox
  static DomLightbox(e) {
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

    if (e.target.children[0].attributes[1].textContent.includes("jpg")) {
      const imgClick = e.target.children[0].attributes[1].textContent;
      const imgAlt = e.target.children[0].attributes[2].textContent;
      const imgDescriptoin = e.target.childNodes[1].childNodes[0].textContent;

      const imgLightbox = document.createElement("img");
      imgLightbox.classList.add("media-lightbox");
      imgLightbox.setAttribute("src", imgClick);
      imgLightbox.setAttribute("alt", imgAlt);
      imgLightbox.id = "media-lightbox-id";
      figureLightbox.insertAdjacentElement("afterbegin", imgLightbox);

      const figcaption = document.createElement("figcaption");
      figcaption.classList.add("figcaption-lightbox");
      figcaption.textContent = `${imgDescriptoin}`;
      figureLightbox.insertAdjacentElement("beforeend", figcaption);
    } else if (
      e.target.children[0].childNodes[0].attributes[2].textContent.includes(
        "mp4"
      )
    ) {
      const videoClick =
        e.target.children[0].childNodes[0].attributes[2].textContent;
      const videoAlt =
        e.target.children[0].children[0].attributes[1].textContent;
      const videoDescriptoin = e.target.childNodes[1].childNodes[0].textContent;

      const video = document.createElement("video");
      video.classList.add("media-lightbox");
      video.id = "video-id";
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
      figcaptionVideo.textContent = `${videoDescriptoin}`;
      figureLightbox.appendChild(figcaptionVideo);
    }
    const previousLink = document.createElement("a");
    previousLink.setAttribute("type", "button");
    previousLink.classList.add("previous-link");
    previousLink.id = "previous-link-id";
    section.appendChild(previousLink);

    const nextLink = document.createElement("a");
    nextLink.setAttribute("type", "button");
    nextLink.classList.add("next-link");
    nextLink.id = "next-link-id";
    section.appendChild(nextLink);

    const buttonModal = document.createElement("button");
    buttonModal.classList.add("button-modal");
    section.appendChild(buttonModal);

    buttonModal.addEventListener("click", this.lightboxClose.bind(this));
    nextLink.addEventListener("click", this.nextImg.bind(this));
    previousLink.addEventListener("click", this.prevImg.bind(this));

    return section;
  }

  // fermeture de la modale
  lightboxClose(e) {
    const sectionModal = e.target.closest("#lightbox-modal");
    const section = sectionModal.querySelector("#section-lightbox-id");
    return sectionModal.removeChild(section);
  }

  nextImg(e) {
    e.preventDefault();
    //récupération du lien de l'image affichée dans la constante linkMedia
    const imgParent = e.target.closest("#section-lightbox-id");
    const linkMedia = imgParent.querySelector("#media-lightbox-id");

    let mediaItems = mediaLightbox.findIndex(
      (element) => element === linkMedia.attributes[1].textContent
    );

    let mediaTitle = mediaTitleLightbox.findIndex(
      (element) => element === linkMedia.attributes[2].textContent
    );

    if (
      mediaItems === mediaLightbox.length - 1 ||
      mediaTitle === mediaTitleLightbox.length - 1
    ) {
      mediaItems = -1;
      mediaTitle = -1;
    }

    const figureLightbox = imgParent.querySelector("#figure-lightbox-id");
    if (mediaLightbox[mediaItems + 1].includes("jpg")) {
      const newImg = document.createElement("img");
      newImg.classList.add("media-lightbox");
      newImg.setAttribute("src", `${mediaLightbox[mediaItems + 1]}`);
      newImg.setAttribute("alt", `${mediaTitleLightbox[mediaTitle + 1]}`);
      newImg.id = "media-lightbox-id";
      figureLightbox.insertAdjacentElement("afterbegin", newImg);

      const newfigcaption = document.createElement("figcaption");
      newfigcaption.classList.add("figcaption-lightbox");
      newfigcaption.textContent = `${mediaTitleLightbox[mediaTitle + 1]}`;
      figureLightbox.appendChild(newfigcaption);

      figureLightbox.innerHTML = "";
      return figureLightbox.append(newImg, newfigcaption);
    } else if (mediaLightbox[mediaItems + 1].includes("mp4")) {
      const video = document.createElement("video");
      video.classList.add("media-lightbox");
      video.id = "video-id";
      video.setAttribute("controls", "");
      figureLightbox.insertAdjacentElement("afterbegin", video);

      const source = document.createElement("source");
      source.id = "media-lightbox-id";
      source.setAttribute("src", `${mediaLightbox[mediaItems + 1]}`);
      source.setAttribute("alt", `${mediaTitleLightbox[mediaTitle + 1]}`);
      source.setAttribute("type", "video/mp4");
      video.appendChild(source);

      const figcaptionVideo = document.createElement("figcaption");
      figcaptionVideo.classList.add("figcaption-lightbox");
      figcaptionVideo.textContent = `${mediaTitleLightbox[mediaTitle + 1]}`;
      figureLightbox.appendChild(figcaptionVideo);
      figureLightbox.innerHTML = "";
      return figureLightbox.append(video, figcaptionVideo);
    }
  }

  prevImg(e) {
    e.preventDefault();
    //récupération du lien de l'image affichée dans la constante linkMedia
    const imgParent = e.target.closest("#section-lightbox-id");
    const linkMedia = imgParent.querySelector("#media-lightbox-id");

    let mediaItems = mediaLightbox.findIndex(
      (element) => element === linkMedia.attributes[1].textContent
    );

    let mediaTitle = mediaTitleLightbox.findIndex(
      (element) => element === linkMedia.attributes[2].textContent
    );

    if (mediaItems === 0 || mediaTitle === 0) {
      mediaItems = mediaLightbox.length - 1;
      mediaTitle = mediaTitleLightbox.length - 1;
    }

    const figureLightbox = imgParent.querySelector("#figure-lightbox-id");

    if (mediaLightbox[mediaItems - 1].includes("jpg")) {
      const newImg = document.createElement("img");
      newImg.classList.add("media-lightbox");
      newImg.setAttribute("src", `${mediaLightbox[mediaItems - 1]}`);
      newImg.setAttribute("alt", `${mediaTitleLightbox[mediaTitle - 1]}`);
      newImg.id = "media-lightbox-id";
      figureLightbox.insertAdjacentElement("afterbegin", newImg);

      const newfigcaption = document.createElement("figcaption");
      newfigcaption.classList.add("figcaption-lightbox");
      newfigcaption.textContent = `${mediaTitleLightbox[mediaTitle - 1]}`;
      figureLightbox.insertAdjacentElement("beforeend", newfigcaption);

      figureLightbox.innerHTML = "";
      return figureLightbox.append(newImg, newfigcaption);
    } else if (mediaLightbox[mediaItems - 1].includes("mp4")) {
      const video = document.createElement("video");
      video.classList.add("media-lightbox");
      video.id = "video-id";
      video.setAttribute("controls", "");
      figureLightbox.insertAdjacentElement("afterbegin", video);

      const source = document.createElement("source");
      source.id = "media-lightbox-id";
      source.setAttribute("src", `${mediaLightbox[mediaItems - 1]}`);
      source.setAttribute("alt", `${mediaTitleLightbox[mediaTitle - 1]}`);
      source.setAttribute("type", "video/mp4");
      video.appendChild(source);

      const figcaptionVideo = document.createElement("figcaption");
      figcaptionVideo.classList.add("figcaption-lightbox");
      figcaptionVideo.textContent = `${mediaTitleLightbox[mediaTitle - 1]}`;
      figureLightbox.appendChild(figcaptionVideo);
      figureLightbox.innerHTML = "";
      return figureLightbox.append(video, figcaptionVideo);
    }
  }
}

class PhotographerTemplate extends Lightbox {
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
    const articlePhoto = document.createElement("article");
    articlePhoto.classList.add("article-media");
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
      figurePhoto.insertAdjacentElement("beforeend", Img);

      const figcaptionImg = document.createElement("figcaption");
      figcaptionImg.classList.add("figcaption-media");
      figcaptionImg.textContent = `${this._data.MediaTitle}`;
      figurePhoto.insertAdjacentElement("beforeend", figcaptionImg);
    } else if (this._data.MediaItems.includes("mp4")) {
      const video = document.createElement("video");
      video.classList.add("item-media");
      video.id = "video-id";
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

    articlePhoto.addEventListener("click", Lightbox.DomLightbox.bind(this));

    return articlePhoto;
  }
}
