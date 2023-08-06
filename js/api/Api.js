class Api {
  constructor(url) {
    this._urlData = url;
    this.url = new URL(window.location.href);
    this.id = this.url.searchParams.get("id");
  }
  async getportait() {
    return fetch(this._urlData)
      .then((res) => res.json())
      .then((res) => {
        switch (this.url.pathname) {
          case "/index.html":
            return res.photographers;
          case "/photographer.html":
            const Photographers = res.photographers.find(
              (element) => element.id === Number(this.id)
            );
            return [Photographers];
          default:
            throw "Unknown type format";
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
  // (url) récupèration du chemin du dossier data - photographers.json
  constructor(url) {
    super(url);
  }
  // appel de la function ci-dessous pour construire l'objet -PhotographersModel
  async getPhotographe() {
    return await this.getportait();
  }
  // appel de la function ci-dessous pour construire l'objet -MediaModel
  async getMedia() {
    return await this.getmedia();
  }
}
