class App {
  constructor() {
    this.photographeSection = document.querySelector(".photographer_section");
    this.$bannerPhotograph = document.getElementById("photograph-banner");
    this.$imgSection = document.getElementById("img-section");
    this.photographeApi = new PhotographeApi("/data/photographers.json");
    this.url = new URL(window.location.href);
  }

  async main() {
    // création de deux constantes qui fait appel à l'api.js pour récupérer les données du dossier data - photographers.json
    const photographeData = await this.photographeApi.getPhotographe();
    const mediaData = await this.photographeApi.getMedia();
    // constante qui fait appel à la DataFactorie nous permettant de récupérer les données et créer le ou les objets pour construire les pages index.html et photographer.html
    const photographe = photographeData.map(
      (data) => new DataFactorie(data, "photographers")
    );
    if (this.url.pathname === "/index.html") {
      photographe.forEach((data) => {
        // initialisation des données data exploitables dans la class AccueilTemplate
        const Template = new AccueilTemplate(data);
        this.photographeSection.appendChild(Template.render());
      });
    } else if (this.url.pathname === "/photographer.html") {
      // constante qui fait appel à la DataFactorie nous permettant de récupérer les données et crée les objets MédiaModel pour construire la photographer.html
      const media = mediaData.map((data) => new DataFactorie(data, "media"));
      const FullData = [...photographe, ...media];
      FullData.forEach((data) => {
        // initialisation des données data exploitables dans la class PhotographerTemplate
        const Template = new PhotographerTemplate(data);
        data.name
          ? this.$bannerPhotograph.appendChild(Template.renderBanner())
          : data.Mediaimage &&
            this.$imgSection.appendChild(Template.renderMedia());
      });
    }
  }
}

const app = new App();
app.main();
