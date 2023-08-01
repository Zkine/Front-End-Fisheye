class MediaModel {
  constructor(Media) {
    console.log("Media", Media);
    this._date = Media.image;
    this._id = Media.id;
    // this.media_id = Media.media;
    this._image = Media.image;
    // this._video = Media.image;
    this._likes = Media.image;
    this._photographerId = Media.image;
    this._price = Media.image;
    this._title = Media.image;
  }

  get date() {
    return this._date;
  }

  get id() {
    return this._id;
  }

  // async getVideoDOM() {
  //   const articleVideo = document.createElement("video");
  //   articleVideo.classList.add("articleimg");
  //   articleVideo.setAttribute(
  //     "src",
  //     `../../assets/images/Mimi/${this._video.forEach((e) => {
  //       e.video;
  //     })}`
  //   );
  //   this.photographeSection.appendChild(articleVideo);
  // }

  get image() {
    // const ImageFilter = this._image.filter((i) => i.image);
    // console.log("ImageFilter", ImageFilter);
    // const ImageMap = ImageFilter.map((e) => e.image);
    // console.log("ImageMap", ImageMap);
    for (let i in this._image) {
      console.log(this._image[i]);
      switch (this._id) {
        case 243:
          return `../../assets/images/Mimi/${this._image[i].image}`;

        case 930:
          return `../../assets/images/Ellie Rose/${this._image[i].image}`;
        case 82:
          return `../../assets/images/Tracy/${this._image.image}`;
        case 527:
          return `../../assets/images/Nabeel/${this._image.image}`;
        case 925:
          return `../../assets/images/Rhode/${this._image.image}`;
        case 195:
          return `../../assets/images/Marcel/${this._image.image}`;
        default:
          throw "Vérifier le chemin des images avec l'id de l'utilisateur";
      }
    }
  }

  get video() {
    switch (this._id) {
      case 243:
        return `../../assets/images/Mimi/${this._video.forEach((e) => {
          return e.video;
        })}`;
      case 930:
        return `../../assets/images/Ellie Rose/${this._video[i].video}`;
      case 82:
        return `../../assets/images/Tracy/${this._video[i].video}`;
      case 527:
        return `../../assets/images/Nabeel/${this._video[i].video}`;
      case 925:
        return `../../assets/images/Rhode/${this._video[i].video}`;
      case 195:
        return `../../assets/images/Marcel/${this._video[i].video}`;
      default:
        throw "Vérifier le chemin des images avec l'id de l'utilisateur";
    }
  }

  get likes() {
    return this._likes;
  }

  get photographerId() {
    return this._photographerId;
  }

  get price() {
    return this._price;
  }

  get title() {
    return this._title;
  }
}
