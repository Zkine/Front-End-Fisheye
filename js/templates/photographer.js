let dataMedia = [];
class PhotographerTemplate {
  constructor(data) {
    // renvoi les données data pour la création du DOM - photographer.html
    this._data = data;
    this.$imgSection = document.getElementById("img-section");
    // affichage des likes
    this.$claculLikes = document.getElementById("calcul-like-id");
    this.$claculLikes.textContent = MediaModel.MediaFullLickes();
    // affichage du prix
    this.$claculPrice = document.getElementById("calcul-price-id");
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
      source.setAttribute("src", `${this._data.MediaItems}`);
      source.setAttribute("alt", `${this._data.MediaTitle}`);
      source.setAttribute("type", "video/mp4");
      video.appendChild(source);

      const figcaptionVideo = document.createElement("figcaption");
      figcaptionVideo.classList.add("figcaption-media");
      figcaptionVideo.textContent = `${this._data.MediaTitle}`;
      figcaptionVideo.id = "figcaption-media-id";
      figurePhoto.appendChild(figcaptionVideo);

      // const fontawesomePlay = document.createElement("i");
      // const classesFontAwesome = ["fa-regular", "fa-circle-play"];
      // fontawesomePlay.classList.add(...classesFontAwesome);
      // fontawesomePlay.id = "item-media-id";
      // figcaptionVideo.appendChild(fontawesomePlay);
    }

    const mediaLikes = document.createElement("p");
    mediaLikes.classList.add("number-likes");
    mediaLikes.id = "number-likes-id";
    mediaLikes.textContent = `${this._data.Medialikes}`;
    figurePhoto.insertAdjacentElement("afterend", mediaLikes);

    const buttonHeart = document.createElement("button");
    buttonHeart.classList.add("button-heart");
    buttonHeart.id = "button-heart-id";
    mediaLikes.insertAdjacentElement("afterend", buttonHeart);

    const iconHeart = document.createElement("i");
    const classesFontAwesome = ["fa-regular", "fa-heart"];
    iconHeart.classList.add(...classesFontAwesome);
    iconHeart.id = "fontawesome-id";
    buttonHeart.appendChild(iconHeart);

    const HeartId = document.getElementById("button-heart-id");
    HeartId.addEventListener("click", LikesMedia.gestionLikes.bind(this));

    const mediaId = document.getElementById("item-media-id");
    mediaId.addEventListener("click", Lightbox.DomLightbox.bind(this));

    return articlePhoto;
  }
}

