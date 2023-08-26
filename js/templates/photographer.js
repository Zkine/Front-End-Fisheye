const url = new URL(window.location.href);
const id = url.searchParams.get("id");

let dataMedia = [];
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

    dataMedia.push(data);
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
    h1.id = "photographer-h1-id";
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
      figcaptionImg.id = "figcaption-media-id";
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
      figcaptionVideo.id = "figcaption-media-id";
      figurePhoto.appendChild(figcaptionVideo);
    }
    const pVideo = document.createElement("p");
    pVideo.classList.add("number-likes");
    pVideo.id = "number-likes-id";
    pVideo.textContent = `${this._data.Medialikes}`;
    figurePhoto.insertAdjacentElement("afterend", pVideo);

    const buttonHeart = document.createElement("button");
    buttonHeart.classList.add("button-heart");
    buttonHeart.id = "button-heart-id";
    pVideo.insertAdjacentElement("afterend", buttonHeart);

    const iconHeart = document.createElement("i");
    const classesFontAwesome = ["fa-regular", "fa-heart"];
    classesFontAwesome.forEach(() => {
      iconHeart.classList.add(...classesFontAwesome);
    });
    iconHeart.id = "fontawesome-id";
    buttonHeart.appendChild(iconHeart);

    const HeartId = document.getElementById("button-heart-id");
    HeartId.addEventListener("click", LikesMedia.gestionLikes.bind(this));

    const mediaId = document.getElementById("item-media-id");
    mediaId.addEventListener("click", Lightbox.DomLightbox.bind(this));

    return articlePhoto;
  }
}

class SortMedia extends PhotographerTemplate {
  static LikesUpdate(dataMediaAll) {
    if (dataMedia[0]._name) {
      dataMedia.shift();

      const likesfull = document.getElementById("calcul-like");
      const likesFull = Number(parseInt(likesfull.textContent));
      if (likesFull === dataMedia) {
        likesfull = dataMedia.push(data);
      } else if (likesFull !== dataMedia) {
        likesFull;
      }
    }

    dataMediaAll = dataMedia;

    for (const likesValue of mediaLinked) {
      dataMediaAll.forEach((v) => {
        if (
          v._MediaTitle === likesValue.media &&
          v._MediaLikes !== likesValue.likesMedia
        ) {
          Object.defineProperty(v, "_MediaLikes", {
            value: likesValue.likesMedia,
            writable: false,
          });
          Object.defineProperty(v, "_MediaHeart", {
            value: likesValue._MediaHeart,
            writable: true,
          });
        }
      });
    }

    return [dataMediaAll];
  }

