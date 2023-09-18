class App {
  constructor() {
    this.photographeSection = document.querySelector(".photographer_section");
    this.$bannerPhotograph = document.getElementById("photograph-banner");
    this.$imgSection = document.getElementById("img-section-id");
    // eslint-disable-next-line
    this.photographeApi = new PhotographeApi("data/photographers.json");
    this.params = new URL(document.location).searchParams;
  }

  async main() {
    if (!this.params.has("id")) {
      // création de deux constantes qui fait appel à l'api.js pour récupérer les données du dossier data - photographers.json
      const photographeData = await this.photographeApi.getPhotographe();
      // constante qui fait appel à la DataFactorie nous permettant de récupérer les données et créer le ou les objets pour construire les pages index.html et photographer.html

      const photographe = photographeData.map(
        // eslint-disable-next-line
        (data) => new DataFactorie(data, "photographers")
      );
      // initialisation des données data exploitables dans la class AccueilTemplate
      photographe.forEach((data) => {
        // eslint-disable-next-line
        const Template = new AccueilTemplate(data);
        this.photographeSection.appendChild(Template.render());
      });
    } else if (this.params.has("id")) {
      const photographeData = await this.photographeApi.getPhotographe();
      const mediaData = await this.photographeApi.getMedia();

      const photographe = photographeData.map(
        // eslint-disable-next-line
        (data) => new DataFactorie(data, "photographers")
      );
      // constante qui fait appel à la fuction DataFactorie - nous permettant de récupérer les données et créer les objets MédiaModel pour incrémenter la photographer.html
      // eslint-disable-next-line
      const media = mediaData.map((data) => new DataFactorie(data, "media"));
      const FullData = [...photographe, ...media];
      FullData.forEach((data) => {
        // initialisation des données data exploitables dans la class PhotographerTemplate
        // eslint-disable-next-line
        const Template = new PhotographerTemplate(data);
        data.name
          ? this.$bannerPhotograph.appendChild(Template.renderBanner())
          : data.MediaItems &&
            this.$imgSection.appendChild(Template.renderMedia());
      });
    }
  }
}

const app = new App();
app.main();
