// initialisation des deux constanes permettant le calcule des likes et du prix global du photographe
const arrayLikes = [];
const arrayPrice = [];

// class MelidaFullLikesPrice {
//   constructor(data) {
//     this._MediaLikes = data.likes;
//     this._MediaPrice = data.price;

//     arrayLikes.push(this._MediaLikes);

//     arrayPrice.push(this._MediaPrice);
//   }

//   MediaFullLickes() {
//     const initialValue = 0;
//     const somme = arrayLikes.reduce(
//       (accumulator, currentValue) => accumulator + currentValue,
//       initialValue
//     );
//     return somme;
//   }

//   MediaFullprice() {
//     const initialValue = 0;
//     const somme = arrayPrice.reduce(
//       (accumulator, currentValue) => accumulator + currentValue,
//       initialValue
//     );
//     return somme;
//   }
// }

class MediaModel {
  constructor(data) {
    // super(data);
    this._MediaId = data.id;
    this._MediaDate = data.date;
    if (data.image) {
      this._MediaImage = data.image;
    } else if (data.video && !data.image) {
      this._Mediavideo = data.video;
    }
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

  get Mediaimage() {
    switch (this._MediaPhotographerId) {
      case 243:
        return `../../assets/images/Mimi/${this._MediaImage}`;
      case 930:
        return `../../assets/images/Ellie Rose/${this._MediaImage}`;
      case 82:
        return `../../assets/images/Tracy/${this._MediaImage}`;
      case 527:
        return `../../assets/images/Nabeel/${this._MediaImage}`;
      case 925:
        return `../../assets/images/Rhode/${this._MediaImage}`;
      case 195:
        return `../../assets/images/Marcel/${this._MediaImage}`;
      default:
        throw "Vérifier le chemin des images avec l'id de l'utilisateur";
    }
  }

  get Mediavideo() {
    switch (this._MediaPhotographerId) {
      case 243:
        return `../../assets/images/Mimi/${this._Mediavideo}`;
      case 930:
        return `../../assets/images/Ellie Rose/${this._Mediavideo}`;
      case 82:
        return `../../assets/images/Tracy/${this._Mediavideo}`;
      case 527:
        return `../../assets/images/Nabeel/${this._Mediavideo}`;
      case 925:
        return `../../assets/images/Rhode/${this._Mediavideo}`;
      case 195:
        return `../../assets/images/Marcel/${this._Mediavideo}`;
      default:
        throw "Vérifier le chemin des images avec l'id de l'utilisateur";
    }
  }

  get Medialikes() {
    return this._MediaLikes;
  }

  MediaFullLickes() {
    const initialValue = 0;
    const somme = arrayLikes.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    return somme;
  }

  get MediaphotographerId() {
    return this._MediaPhotographerId;
  }

  MediaFullprice() {
    const initialValue = 0;
    const somme = arrayPrice.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    return somme;
  }

  get Mediaprice() {
    return this._Mediaprice;
  }

  get MediaTitle() {
    return this._MediaTitle;
  }
}
