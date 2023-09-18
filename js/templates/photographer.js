let dataMedia = [];
class PhotographerTemplate {
  constructor(data) {
    // renvoi les données data pour la création du DOM - photographer.html
    this._data = data;
    dataMedia.push(data);

    this.$imgSection = document.getElementById("img-section-id");
    // affichage des likes
    this.$claculLikes = document.getElementById("calcul-like-id");
    // eslint-disable-next-line
    this.$claculLikes.textContent = MediaModel.MediaFullLickes();
    // affichage du prix
    this.$claculPrice = document.getElementById("calcul-price-id");
    // eslint-disable-next-line
    this.$claculPrice.textContent = MediaModel.MediaFullprice();
  }

  renderBanner() {
    // création du banner de la page photographer.html
    const divBanner = document.createElement("div");
    divBanner.classList.add("photograph-banner");

    const divTritre = document.createElement("div");
    divTritre.classList.add("div-title");
    divBanner.insertAdjacentElement("afterbegin", divTritre);

    const h1 = document.createElement("h1");
    h1.setAttribute("tabindex", "0");
    h1.classList.add("photographer-h1");
    h1.id = "photographer-h1-id";
    h1.textContent = `${this._data.name}`;
    divTritre.insertAdjacentElement("afterbegin", h1);

    const city = document.createElement("p");
    city.setAttribute("tabindex", "0");
    city.classList.add("photographer-city");
    city.textContent = `${this._data.city}, ${this._data.country}`;
    divTritre.insertAdjacentElement("beforeend", city);

    const citation = document.createElement("q");
    citation.setAttribute("tabindex", "0");
    citation.classList.add("photographer-citation");
    citation.textContent = `${this._data.tagline}`;
    divTritre.insertAdjacentElement("beforeend", citation);

    const button = document.createElement("button");
    button.setAttribute("tabindex", "0");
    button.setAttribute("type", "button");
    button.classList.add("contact_button");
    button.id = "displayModal";
    button.setAttribute("aria-labelledby", "contact_modal-id");
    button.textContent = "Contactez-moi";
    divBanner.insertAdjacentElement("beforeend", button);

    const divImg = document.createElement("div");
    divImg.classList.add("conteneur-img");
    divBanner.insertAdjacentElement("beforeend", divImg);

    const portrait = document.createElement("img");
    portrait.setAttribute("tabindex", "0");
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
    const namePhotographer = document.getElementById("photographer-h1-id");
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
      Img.setAttribute("alt", "");
      Img.id = "item-media-id";
      Img.setAttribute("aria-label", `${this._data.MediaTitle}, closeup view`);
      Img.setAttribute("aria-labelledby", "lightbox-modal");
      Img.setAttribute("tabindex", "0");
      figurePhoto.insertAdjacentElement("beforeend", Img);

      const figcaptionImg = document.createElement("figcaption");
      figcaptionImg.classList.add("figcaption-media");
      figcaptionImg.id = "figcaption-media-id";
      figcaptionImg.setAttribute("tabindex", "0");
      figcaptionImg.textContent = `${this._data.MediaTitle}`;
      figurePhoto.insertAdjacentElement("beforeend", figcaptionImg);
    } else if (this._data.MediaItems.includes("mp4")) {
      figurePhoto.classList.add(...["figure-media", "figure-media-video"]);

      const video = document.createElement("video");
      video.classList.add("item-media");
      video.id = "item-media-id";
      video.setAttribute(
        "aria-label",
        `${this._data.MediaTitle}, closeup view`
      );
      video.setAttribute("aria-labelledby", "lightbox-modal");
      video.setAttribute("tabindex", "0");
      figurePhoto.insertAdjacentElement("afterbegin", video);

      const source = document.createElement("source");
      source.id = "source-id";
      source.setAttribute("src", `${this._data.MediaItems}`);
      source.setAttribute("type", "video/mp4");
      video.insertAdjacentElement("afterbegin", source);

      const figcaptionVideo = document.createElement("figcaption");
      figcaptionVideo.classList.add("figcaption-media");
      figcaptionVideo.id = "figcaption-media-id";
      figcaptionVideo.setAttribute("tabindex", "0");
      figcaptionVideo.textContent = `${this._data.MediaTitle}`;
      figurePhoto.appendChild(figcaptionVideo);
    }

    const mediaLikes = document.createElement("p");
    mediaLikes.classList.add("number-likes");
    mediaLikes.id = "number-likes-id";
    mediaLikes.setAttribute("tabindex", "0");
    mediaLikes.textContent = `${this._data.Medialikes}`;
    figurePhoto.insertAdjacentElement("afterend", mediaLikes);

