class PhotographersMedia {
  constructor(photographersMedia) {
    this._city = photographersMedia.city;
    this._country = photographersMedia.country;
    this._date = photographersMedia.date;
    this._id = photographersMedia.id;
    this._image = photographersMedia.image;
    this._likes = photographersMedia.likes;
    this._name = photographersMedia.name;
    this._photographerId = photographersMedia.photographerId;
    this._portrait = photographersMedia.portrait;
    this._price = photographersMedia.price;
    this._tagline = photographersMedia.tagline;
    this._title = photographersMedia.title;
  }

  get city() {
    return this._city;
  }

  get country() {
    return this._country;
  }

  get date() {
    return this._date;
  }

  get id() {
    return this._id;
  }

  get image() {
    return `../../assets/images/${this._image}`;
  }

  get likes() {
    return this._likes;
  }

  get name() {
    return this._name;
  }

  get photographerId() {
    return this._photographerId;
  }

  get portrait() {
    return `../../assets/photographers/${this._portrait}`;
  }

  get price() {
    return this._price;
  }

  get tagline() {
    return this._tagline;
  }

  get title() {
    return this._title;
  }
}
