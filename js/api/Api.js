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
            const Photographers = res.photographers.find(
              (element) => element.id === Number(this.id)
            );
            // console.log("PhotographersData", PhotographersData);
            // const MediaFilter = res.media.filter(
            //   (element) => element.photographerId === Number(this.id)
            // );

            // console.log("MediaFilter", MediaFilter);
            const MediaVideo = res.media.filter(
              (element) =>
                element.photographerId === Number(this.id) && element.video
            );

            const Media = res.media.filter(
              (element) =>
                element.photographerId === Number(this.id) && element.image
            );

            // const PhotographersObjet = {
            //   PhotographersData: PhotographersData,
            //   MediaVideo: MediaVideo,
            //   MediaImg: MediaImg,
            // };
            // console.log(MediaVideo);
            // PhotographersData.video = MediaVideo;
            // PhotographersData.image = MediaImg;
            if (Photographers) {
              return [Photographers];
            } else if (Media) {
              return [Media];
            }
          // return [Photographers, Media];
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
