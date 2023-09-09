class AccueilTemplate {
  constructor(data) {
    // renvoi les données data pour la création du DOM - index.html
    this._data = data;
  }

  render() {
    // création des articles contenant les images du portrait des photographes

    const sectionIndex = document.getElementById("photographer_section-id");

    const article = document.createElement("article");
    article.classList.add("article-index");
    sectionIndex.insertAdjacentElement("afterbegin", article);

    const figureIndex = document.createElement("figure");
    figureIndex.classList.add("section_figure");
    article.insertAdjacentElement("afterbegin", figureIndex);

    const link = document.createElement("a");
    link.setAttribute("href", `./photographer.html?id=${this._data._id}`);
    link.classList.add("link");
    link.setAttribute("role", "Link image + titre");
    figureIndex.insertAdjacentElement("afterbegin", link);

    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `../../assets/photographers/${this._data.portrait}`
    );
    img.setAttribute("alt", "");
    img.classList.add("section_img");
    link.insertAdjacentElement("afterbegin", img);

    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("figcaption-index");
    link.insertAdjacentElement("beforeend", figcaption);

    const h2 = document.createElement("h2");
    h2.textContent = `${this._data.name}`;
    h2.classList.add("section_titre");
    figcaption.insertAdjacentElement("afterbegin", h2);

    const city = document.createElement("p");
    city.textContent = `${this._data.city}, ${this._data.country}`;
    city.classList.add("section_ville");
    figureIndex.insertAdjacentElement("beforeend", city);

    const citation = document.createElement("q");
    citation.textContent = `${this._data.tagline}`;
    citation.classList.add("section_citation");
    figureIndex.insertAdjacentElement("beforeend", citation);

    const price = document.createElement("p");
    price.textContent = `${this._data.price}€/jours`;
    price.classList.add("section_prix");
    figureIndex.insertAdjacentElement("beforeend", price);

    return article;
  }
}