    const iconHeart = document.createElement("i");
    iconHeart.classList.add(...["fa-regular", "fa-heart"]);
    iconHeart.id = "fontawesome-id";
    iconHeart.setAttribute("aria-pressed", "false");
    iconHeart.setAttribute("aria-label", "likes");
    iconHeart.setAttribute("aria-hidden", "true");
    iconHeart.setAttribute("tabindex", "0");
    mediaLikes.insertAdjacentElement("afterend", iconHeart);

    const spanBtn = document.createElement("span");
    spanBtn.classList.add("screenreader-text");
    spanBtn.textContent = `Ajouter un like ou retirer un like à ${namePhotographer.textContent}`;
    iconHeart.insertAdjacentElement("afterend", spanBtn);

    const HeartId = document.getElementById("fontawesome-id");
    HeartId.addEventListener("click", LikesMedia.gestionLikes);
    HeartId.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        return LikesMedia.gestionLikes(e);
      }
    });

    const mediaId = document.getElementById("item-media-id");
    // eslint-disable-next-line
    mediaId.addEventListener("click", Lightbox.DomLightbox);
    mediaId.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        // eslint-disable-next-line
        return Lightbox.DomLightbox(e);
      }
    });

    return articlePhoto;
  }
}

let replacedNode = [];
class SortMedia extends PhotographerTemplate {
  static LikesUpdate(dataMediaAll) {
    if (dataMedia[0]._name) {
      dataMedia.shift();
      let likesfull = document.getElementById("calcul-like-id");
      Number(parseInt(likesfull.textContent));
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

  static UpdateMedia(mediaImage) {
    const [dataMediaAll] = SortMedia.LikesUpdate();
    mediaImage = document.querySelectorAll("#item-media-id");
    const figureMedia = document.querySelectorAll("#imgModal");
    const neaudVideo = document.querySelector("video");
    const cloneVideo = neaudVideo.cloneNode(true);

    const neaudImage = document.querySelector("figure img");
    const cloneImage = neaudImage.cloneNode(true);

    for (let w = 0; w < dataMediaAll.length; w++) {
      for (let i = 0; i < mediaImage.length; i++) {
        for (let f = 0; f < figureMedia.length; f++) {
          const noeudVideo = figureMedia[f].childNodes[0].nodeName === "VIDEO";
          const noeudImage =
            figureMedia[f].childNodes[0].alt === mediaImage[i].alt;
          if (
            dataMediaAll[w].MediaItems.includes("jpg") &&
            Number([w]) === Number([i]) &&
            Number([w]) === Number([f])
          ) {
            if (mediaImage[i].nodeName === "IMG") {
              mediaImage[i].setAttribute(
                "src",
                `${dataMediaAll[w].MediaItems}`
              );
              mediaImage[i].setAttribute(
                "aria-label",
                `${dataMediaAll[w].MediaTitle}, closeup view`
              );

              mediaImage[
                i
              ].nextElementSibling.textContent = `${dataMediaAll[w].MediaTitle}`;

              mediaImage[
                i
              ].offsetParent.nextElementSibling.textContent = `${dataMediaAll[w].Medialikes}`;

              if (!dataMediaAll[w]._MediaHeart) {
                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.classList.value =
                  "";
                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.classList.add(
                  ...["fa-heart", "fa-regular"]
                );
              } else if (dataMediaAll[w]._MediaHeart) {
                if (dataMediaAll[w]._MediaHeart === "fa-regular fa-heart") {
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.value =
                    "";

                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.add(
                    ...["fa-regular", "fa-heart"]
                  );
                } else {
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.value =
                    "";

                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.add(
                    ...["fa-solid", "fa-heart"]
                  );
                }
              }
            } else if (
              mediaImage[i].nodeName === "VIDEO" &&
              noeudVideo === true &&
              noeudImage === true
            ) {
              mediaImage[
                i
              ].nextElementSibling.textContent = `${dataMediaAll[w].MediaTitle}`;

              mediaImage[
                i
              ].offsetParent.nextElementSibling.textContent = `${dataMediaAll[w].Medialikes}`;

              if (!dataMediaAll[w]._MediaHeart) {
                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.classList.value =
                  "";
                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.classList.add(
                  ...["fa-regular", "fa-heart"]
                );
              } else if (dataMediaAll[w]._MediaHeart) {
                if (dataMediaAll[w]._MediaHeart === "fa-regular fa-heart") {
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.value =
                    "";
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.add(
                    ...["fa-regular", "fa-heart"]
                  );
                } else {
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.value =
                    "";
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.add(
                    ...["fa-solid", "fa-heart"]
                  );
                }
              }
              mediaImage[i].parentElement.classList.remove(
                "figure-media-video"
              );
              cloneImage.setAttribute("src", `${dataMediaAll[w].MediaItems}`);

              figureMedia[f].replaceChild(
                cloneImage,
                figureMedia[f].childNodes[0]
              );
              cloneImage.addEventListener("click", (e) => CloneEvent(e));
              cloneImage.addEventListener("keydown", (e) => CloneEvent(e));
            }
          } else if (
            dataMediaAll[w].MediaItems.includes("mp4") &&
            Number([w]) === Number([i]) &&
            Number([w]) === Number([f])
          ) {
            if (mediaImage[i].nodeName === "VIDEO") {
              if (!dataMediaAll[w]._MediaHeart) {
                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.classList.value =
                  "";

                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.classList.add(
                  ...["fa-regular", "fa-heart"]
                );
              } else if (dataMediaAll[w]._MediaHeart) {
                if (dataMediaAll[w]._MediaHeart === "fa-regular fa-heart") {
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.value =
                    "";

                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.add(
                    ...["fa-regular", "fa-heart"]
                  );
                } else {
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.value =
                    "";
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.add(
                    ...["fa-solid", "fa-heart"]
                  );
                }
              }
            } else if (
              (mediaImage[i].nodeName === "IMG" &&
                noeudVideo === true &&
                noeudImage === true) ||
              (replacedNode && noeudImage === true)
            ) {
              mediaImage[
                i
              ].nextElementSibling.textContent = `${dataMediaAll[w].MediaTitle}`;

              mediaImage[
                i
              ].offsetParent.nextElementSibling.textContent = `${dataMediaAll[w].Medialikes}`;

              if (!dataMediaAll[w]._MediaHeart) {
                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.classList.value =
                  "";
                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.classList.add(
                  ...["fa-regular", "fa-heart"]
                );
              } else if (dataMediaAll[w]._MediaHeart) {
                if (dataMediaAll[w]._MediaHeart === "fa-regular fa-heart") {
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.value =
                    "";
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.add(
                    ...["fa-regular", "fa-heart"]
                  );
                } else {
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.value =
                    "";

                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.classList.add(
                    ...["fa-solid", "fa-heart"]
                  );
                }
              }

              mediaImage[i].parentElement.classList.add("figure-media-video");

              figureMedia[f].replaceChild(
                cloneVideo,
                figureMedia[f].childNodes[0]
              );
              cloneVideo.addEventListener("click", (e) => CloneEvent(e));
              cloneVideo.addEventListener("keydown", (e) => CloneEvent(e));
            }
          }
        }
      }
    }
    return [mediaImage];
  }

  static renderPopulaire(e) {
    const [dataMediaAll] = SortMedia.LikesUpdate(e);
    dataMediaAll.sort((a, b) => b._MediaLikes - a._MediaLikes);
    const [mediaImage] = SortMedia.UpdateMedia(e);
    return mediaImage;
  }
  static renderDate(e) {
    const [dataMediaAll] = SortMedia.LikesUpdate(e);
    dataMediaAll.sort(function (a, b) {
      if (b._MediaDate < a._MediaDate) return -1;
      if (b._MediaDate > b._MediaDate) return 1;
      return 0;
    });
    const [mediaImage] = SortMedia.UpdateMedia(e);
    return mediaImage;
  }
  static renderTitre(e) {
    const [dataMediaAll] = SortMedia.LikesUpdate(e);
    dataMediaAll.sort(function (a, b) {
      if (b._MediaTitle > a._MediaTitle) return -1;
      if (b._MediaTitle < b._MediaTitle) return 1;
      return 0;
    });
    const [mediaImage] = SortMedia.UpdateMedia(e);
    return mediaImage;
  }
}

const CloneEvent = (e) => {
  if (e.code === "Enter") {
    // eslint-disable-next-line
    return Lightbox.DomLightbox(e);
  } else if (e.pointerType === "mouse") {
    // eslint-disable-next-line
    return Lightbox.DomLightbox(e);
  }
};

let arrayBtnTris = [];

const btnPopulaire = document.getElementById("button-populaire-id");
btnPopulaire.addEventListener("click", SortMedia.renderPopulaire);

const btnDate = document.getElementById("button-date-id");
btnDate.addEventListener("click", SortMedia.renderDate);

const btnTitre = document.getElementById("button-titre-id");
btnTitre.addEventListener("click", SortMedia.renderTitre);

const expandedTris = (event) => {
  event.preventDefault();
  if (
    (Number(event.detail) === Number(1) &&
      !divTris.classList.contains("div-btn-tris-click")) ||
    (event.code === "Enter" && event.target.nodeName === "DIV")
  ) {
    divTris.classList.add("div-btn-tris-click");
    divTris.setAttribute("aria-expanded", "true");
    divTris.insertBefore(btnPopulaire, divTris.firstElementChild);
    divTris.insertBefore(btnDate, btnTitre);
    event.type === "keydown" && btnPopulaire.focus();
  } else if (
    (Number(event.detail) >= Number(2) &&
      divTris.classList.contains("div-btn-tris-click")) ||
    (event.code === "Enter" && event.target.nodeName === "BUTTON")
  ) {
    switch (event.target.textContent) {
      case "Popularité":
        arrayBtnTris.shift();
        arrayBtnTris.push(btnPopulaire);
        break;
      case "Date":
        arrayBtnTris.shift();
        arrayBtnTris.push(btnDate);
        break;
      case "Titre":
        arrayBtnTris.shift();
        arrayBtnTris.push(btnTitre);
        break;
      default:
        console.log("Debbuger la gestion des buttons.");
    }
  }
};

let arrayBtnstris = [];
const focusBtns = (e) => {
  e.preventDefault();
  let indexBtn = arrayBtnstris.findIndex(
    (b) => b === divTris.querySelector(":focus")
  );
  console.log(e);
  if (e.shiftKey === true) {
    indexBtn--;
  } else {
    indexBtn++;
  }

  if (indexBtn >= arrayBtnstris.length) {
    indexBtn = 0;
  } else if (indexBtn < 0) {
    indexBtn = arrayBtnstris.length - 1;
  }
  return arrayBtnstris[indexBtn].focus();
};

const btsTris = document.querySelectorAll(".buttonTri");
btsTris.forEach((b) => {
  b.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      return leaveTris(e);
    } else if (e.code === "Tab") {
      arrayBtnstris = [...document.querySelectorAll(".buttonTri")];
      return focusBtns(e);
    } else if (e.code === "Enter" && e.target.textContent === "Popularité") {
      return SortMedia.renderPopulaire(e);
    } else if (e.code === "Enter" && e.target.textContent === "Date") {
      return SortMedia.renderDate(e);
    } else if (e.code === "Enter" && e.target.textContent === "Titre") {
      return SortMedia.renderTitre(e);
    }
  });
});

