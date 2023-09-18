// eslint-disable-next-line
class Lightbox {
  static constanteInit(
    cloneVideo,
    sourceVideo,
    neaudImage,
    lightboxImage,
    lightboxVideo,
    figureItem
  ) {
    const neaudVideo = document.querySelector("video");
    cloneVideo = neaudVideo.cloneNode(true);
    sourceVideo = cloneVideo.querySelector("#source-id");
    neaudImage = document.querySelector("figure img");
    lightboxImage = document.querySelector("#figure-lightbox-id img");
    lightboxVideo = document.querySelector("#figure-lightbox-id video");
    figureItem = document.querySelector("#figure-lightbox-id");
    return [
      cloneVideo,
      sourceVideo,
      neaudImage,
      lightboxImage,
      lightboxVideo,
      figureItem,
    ];
  }
  static focusKeydown(keydowsFocus, asideLightbox, arrayInput) {
    keydowsFocus = document.querySelectorAll(
      "#figure-lightbox-id video,#figure-lightbox-id img,#figcaption-lightbox-id, #previous-link-id,#next-link-id,#button-modal-id"
    );

    asideLightbox = document.getElementById("lightbox-modal");

    arrayInput = [...keydowsFocus];
    return { keydowsFocus, asideLightbox, arrayInput };
  }
  //création du DOM de la lightbox
  static DomLightbox(e) {
    e.stopPropagation();

    const asideLightbox = document.getElementById("lightbox-modal");
    const mainDocument = document.getElementById("main-id");
    mainDocument.classList.add("no-scroll");
    asideLightbox.setAttribute("aria-hidden", "false");
    const MediaLightbox = e.target.getAttribute("src")
      ? e.target.getAttribute("src")
      : e.target.children[0].getAttribute("src");
    const nameMedia = e.target.nextElementSibling.textContent;
    if (!asideLightbox.hasAttribute("class")) {
      const selectDomLightbox = document.getElementById("lightbox-modal");
      const section = document.createElement("section");
      section.classList.add("section-lightbox");
      section.id = "section-lightbox-id";
      selectDomLightbox.appendChild(section);

      const figureLightbox = document.createElement("figure");
      figureLightbox.classList.add("figure-lightbox");
      figureLightbox.id = "figure-lightbox-id";
      section.appendChild(figureLightbox);

      if (e.target.getAttribute("src")) {
        const imgLightbox = document.createElement("img");
        imgLightbox.classList.add("media-lightbox");
        imgLightbox.setAttribute("src", MediaLightbox);
        imgLightbox.setAttribute("alt", nameMedia);
        imgLightbox.id = "media-lightbox-id";
        imgLightbox.setAttribute("aria-label", `${nameMedia}`);
        imgLightbox.setAttribute("tabindex", "0");
        figureLightbox.insertAdjacentElement("afterbegin", imgLightbox);

        const figcaption = document.createElement("figcaption");
        figcaption.classList.add("figcaption-lightbox");
        figcaption.id = "figcaption-lightbox-id";
        figcaption.setAttribute("tabindex", "0");
        figcaption.textContent = `${nameMedia}`;
        figureLightbox.insertAdjacentElement("beforeend", figcaption);
      } else {
        const video = document.createElement("video");
        video.classList.add("media-lightbox");
        video.setAttribute("autoplay", "");
        video.setAttribute("controls", "");
        video.setAttribute("aria-label", `${nameMedia}`);
        video.setAttribute("tabindex", "0");
        figureLightbox.insertAdjacentElement("afterbegin", video);

        const source = document.createElement("source");
        source.id = "media-lightbox-id";
        source.setAttribute("src", `${MediaLightbox}`);
        source.setAttribute("type", "video/mp4");
        video.appendChild(source);

        const figcaptionVideo = document.createElement("figcaption");
        figcaptionVideo.classList.add("figcaption-lightbox");
        figcaptionVideo.id = "figcaption-lightbox-id";
        figcaptionVideo.setAttribute("tabindex", "0");
        figcaptionVideo.textContent = `${nameMedia}`;
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

      const navLink = document.createElement("nav");
      section.appendChild(navLink);

      const ulLink = document.createElement("ul");
      ulLink.classList.add("ul-link");
      navLink.insertAdjacentElement("afterbegin", ulLink);

      const liPrevious = document.createElement("li");
      liPrevious.classList.add("li-link");
      ulLink.insertAdjacentElement("afterbegin", liPrevious);
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
      previousLink.setAttribute("aria-label", "Next image");
      previousLink.setAttribute("tabindex", "0");
      liPrevious.insertAdjacentElement("afterbegin", previousLink);

      const liNext = document.createElement("li");
      liNext.classList.add("li-link");
      ulLink.insertAdjacentElement("beforeend", liNext);

      const nextLink = document.createElement("a");
      nextLink.setAttribute("type", "button");
      nextLink.setAttribute("href", `${media[mediaItems + 1]}`);
      nextLink.classList.add("next-link");
      nextLink.id = "next-link-id";
      nextLink.setAttribute("aria-label", "Next image");
      nextLink.setAttribute("tabindex", "0");
      liNext.insertAdjacentElement("afterbegin", nextLink);

      const buttonModal = document.createElement("button");
      buttonModal.setAttribute("type", "button");
      buttonModal.classList.add("button-modal");
      buttonModal.id = "button-modal-id";
      buttonModal.setAttribute("aria-label", "Close dialog");
      buttonModal.setAttribute("aria-pressed", "false");
      buttonModal.setAttribute("tabindex", "0");
      section.appendChild(buttonModal);

      const previousLinkId = document.getElementById("previous-link-id");
      previousLinkId.addEventListener("click", Lightbox.prevImg);

      const nextLinkId = document.getElementById("next-link-id");
      nextLinkId.addEventListener("click", Lightbox.nextImg);

      const buttonModalId = document.getElementById("button-modal-id");
      buttonModalId.addEventListener("click", Lightbox.lightboxClose);
      buttonModalId.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
          Lightbox.lightboxClose(e);
        }
      });
      const { keydowsFocus } = Lightbox.focusKeydown(e);
      keydowsFocus.forEach((f) =>
        f.addEventListener("keydown", (e) => {
          return Lightbox.navigationMedia(e);
        })
      );
      if (e.type === "keydown") {
        return Lightbox.focusLightbox(e);
      }
    } else if (asideLightbox.classList[0].includes("lightbox-modal-close")) {
      asideLightbox.classList.remove("lightbox-modal-close");
      const figcaptionMedia = document.querySelector("#figcaption-lightbox-id");
      const [
        cloneVideo,
        sourceVideo,
        neaudImage,
        lightboxImage,
        lightboxVideo,
        figureItem,
      ] = Lightbox.constanteInit();
      if (e.target.nodeName === "IMG") {
        const cloneImage = neaudImage.cloneNode(true);
        cloneImage.classList.remove("item-media");
        cloneImage.classList.add("media-lightbox");
        cloneImage.setAttribute("src", `${MediaLightbox}`);
        cloneImage.setAttribute("alt", `${nameMedia}`);
        cloneImage.setAttribute("aria-label", `${nameMedia}`);
        cloneImage.id = "media-lightbox-id";
        cloneImage.addEventListener("keydown", (e) => {
          return Lightbox.navigationMedia(e);
        });
        lightboxVideo
          ? figureItem.replaceChild(cloneImage, lightboxVideo)
          : figureItem.replaceChild(cloneImage, lightboxImage);
        figcaptionMedia.textContent = `${nameMedia}`;
      } else if (e.target.nodeName === "VIDEO") {
        sourceVideo.id = "media-lightbox-id";
        cloneVideo.classList.remove("item-media");
        cloneVideo.classList.add("media-lightbox");
        cloneVideo.addEventListener("keydown", (e) => {
          return Lightbox.navigationMedia(e);
        });
        cloneVideo.setAttribute("controls", "");
        cloneVideo.setAttribute("autoplay", "");
        cloneVideo.setAttribute("aria-label", `${nameMedia}`);
        lightboxImage
          ? figureItem.replaceChild(cloneVideo, lightboxImage)
          : figureItem.replaceChild(cloneVideo, lightboxVideo);
        figcaptionMedia.textContent = `${nameMedia}`;
      }
      const [media, mediaTitleMap, MediaItems, MediaTitle] =
        Lightbox.MediaAllSetect();
      let mediaItems = MediaItems;
      let mediaTitle = MediaTitle;
      const previousLink = document.querySelector("#previous-link-id");
      const nextLink = document.querySelector("#next-link-id");
      if (
        mediaItems === media.length - 1 ||
        mediaTitle === mediaTitleMap.length - 1
      ) {
        mediaItems = -1;
        mediaTitle = -1;
      }

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

      nextLink.setAttribute("href", `${media[mediaItems + 1]}`);
      const btnCloseLightbox = document.getElementById("button-modal-id");
      btnCloseLightbox.setAttribute("aria-pressed", "false");

      if (e.type === "keydown") {
        return Lightbox.focusLightbox(e);
      }
    }
  }

  static navigationMedia(e) {
    e.stopPropagation();
    if (e.code === "Escape") {
      return Lightbox.lightboxClose(e);
    } else if (e.code === "Tab") {
      return Lightbox.keyboardNavigation(e);
    }
  }
  static focusLightbox(e) {
    e.stopPropagation();
    const { keydowsFocus } = Lightbox.focusKeydown(e);
    keydowsFocus[0].focus();
  }

  static keyboardNavigation(e) {
    e.preventDefault();
    e.stopPropagation();
    const { asideLightbox, arrayInput } = Lightbox.focusKeydown();
    let indexBtn = arrayInput.findIndex(
      (b) => b === asideLightbox.querySelector(":focus")
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
  }
  // fermeture de la lightbox
  static lightboxClose(e) {
    e.stopPropagation();
    const { asideLightbox, arrayInput } = Lightbox.focusKeydown();
    const fullMedia = [...document.querySelectorAll("#item-media-id")];
    const media = fullMedia.find(
      (b) => b.currentSrc === arrayInput[0].currentSrc
    );
    const mainDocument = document.getElementById("main-id");
    if (!asideLightbox.classList.contains("lightbox-modal-close")) {
      e.target.setAttribute("aria-pressed", "true");
      mainDocument.classList.remove("no-scroll");
      asideLightbox.setAttribute("aria-hidden", "true");
      asideLightbox.classList.add("lightbox-modal-close");
      e.type === "keydown" && media.focus();
    }
  }

  static MediaAllSetect(Media, MediaTitleMap, MediaItems, MediaTitle) {
    const linkMedia = document.querySelector("section #media-lightbox-id");

    const linkTitre = document.querySelector("section #figcaption-lightbox-id");
    const mediaAll = [...document.querySelectorAll("article #item-media-id")];
    const mediaTitre = [...document.querySelectorAll("#figcaption-media-id")];
    Media = mediaAll.map(
      (e) => e.getAttribute("src") || e.children[0].getAttribute("src")
    );

    MediaTitleMap = mediaTitre.map((e) => e.textContent);
    MediaItems = Media.findIndex(
      (element) => element === linkMedia.attributes[1].textContent
    );
    MediaTitle = MediaTitleMap.findIndex(
      (element) => element === linkTitre.textContent
    );
    return [Media, MediaTitleMap, MediaItems, MediaTitle];
  }

  // image suivante
  static nextImg(e) {
    e.preventDefault();
    e.stopPropagation();
    const sectionLithtbox = e.target.closest("#section-lightbox-id");
    const itemsMedia = sectionLithtbox.querySelector("#media-lightbox-id");
    const previousLink = sectionLithtbox.querySelector("#previous-link-id");
    const nextLink = sectionLithtbox.querySelector("#next-link-id");
    const figcaptionMedia = sectionLithtbox.querySelector(
      "#figcaption-lightbox-id"
    );
    const [
      cloneVideo,
      sourceVideo,
      neaudImage,
      lightboxImage,
      lightboxVideo,
      figureItem,
    ] = Lightbox.constanteInit();
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
    if (media[mediaItems + 1].includes("jpg") && lightboxImage) {
      if (itemsMedia.nodeName === "IMG") {
        itemsMedia.setAttribute("src", `${media[mediaItems + 1]}`);
        itemsMedia.setAttribute("alt", `${mediaTitleMap[mediaTitle + 1]}`);
        itemsMedia.setAttribute(
          "aria-label",
          `${mediaTitleMap[mediaTitle + 1]}`
        );

        figcaptionMedia.textContent = `${mediaTitleMap[mediaTitle + 1]}`;
      }
    } else if (media[mediaItems + 1].includes("jpg") && !lightboxImage) {
      const cloneImage = neaudImage.cloneNode(true);
      cloneImage.classList.remove("item-media");
      cloneImage.classList.add("media-lightbox");
      cloneImage.setAttribute("src", `${media[mediaItems + 1]}`);
      cloneImage.setAttribute("alt", `${mediaTitleMap[mediaTitle + 1]}`);
      cloneImage.setAttribute("aria-label", `${mediaTitleMap[mediaTitle + 1]}`);
      cloneImage.id = "media-lightbox-id";
      lightboxImage
        ? figureItem.replaceChild(cloneImage, lightboxImage)
        : figureItem.replaceChild(cloneImage, lightboxVideo);
      figcaptionMedia.textContent = `${mediaTitleMap[mediaTitle + 1]}`;
    } else if (media[mediaItems + 1].includes("mp4") && !lightboxVideo) {
      sourceVideo.attributes[0].textContent = "media-lightbox-id";
      cloneVideo.classList.remove("item-media");
      cloneVideo.classList.add("media-lightbox");
      cloneVideo.setAttribute("controls", "");
      cloneVideo.setAttribute("autoplay", "");
      cloneVideo.setAttribute("aria-label", `${mediaTitleMap[mediaTitle + 1]}`);
      lightboxVideo
        ? figureItem.replaceChild(cloneVideo, lightboxVideo)
        : figureItem.replaceChild(cloneVideo, lightboxImage);
      figcaptionMedia.textContent = `${mediaTitleMap[mediaTitle + 1]}`;
    }
    if (media[mediaItems - 0]) {
      previousLink.setAttribute("href", `${media[mediaItems - 0]}`);
    } else if (media[mediaItems - 0] === undefined && media.length - 2) {
      mediaItems = media.length;
      previousLink.setAttribute("href", `${media[mediaItems - 1]}`);
    }

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
  }

  // image précédente
  static prevImg(e) {
    e.preventDefault();
    e.stopPropagation();

    const sectionLithtbox = e.target.closest("#section-lightbox-id");
    const itemsMedia = sectionLithtbox.querySelector("#media-lightbox-id");
    const previousLink = sectionLithtbox.querySelector("#previous-link-id");
    const nextLink = sectionLithtbox.querySelector("#next-link-id");
    const figcaptionMedia = sectionLithtbox.querySelector(
      "#figcaption-lightbox-id"
    );
    const [
      cloneVideo,
      sourceVideo,
      neaudImage,
      lightboxImage,
      lightboxVideo,
      figureItem,
    ] = Lightbox.constanteInit();
    const [media, mediaTitleMap, MediaItems, MediaTitle] =
      Lightbox.MediaAllSetect(e);
    let mediaItems = MediaItems;
    let mediaTitle = MediaTitle;
    if (mediaItems === 0 || mediaTitle === 0) {
      mediaItems = media.length;
      mediaTitle = mediaTitleMap.length;
    }
    if (media[mediaItems - 1].includes("jpg") && lightboxImage !== null) {
      itemsMedia.setAttribute("src", `${media[mediaItems - 1]}`);
      itemsMedia.setAttribute("alt", `${mediaTitleMap[mediaTitle - 1]}`);
      itemsMedia.setAttribute("aria-label", `${mediaTitleMap[mediaTitle - 1]}`);

      figcaptionMedia.textContent = `${mediaTitleMap[mediaTitle - 1]}`;
    } else if (media[mediaItems - 1].includes("jpg") && !lightboxImage) {
      const cloneImage = neaudImage.cloneNode(true);
      cloneImage.classList.remove("item-media");
      cloneImage.classList.add("media-lightbox");
      cloneImage.setAttribute("src", `${media[mediaItems - 1]}`);
      cloneImage.setAttribute("alt", `${mediaTitleMap[mediaTitle - 1]}`);
      cloneImage.setAttribute("aria-label", `${mediaTitleMap[mediaTitle - 1]}`);
      cloneImage.id = "media-lightbox-id";
      figureItem.replaceChild(cloneImage, lightboxVideo);
      figcaptionMedia.textContent = `${mediaTitleMap[mediaTitle - 1]}`;
    } else if (media[mediaItems - 1].includes("mp4") && !lightboxVideo) {
      sourceVideo.id = "media-lightbox-id";
      cloneVideo.classList.remove("item-media");
      cloneVideo.classList.add("media-lightbox");
      cloneVideo.setAttribute("controls", "");
      cloneVideo.setAttribute("autoplay", "");
      cloneVideo.setAttribute("aria-label", `${mediaTitleMap[mediaTitle - 1]}`);
      figureItem.replaceChild(cloneVideo, lightboxImage);
      figcaptionMedia.textContent = `${mediaTitleMap[mediaTitle - 1]}`;
    }
    if (media[mediaItems - 2]) {
      previousLink.setAttribute("href", `${media[mediaItems - 2]}`);
    } else if (media[mediaItems - 2] === undefined && mediaItems === 1) {
      mediaItems = media.length;
      previousLink.setAttribute("href", `${media[mediaItems - 1]}`);
      mediaItems = 1;
    }

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
  }
}
