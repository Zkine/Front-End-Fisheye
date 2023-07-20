class App {
  constructor() {
    this.photographeSection = document.querySelector(".photographer_section");
    this.photographeApi = new PhotographeApi("/data/photographers.json");
  }

  async main() {
    const photographeData = await this.photographeApi.getPhotographe();

    photographeData
      .map((data) => new PhotographersModel(data))
      .forEach((data) => {
        const Template = new PhotographersTemplate(data);
        this.photographeSection.appendChild(Template.getUserCardDOM());
      });
  }
}

const app = new App();
app.main();