  static renderPopulaire(e) {
    e.stopPropagation();
    const imgSection = document.getElementById("img-section");
    dataMedia.sort(function (a, b) {
      if (a._MediaLikes < b._MediaLikes) return -1;
      if (b._MediaLikes > b._MediaLikes) return 1;
      return 0;
    });

    imgSection.innerHTML = "";
    const [dataMediaAll] = SortMedia.LikesUpdate(e);
    // for (const dataMedia of dataMediaAlls) {
    // }LikesUpdate(dataMedia, likesfull,dataMediaAll,mediaLinked)
    dataMediaAll.forEach((w) => {
      const articlePhoto = document.createElement("article");
      articlePhoto.classList.add("article-media");
      articlePhoto.id = "article-media-id";
      imgSection.insertAdjacentElement("afterbegin", articlePhoto);

      const figurePhoto = document.createElement("figure");
      figurePhoto.classList.add("figure-media");
      figurePhoto.id = "imgModal";
      articlePhoto.insertAdjacentElement("afterbegin", figurePhoto);
      if (w.MediaItems && w.MediaItems.includes("jpg")) {
        const Img = document.createElement("img");
        Img.classList.add("item-media");
        Img.setAttribute("src", `${w.MediaItems}`);
        Img.setAttribute("alt", `${w.MediaTitle}`);
        Img.id = "item-media-id";
        figurePhoto.insertAdjacentElement("beforeend", Img);

        const figcaptionImg = document.createElement("figcaption");
        figcaptionImg.classList.add("figcaption-media");
        figcaptionImg.textContent = `${w.MediaTitle}`;
        figcaptionImg.id = "figcaption-media-id";
        figurePhoto.insertAdjacentElement("beforeend", figcaptionImg);
      } else if (w.MediaItems && w.MediaItems.includes("mp4")) {
        const video = document.createElement("video");
        video.classList.add("item-media");
        video.id = "item-media-id";
        figurePhoto.insertAdjacentElement("afterbegin", video);

        const source = document.createElement("source");
        source.id = "source-id";
        source.setAttribute("alt", `${w.MediaTitle}`);
        source.setAttribute("src", `${w.MediaItems}`);
        source.setAttribute("type", "video/mp4");
        video.appendChild(source);

        const figcaptionVideo = document.createElement("figcaption");
        figcaptionVideo.classList.add("figcaption-media");
        figcaptionVideo.textContent = `${w.MediaTitle}`;
        figcaptionVideo.id = "figcaption-media-id";
        figurePhoto.appendChild(figcaptionVideo);
      }
      const pVideo = document.createElement("p");
      pVideo.classList.add("number-likes");
      pVideo.id = "number-likes-id";
      pVideo.textContent = `${w.Medialikes}`;
      figurePhoto.insertAdjacentElement("afterend", pVideo);

      const buttonHeart = document.createElement("button");
      buttonHeart.classList.add("button-heart");
      buttonHeart.id = "button-heart-id";
      pVideo.insertAdjacentElement("afterend", buttonHeart);

      const iconHeart = document.createElement("i");
      if (!w._MediaHeart) {
        const classesFontAwesome = ["fa-regular", "fa-heart"];
        iconHeart.classList.add(...classesFontAwesome);
      } else if (w._MediaHeart) {
        if (w._MediaHeart === "fa-regular fa-heart") {
          const classesFontAwesome = ["fa-regular", "fa-heart"];
          iconHeart.classList.add(...classesFontAwesome);
        } else {
          const classesFontAwesome = ["fa-solid", "fa-heart"];
          iconHeart.classList.add(...classesFontAwesome);
        }
      }
      iconHeart.id = "fontawesome-id";
      buttonHeart.appendChild(iconHeart);

      const HeartId = document.getElementById("button-heart-id");
      HeartId.addEventListener("click", LikesMedia.gestionLikes.bind(this));
      const mediaId = document.getElementById("item-media-id");
      mediaId.addEventListener("click", Lightbox.DomLightbox.bind(this));

      return articlePhoto;
    });
  }

  static renderDate(e) {
    e.stopPropagation();
    const imgSection = document.getElementById("img-section");
    dataMedia.sort(function (a, b) {
      if (a._MediaDate < b._MediaDate) return -1;
      if (b._MediaDate > b._MediaDate) return 1;
      return 0;
    });

    imgSection.innerHTML = "";
    const [dataMediaAll] = SortMedia.LikesUpdate(e);
    dataMediaAll.forEach((w) => {
      const articlePhoto = document.createElement("article");
      articlePhoto.classList.add("article-media");
      articlePhoto.id = "article-media-id";
      imgSection.insertAdjacentElement("afterbegin", articlePhoto);

      const figurePhoto = document.createElement("figure");
      figurePhoto.classList.add("figure-media");
      figurePhoto.id = "imgModal";
      articlePhoto.insertAdjacentElement("afterbegin", figurePhoto);
      if (w.MediaItems && w.MediaItems.includes("jpg")) {
        const Img = document.createElement("img");
        Img.classList.add("item-media");
        Img.setAttribute("src", `${w.MediaItems}`);
        Img.setAttribute("alt", `${w.MediaTitle}`);
        Img.id = "item-media-id";
        figurePhoto.insertAdjacentElement("beforeend", Img);

        const figcaptionImg = document.createElement("figcaption");
        figcaptionImg.classList.add("figcaption-media");
        figcaptionImg.textContent = `${w.MediaTitle}`;
        figcaptionImg.id = "figcaption-media-id";
        figurePhoto.insertAdjacentElement("beforeend", figcaptionImg);
      } else if (w.MediaItems && w.MediaItems.includes("mp4")) {
        const video = document.createElement("video");
        video.classList.add("item-media");
        video.id = "item-media-id";
        figurePhoto.insertAdjacentElement("afterbegin", video);

        const source = document.createElement("source");
        source.id = "source-id";
        source.setAttribute("alt", `${w.MediaTitle}`);
        source.setAttribute("src", `${w.MediaItems}`);
        source.setAttribute("type", "video/mp4");
        video.appendChild(source);

        const figcaptionVideo = document.createElement("figcaption");
        figcaptionVideo.classList.add("figcaption-media");
        figcaptionVideo.textContent = `${w.MediaTitle}`;
        figcaptionVideo.id = "figcaption-media-id";
        figurePhoto.appendChild(figcaptionVideo);
      }
      const pVideo = document.createElement("p");
      pVideo.classList.add("number-likes");
      pVideo.id = "number-likes-id";
      pVideo.textContent = `${w.Medialikes}`;
      figurePhoto.insertAdjacentElement("afterend", pVideo);

      const buttonHeart = document.createElement("button");
      buttonHeart.classList.add("button-heart");
      buttonHeart.id = "button-heart-id";
      pVideo.insertAdjacentElement("afterend", buttonHeart);

      const iconHeart = document.createElement("i");
      if (!w._MediaHeart) {
        const classesFontAwesome = ["fa-regular", "fa-heart"];
        iconHeart.classList.add(...classesFontAwesome);
      } else if (w._MediaHeart) {
        if (w._MediaHeart === "fa-regular fa-heart") {
          const classesFontAwesome = ["fa-regular", "fa-heart"];
          iconHeart.classList.add(...classesFontAwesome);
        } else {
          const classesFontAwesome = ["fa-solid", "fa-heart"];
          iconHeart.classList.add(...classesFontAwesome);
        }
      }
      iconHeart.id = "fontawesome-id";
      buttonHeart.appendChild(iconHeart);

      const HeartId = document.getElementById("button-heart-id");
      HeartId.addEventListener("click", LikesMedia.gestionLikes.bind(this));
      const mediaId = document.getElementById("item-media-id");
      mediaId.addEventListener("click", Lightbox.DomLightbox.bind(this));
      return articlePhoto;
    });
  }

