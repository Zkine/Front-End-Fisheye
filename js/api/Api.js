class Api {
  constructor(url) {
    this._urlData = url;
    this.url = new URL(window.location.href);
    this.id = this.url.searchParams.get("id");
  }
  async get() {
    return fetch(this._urlData)
      .then((res) => res.json())
      .then((res) => {
        switch (this.url.pathname) {
          case "/index.html":
            return res.photographers;
          case "/photographer.html":
            const PhotographersData = res.photographers.find(
              (element) => element.id === Number(this.id)
            );

            let MediaData = res.media.find(
              (element) => element.photographerId === Number(this.id)
            );

            const MediaFilter = res.media.filter(
              (element) =>
                element.photographerId === Number(this.id) &&
                element.image !== undefined
            );

            const MediaMap = MediaFilter.map((element) => element.image);

            MediaData.image = MediaMap;

            const PhotographersMedia = [{ ...PhotographersData, ...MediaData }];
            console.log(PhotographersMedia);
            return PhotographersMedia;
          default:
            throw "Unknown type format";
        }
      })
      .catch((err) => console.log("an error occurs", err));
  }
}

class PhotographeApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getPhotographe() {
    return await this.get();
  }
}
