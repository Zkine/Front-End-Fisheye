class Api {
  constructor(url) {
    this._urlData = url;
    this.params = new URL(document.location).searchParams;
  }
  async getportait() {
    return fetch(this._urlData)
      .then((res) => res.json())
      .then((res) => {
        if (!this.params.has("id")) {
          return res.photographers;
        } else if (this.params.has("id")) {
          const Photographers = res.photographers.find(
            (element) => element.id === Number(this.params.get("id"))
          );
          return [Photographers];
        } else {
          console.log("error");
        }
      })
      .catch((err) => console.log("an error occurs", err));
  }

  async getmedia() {
    return fetch(this._urlData)
      .then((res) => res.json())
      .then((res) => {
        if (this.params.has("id")) {
          const Media = res.media.filter(
            (element) =>
              element.photographerId === Number(this.params.get("id"))
          );
          return Media;
        } else {
          console.log("error");
        }
      })
      .catch((err) => console.log("an error occurs", err));
  }
}
// eslint-disable-next-line
class PhotographeApi extends Api {
  // (url) récupèration du chemin du dossier data - photographers.json initialisé dans de le constructor le fichier App.js
  constructor(url) {
    super(url);
  }
  // appel de la function getPhotographe pour construire les objets - PhotographersModel
  async getPhotographe() {
    return await this.getportait();
  }
  // appel de la function getMedia pour construire les objets - MediaModel
  async getMedia() {
    return await this.getmedia();
  }
}
