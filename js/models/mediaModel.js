// initialisation des deux constanes permettant le calcule des likes et du prix global du photographe
const arrayLikes = [];
const arrayPrice = [];

class MediaModel {
  constructor(data) {
    this._MediaId = data.id;
    this._MediaDate = data.date;
    this._MediaImage = data.image;
    this._MediaVideo = data.video;
    this._MediaLikes = data.likes;
    this._MediaPhotographerId = data.photographerId;
    this._MediaPrice = data.price;
    this._MediaTitle = data.title;
    arrayLikes.push(this._MediaLikes);
    arrayPrice.push(this._MediaPrice);
  }

  get MediaDate() {
    return this._MediaDate;
  }

  get MediaId() {
    return this._MediaId;
  }

  get MediaItems() {
    switch (this._MediaPhotographerId) {
      case 243:
        return this._MediaImage
          ? `../../assets/images/Mimi/${this._MediaImage}`
          : this._MediaVideo && `../../assets/images/Mimi/${this._MediaVideo}`;
      case 930:
        return this._MediaImage
          ? `../../assets/images/Ellie Rose/${this._MediaImage}`
          : this._MediaVideo &&
              `../../assets/images/Ellie Rose/${this._MediaVideo}`;
      case 82:
        return this._MediaImage
          ? `../../assets/images/Tracy/${this._MediaImage}`
          : this._MediaVideo && `../../assets/images/Tracy/${this._MediaVideo}`;
      case 527:
        return this._MediaImage
          ? `../../assets/images/Nabeel/${this._MediaImage}`
          : this._MediaVideo &&
              `../../assets/images/Nabeel/${this._MediaVideo}`;
      case 925:
        return this._MediaImage
          ? `../../assets/images/Rhode/${this._MediaImage}`
          : this._MediaVideo && `../../assets/images/Rhode/${this._MediaVideo}`;
      case 195:
        return this._MediaImage
          ? `../../assets/images/Marcel/${this._MediaImage}`
          : this._MediaVideo &&
              `../../assets/images/Marcel/${this._MediaVideo}`;
      default:
        throw "Vérifier le chemin des médias avec l'id de l'utilisateur";
    }
  }

  // get Mediavideo() {
  //   switch (this._MediaPhotographerId) {
  //     case 243:
  //       return `../../assets/images/Mimi/${this._Mediavideo}`;
  //     case 930:
  //       return `../../assets/images/Ellie Rose/${this._Mediavideo}`;
  //     case 82:
  //       return `../../assets/images/Tracy/${this._Mediavideo}`;
  //     case 527:
  //       return `../../assets/images/Nabeel/${this._Mediavideo}`;
  //     case 925:
  //       return `../../assets/images/Rhode/${this._Mediavideo}`;
  //     case 195:
  //       return `../../assets/images/Marcel/${this._Mediavideo}`;
  //     default:
  //       throw "Vérifier le chemin des images avec l'id de l'utilisateur";
  //   }
  // }

  static MediaFullLickes() {
    const initialValue = 0;
    const somme = arrayLikes.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    return somme;
  }

  static MediaFullprice() {
    const initialValue = 0;
    const somme = arrayPrice.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    return `${somme}€ / jour`;
  }

  get Medialikes() {
    return this._MediaLikes;
  }

  get MediaphotographerId() {
    return this._MediaPhotographerId;
  }

  get Mediaprice() {
    return this._Mediaprice;
  }

  get MediaTitle() {
    return this._MediaTitle;
  }
}
