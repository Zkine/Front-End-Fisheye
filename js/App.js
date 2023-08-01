class App {
  constructor() {
    this.photographeSection = document.querySelector(".photographer_section");
    this.photographBanner = document.querySelector("#main");
    this.photographeApi = new PhotographeApi("/data/photographers.json");
    this.url = new URL(window.location.href);
  }

  async main() {
    console.log(this.photographeApi);
    const reponse = await fetch(this.photographeApi._urlData);
    const pieces = await reponse.json();
    console.log(pieces);
    const photographeData = await pieces.media.getPhotographe();
    // const mediaData = await this.mediaApi.getPhotographe();

    const photographe = photographeData.map((data) =>
      this.url.pathname === "/index.html"
        ? new DataFactorie(data, "photographers")
        : this.url.pathname === "/photographer.html" &&
          new DataFactorie(data, "photographers")
    );

    // const media = mediaData.map(
    //   (data) =>
    //     this.url.pathname === "/photographer.html" &&
    //     new DataFactorie(data, "media")
    // );

    // const FullData = photographe.concat(media);
    // console.log("FullData", FullData);
    photographe.forEach((data) => {
      const Template =
        this.url.pathname === "/index.html"
          ? new AccueilTemplate(data)
          : new PhotographerTemplate(data);
      this.url.pathname === "/index.html"
        ? this.photographeSection.appendChild(Template.getUserCardDOM())
        : this.photographBanner.appendChild(Template.getUserCardDOM());
    });
  }
}

const app = new App();
app.main();
