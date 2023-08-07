class Api {
  constructor(url) {
    this._urlData = url;
    //  Deux propriétés ci-dessous permettent de récupèrer l'url de la page internet et l'ID du protographe
    this.url = new URL(window.location.href);
    this.id = this.url.searchParams.get("id");
  }
  async getportait() {
    return fetch(this._urlData)
      .then((res) => res.json())
      .then((res) => {
        if (this.url.pathname == "/index.html") {
          return res.photographers;
        } else if (this.url.pathname === "/photographer.html") {
          const Photographers = res.photographers.find(
            (element) => element.id === Number(this.id)
          );
          return [Photographers];
        }
      })
      .catch((err) => console.log("an error occurs", err));
  }

  async getmedia() {
    return fetch(this._urlData)
      .then((res) => res.json())
      .then((res) => {
        if (this.url.pathname === "/photographer.html") {
          const Media = res.media.filter(
            (element) => element.photographerId === Number(this.id)
          );
          return Media;
        } else {
          throw "Unknown type format";
        }
      })
      .catch((err) => console.log("an error occurs", err));
  }
}

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