  static renderTitre(e) {
    e.stopPropagation();
    const imgSection = document.getElementById("img-section");
    dataMedia.sort(function (a, b) {
      if (a._MediaTitle > b._MediaTitle) return -1;
      if (b._MediaTitle < b._MediaTitle) return 1;
      return 0;
    });

    imgSection.innerHTML = "";
    const [dataMediaAll] = SortMedia.LikesUpdate(e);

    dataMediaAll.forEach((w) => {
      const articlePhoto = document.createElement("article");
      articlePhoto.classList.add("article-media");
      articlePhoto.id = "article-media-id";
      imgSection.insertAdjacentElement("afterbegin", articlePhoto);

      const figurePhoto = document.createElement("figure");
      figurePhoto.classList.add("figure-media");
      figurePhoto.id = "imgModal";
      articlePhoto.insertAdjacentElement("afterbegin", figurePhoto);
      if (w.MediaItems && w.MediaItems.includes("jpg")) {
        const Img = document.createElement("img");
        Img.classList.add("item-media");
        Img.setAttribute("src", `${w.MediaItems}`);
        Img.setAttribute("alt", `${w.MediaTitle}`);
        Img.id = "item-media-id";
        figurePhoto.insertAdjacentElement("beforeend", Img);

        const figcaptionImg = document.createElement("figcaption");
        figcaptionImg.classList.add("figcaption-media");
        figcaptionImg.textContent = `${w.MediaTitle}`;
        figcaptionImg.id = "figcaption-media-id";
        figurePhoto.insertAdjacentElement("beforeend", figcaptionImg);
      } else if (w.MediaItems && w.MediaItems.includes("mp4")) {
        const video = document.createElement("video");
        video.classList.add("item-media");
        video.id = "item-media-id";
        figurePhoto.insertAdjacentElement("afterbegin", video);

        const source = document.createElement("source");
        source.id = "source-id";
        source.setAttribute("alt", `${w.MediaTitle}`);
        source.setAttribute("src", `${w.MediaItems}`);
        source.setAttribute("type", "video/mp4");
        video.appendChild(source);

        const figcaptionVideo = document.createElement("figcaption");
        figcaptionVideo.classList.add("figcaption-media");
        figcaptionVideo.textContent = `${w.MediaTitle}`;
        figcaptionVideo.id = "figcaption-media-id";
        figurePhoto.appendChild(figcaptionVideo);
      }
      const pVideo = document.createElement("p");
      pVideo.classList.add("number-likes");
      pVideo.id = "number-likes-id";
      pVideo.textContent = `${w.Medialikes}`;
      figurePhoto.insertAdjacentElement("afterend", pVideo);

      const buttonHeart = document.createElement("button");
      buttonHeart.classList.add("button-heart");
      buttonHeart.id = "button-heart-id";
      pVideo.insertAdjacentElement("afterend", buttonHeart);

      const iconHeart = document.createElement("i");
      if (!w._MediaHeart) {
        const classesFontAwesome = ["fa-regular", "fa-heart"];
        iconHeart.classList.add(...classesFontAwesome);
      } else if (w._MediaHeart) {
        if (w._MediaHeart === "fa-regular fa-heart") {
          const classesFontAwesome = ["fa-regular", "fa-heart"];
          iconHeart.classList.add(...classesFontAwesome);
        } else {
          const classesFontAwesome = ["fa-solid", "fa-heart"];
          iconHeart.classList.add(...classesFontAwesome);
        }
      }
      iconHeart.id = "fontawesome-id";
      buttonHeart.appendChild(iconHeart);

      const HeartId = document.getElementById("button-heart-id");
      HeartId.addEventListener("click", LikesMedia.gestionLikes.bind(this));
      const mediaId = document.getElementById("item-media-id");
      mediaId.addEventListener("click", Lightbox.DomLightbox.bind(this));

      return articlePhoto;
    });
  }
}
// écoute du boutton popularité et appel à la fonction renderPopulaire()
const btnPopulaire = document.getElementById("button-populaire-id");
btnPopulaire.addEventListener("click", SortMedia.renderPopulaire.bind(this));