let replacedNode = [];
class SortMedia extends PhotographerTemplate {
  // const itemMedia = document.getElementById("item-media-id");
  static LikesUpdate(dataMediaAll) {
    if (dataMedia[0]._name) {
      dataMedia.shift();

      const likesfull = document.getElementById("calcul-like-id");
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
              mediaImage[
                i
              ].attributes[1].textContent = `${dataMediaAll[w].MediaItems}`;
              mediaImage[
                i
              ].attributes[2].textContent = `${dataMediaAll[w].MediaTitle}`;

              mediaImage[
                i
              ].nextElementSibling.textContent = `${dataMediaAll[w].MediaTitle}`;

              mediaImage[
                i
              ].offsetParent.nextElementSibling.textContent = `${dataMediaAll[w].Medialikes}`;

              if (!dataMediaAll[w]._MediaHeart) {
                const classesFontAwesome = ["fa-heart", "fa-regular"];
                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.value =
                  "";
                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.add(
                  ...classesFontAwesome
                );
              } else if (dataMediaAll[w]._MediaHeart) {
                if (dataMediaAll[w]._MediaHeart === "fa-regular fa-heart") {
                  const classesFontAwesome = ["fa-regular", "fa-heart"];
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.value =
                    "";

                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.add(
                    ...classesFontAwesome
                  );
                } else {
                  const classesFontAwesome = ["fa-solid", "fa-heart"];
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.value =
                    "";

                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.add(
                    ...classesFontAwesome
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
                const classesFontAwesome = ["fa-regular", "fa-heart"];
                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.value =
                  "";
                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.add(
                  ...classesFontAwesome
                );
              } else if (dataMediaAll[w]._MediaHeart) {
                if (dataMediaAll[w]._MediaHeart === "fa-regular fa-heart") {
                  const classesFontAwesome = ["fa-regular", "fa-heart"];
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.value =
                    "";
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.add(
                    ...classesFontAwesome
                  );
                } else {
                  const classesFontAwesome = ["fa-solid", "fa-heart"];
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.value =
                    "";
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.add(
                    ...classesFontAwesome
                  );
                }
              }

              cloneImage.attributes[1].textContent = `${dataMediaAll[w].MediaItems}`;

              cloneImage.attributes[2].textContent = `${dataMediaAll[w].MediaTitle}`;

              figureMedia[f].replaceChild(
                cloneImage,
                figureMedia[f].childNodes[0]
              );

              cloneImage.addEventListener(
                "click",
                Lightbox.DomLightbox.bind(this)
              );
            }
          } else if (
            dataMediaAll[w].MediaItems.includes("mp4") &&
            Number([w]) === Number([i]) &&
            Number([w]) === Number([f])
          ) {
            if (mediaImage[i].nodeName === "VIDEO") {
              mediaImage[
                i
              ].children[0].attributes[1].textContent = `${dataMediaAll[w].MediaItems}`;
              mediaImage[
                i
              ].children[0].attributes[2].textContent = `${dataMediaAll[w].MediaTitle}`;

              if (!dataMediaAll[w]._MediaHeart) {
                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.value =
                  "";
                const classesFontAwesome = ["fa-regular", "fa-heart"];

                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.add(
                  ...classesFontAwesome
                );
              } else if (dataMediaAll[w]._MediaHeart) {
                if (dataMediaAll[w]._MediaHeart === "fa-regular fa-heart") {
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.value =
                    "";
                  const classesFontAwesome = ["fa-regular", "fa-heart"];

                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.add(
                    ...classesFontAwesome
                  );
                } else {
                  const classesFontAwesome = ["fa-solid", "fa-heart"];
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.value =
                    "";

                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.add(
                    ...classesFontAwesome
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
                const classesFontAwesome = ["fa-regular", "fa-heart"];
                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.value =
                  "";
                mediaImage[
                  i
                ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.add(
                  ...classesFontAwesome
                );
              } else if (dataMediaAll[w]._MediaHeart) {
                if (dataMediaAll[w]._MediaHeart === "fa-regular fa-heart") {
                  const classesFontAwesome = ["fa-regular", "fa-heart"];
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.value =
                    "";
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.add(
                    ...classesFontAwesome
                  );
                } else {
                  const classesFontAwesome = ["fa-solid", "fa-heart"];
                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.value =
                    "";

                  mediaImage[
                    i
                  ].offsetParent.nextElementSibling.nextElementSibling.firstElementChild.classList.add(
                    ...classesFontAwesome
                  );
                }
              }

              figureMedia[f].replaceChild(
                cloneVideo,
                figureMedia[f].childNodes[0]
              );

              cloneVideo.addEventListener(
                "click",
                Lightbox.DomLightbox.bind(this)
              );
            }
          }
        }
      }
    }
    return [mediaImage];
  }

  static renderPopulaire(e) {
    dataMedia.sort(function (a, b) {
      return b._MediaLikes - a._MediaLikes;
    });
    const [mediaImage] = SortMedia.UpdateMedia(e);
  }
  static renderDate(e) {
    dataMedia.sort(function (a, b) {
      if (b._MediaDate < a._MediaDate) return -1;
      if (b._MediaDate > b._MediaDate) return 1;
      return 0;
    });
    const [mediaImage] = SortMedia.UpdateMedia(e);
  }

  static renderTitre(e) {
    dataMedia.sort(function (a, b) {
      if (b._MediaTitle > a._MediaTitle) return -1;
      if (b._MediaTitle < b._MediaTitle) return 1;
      return 0;
    });
    const [mediaImage] = SortMedia.UpdateMedia(e);
  }
}

const divTris = document.getElementById("div-btn-tris-id");
divTris.addEventListener("click", (event) => {
  if (
    Number(event.detail) === Number(1) &&
    !divTris.classList.contains("div-btn-tris-click")
  ) {
    divTris.classList.add("div-btn-tris-click");
  } else if (divTris.classList.contains("div-btn-tris-click")) {
    if (event.target.textContent === "Popularité") {
      const btnPopulaire = document.getElementById("button-populaire-id");

      divTris.insertBefore(btnPopulaire, divTris.firstElementChild);

      btnPopulaire.addEventListener("click", SortMedia.renderPopulaire);
      btnPopulaire.removeEventListener(
        "click",
        SortMedia.renderPopulaire(this)
      );
    } else if (event.target.textContent === "Date") {
      const btnDate = document.getElementById("button-date-id");

      divTris.insertBefore(btnDate, divTris.firstElementChild);

      btnDate.addEventListener("click", SortMedia.renderDate);

      btnDate.removeEventListener("click", SortMedia.renderDate(this));
    } else if (event.target.textContent === "Titre") {
      const btnTitre = document.getElementById("button-titre-id");

      divTris.insertBefore(btnTitre, divTris.firstElementChild);

      btnTitre.addEventListener("click", SortMedia.renderTitre);

      btnTitre.removeEventListener("click", SortMedia.renderTitre(this));
    } else {
      console.log(`Sorry, we are out of ${expr}.`);
    }
  }
});

divTris.addEventListener("mouseleave", () => {
  if (divTris.classList.contains("div-btn-tris-click")) {
    divTris.classList.remove("div-btn-tris-click");
  }
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
    const classHeart = e.target;

    if (classHeart.classList.contains("fa-regular")) {
      classHeart.classList.remove("fa-regular");
      classHeart.classList.add("fa-solid");
      likesFull.textContent = Number(parseInt(likesFull.textContent)) + 1;

      likesMedia.textContent = Number(parseInt(likesMedia.textContent)) + 1;
    } else if (classHeart.classList.contains("fa-solid")) {
      classHeart.classList.remove("fa-solid");
      classHeart.classList.add("fa-regular");
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
