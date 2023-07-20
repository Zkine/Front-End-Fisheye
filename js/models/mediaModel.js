class MediaModel {
  constructor(media) {
    this._id = media.id;
    this._photographerId = media.photographerId;
    this._city = media.city;
    this._title = media.title;
    this._image = media.image;
    this._likes = media.likes;
    this._date = media.date;
    this._price = media.price;
  }

  get id() {
    return this._id;
  }

  get photographerId() {
    return this._photographerId;
  }

  get city() {
    return this._city;
  }

  get title() {
    return this._title;
  }

  get image() {
    return `../../assets/images/${this._image}`;
  }

  get likes() {
    return this._likes;
  }

  get date() {
    return this._date;
  }

  get price() {
    return this._price;
  }
}