const leaveTris = (e) => {
  e.cancelable;
  divTris.setAttribute("aria-expanded", "false");
  divTris.classList.remove("div-btn-tris-click");
  arrayBtnTris[0] &&
    divTris.insertBefore(arrayBtnTris[0], divTris.firstElementChild);
  e.type === "keydown" &&
    divTris.focus() &&
    btnPopulaire.setAttribute("tabindex=", "-1");
};

const divTris = document.getElementById("div-btn-tris-id");
divTris.addEventListener("click", expandedTris);
divTris.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    return expandedTris(e);
  }
});

divTris.addEventListener("mouseleave", (e) => {
  return leaveTris(e);
});

let mediaLinked = [];
class LikesMedia extends SortMedia {
  constructor(data) {
    super(data);
    this._data = data;
  }
  static gestionLikes(e) {
    e.stopPropagation();

    const likesFull = document.getElementById("calcul-like-id");
    const articleMedia = e.target.closest("#article-media-id");
    const media = articleMedia.querySelector("#figcaption-media-id");
    const likesMedia = articleMedia.querySelector("#number-likes-id");
    const iconHeart = e.target;
    if (iconHeart.classList.contains("fa-regular")) {
      iconHeart.classList.remove("fa-regular");
      iconHeart.classList.add("fa-solid");
      iconHeart.setAttribute("aria-pressed", "true");
      likesFull.textContent = Number(parseInt(likesFull.textContent)) + 1;
      likesMedia.textContent = Number(parseInt(likesMedia.textContent)) + 1;
    } else if (iconHeart.classList.contains("fa-solid")) {
      iconHeart.classList.remove("fa-solid");
      iconHeart.classList.add("fa-regular");
      iconHeart.setAttribute("aria-pressed", "false");
      likesFull.textContent = Number(parseInt(likesFull.textContent)) - 1;
      likesMedia.textContent = Number(parseInt(likesMedia.textContent)) - 1;
    }

    function LikesTrue(media, likesMedia, mediaHearts) {
      this.media = media;
      this.likesMedia = Number(parseInt(likesMedia));
      this._MediaHeart = mediaHearts;
    }
    let likesTrue = new LikesTrue(
      media.textContent,
      likesMedia.textContent,
      iconHeart.classList.value
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
            iconHeart.classList.contains("fa-solid")
          ) {
            const keymedialike = mediaLinked.indexOf(mediaLinkeName);
            mediaLinked.splice(keymedialike, 1);
            likesTrue._MediaHeart = "fa-solid fa-heart";
            mediaLinked.push(likesTrue);
          } else if (
            z.media === mediaLinkeName.media &&
            iconHeart.classList.contains("fa-regular")
          ) {
            const keymedialike = mediaLinked.indexOf(mediaLinkeName);
            mediaLinked.splice(keymedialike, 1);
            likesTrue._MediaHeart = "fa-regular fa-heart";
            mediaLinked.push(likesTrue);
          }
        });
      }
    }
  }
}
