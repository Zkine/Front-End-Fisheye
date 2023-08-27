class Lightbox {
  static MediaAllSetect(Media, MediaTitleMap, MediaItems, MediaTitle) {
    const linkMedia = document.querySelector("#media-lightbox-id");
    const mediaAll = [...document.querySelectorAll("#item-media-id")];
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

    const fontAwesomeCross = document.createElement("i");
    const classesFontAwesomeCross = ["fa-solid", "fa-xmark"];
    classesFontAwesomeCross.forEach(() => {
      fontAwesomeCross.classList.add(...classesFontAwesomeCross);
    });
    buttonModal.appendChild(fontAwesomeCross);

    buttonModal.addEventListener("click", Lightbox.lightboxClose.bind(this));
    nextLink.addEventListener("click", Lightbox.nextImg.bind(this));
    previousLink.addEventListener("click", Lightbox.prevImg.bind(this));

    return section;
  }

  // fermeture de la lightbox
  static lightboxClose(e) {
    e.stopPropagation();
    const section = e.target.closest("#section-lightbox-id");
    const sectionLightbox = document.getElementById("lightbox-modal");
    return sectionLightbox.removeChild(section);
  }
  // image suivante
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

    const fontAwesomeCross = document.createElement("i");
    const classesFontAwesomeCross = ["fa-solid", "fa-xmark"];
    classesFontAwesomeCross.forEach(() => {
      fontAwesomeCross.classList.add(...classesFontAwesomeCross);
    });
    buttonModal.appendChild(fontAwesomeCross);

    buttonModal.addEventListener("click", Lightbox.lightboxClose.bind(this));
    nextLink.addEventListener("click", Lightbox.nextImg.bind(this));
    previousLink.addEventListener("click", Lightbox.prevImg.bind(this));

    return sectionLithtbox;
  }

  // image précédente
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

    const fontAwesomeCross = document.createElement("i");
    const classesFontAwesomeCross = ["fa-solid", "fa-xmark"];
    classesFontAwesomeCross.forEach(() => {
      fontAwesomeCross.classList.add(...classesFontAwesomeCross);
    });
    buttonModal.appendChild(fontAwesomeCross);

    buttonModal.addEventListener("click", Lightbox.lightboxClose.bind(this));
    nextLink.addEventListener("click", Lightbox.nextImg.bind(this));
    previousLink.addEventListener("click", Lightbox.prevImg.bind(this));

    return sectionLithtbox;
  }
}