// écoute du boutton popularité et appel à la fonction renderPopulaire()
const btnDate = document.getElementById("button-date-id");
btnDate.addEventListener("click", SortMedia.renderDate.bind(this));

// écoute du boutton popularité et appel à la fonction renderTitre()
const btnTitre = document.getElementById("button-titre-id");
btnTitre.addEventListener("click", SortMedia.renderTitre.bind(this));

let mediaLinked = [];
class LikesMedia extends SortMedia {
  constructor(data) {
    super(data);
    this._data = data;
  }
  static gestionLikes(e) {
    const likesFull = document.getElementById("calcul-like");
    const articleMedia = e.target.closest("#article-media-id");
    const media = articleMedia.querySelector("#figcaption-media-id");
    const likesMedia = articleMedia.querySelector("#number-likes-id");
    const classHeart = e.target;

    if (classHeart.classList.contains("fa-regular")) {
      classHeart.classList.remove("fa-regular");
      classHeart.classList.add("fa-solid");
      likesFull.textContent = Number(parseInt(likesFull.textContent)) + 1;
      if (this._data !== undefined) {
        likesMedia.textContent =
          Number(parseInt(`${this._data.Medialikes}`)) + 1;
      } else {
        likesMedia.textContent = Number(parseInt(likesMedia.textContent)) + 1;
      }
    } else if (classHeart.classList.contains("fa-solid")) {
      classHeart.classList.remove("fa-solid");
      classHeart.classList.add("fa-regular");
      likesFull.textContent = Number(parseInt(likesFull.textContent)) - 1;
      if (this._data !== undefined) {
        likesMedia.textContent = Number(parseInt(`${this._data.Medialikes}`));
      } else {
        likesMedia.textContent = Number(parseInt(likesMedia.textContent)) - 1;
      }
    }

    function LikesTrue(media, likesMedia, mediaHearts) {
      this.media = media;
      this.likesMedia = Number(parseInt(likesMedia));
      this._MediaHeart = mediaHearts;
    }
    let likesTrue = new LikesTrue(
      media.textContent,
      likesMedia.textContent,
      classHeart.classList.value
    );

    if (!mediaLinked.length) {
      mediaLinked.push(likesTrue);
    } else {
      const mediaLinkeName = mediaLinked.find(
        (m) => m.media === media.textContent
      );
      if (!mediaLinkeName) {
        mediaLinked.push(likesTrue);
      } else if (mediaLinkeName) {
        mediaLinked.forEach((z) => {
          if (
            z.media === mediaLinkeName.media &&
            classHeart.classList.contains("fa-solid")
          ) {
            const keymedialike = mediaLinked.indexOf(mediaLinkeName);
            mediaLinked.splice(keymedialike, 1);
            likesTrue._MediaHeart = "fa-solid fa-heart";
            mediaLinked.push(likesTrue);
          } else if (
            z.media === mediaLinkeName.media &&
            classHeart.classList.contains("fa-regular")
          ) {
            const keymedialike = mediaLinked.indexOf(mediaLinkeName);
            likesTrue.likesMedia = likesTrue.likesMedia;
            mediaLinked.splice(keymedialike, 1);
            likesTrue._MediaHeart = "fa-regular fa-heart";
            mediaLinked.push(likesTrue);
          }
        });
      }
    }
  }
}
