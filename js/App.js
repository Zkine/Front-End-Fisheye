class App {
  constructor() {
    this.photographeSection = document.querySelector(".photographer_section");
    this.photographBanner = document.querySelector(".photograph-banner");
    this.photographeApi = new PhotographeApi("/data/photographers.json");
    this.url = new URL(window.location.href);
  }

  async main() {
    const photographeData = await this.photographeApi.getPhotographe();
    const FullData = photographeData.map((data) =>
      this.url.pathname === "/index.html"
        ? new DataFactorie(data, "photographers")
        : new DataFactorie(data, "photographersMedia")
    );
    FullData.forEach((data) => {
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
