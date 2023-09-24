// eslint-disable-next-line
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
    link.classList.add("link");
    link.setAttribute("href", `./photographer.html?id=${this._data._id}`);
    link.setAttribute("role", "Link image + titre");
    figureIndex.insertAdjacentElement("afterbegin", link);

    const img = document.createElement("img");
    img.setAttribute("tabindex", "0");
    img.setAttribute("loading", "lazy");
    img.classList.add("section_img");
    img.setAttribute(
      "src",
      `../../assets/photographers/${this._data.portrait}`
    );
    img.setAttribute("alt", "");
    link.insertAdjacentElement("afterbegin", img);

    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("figcaption-index");
    link.insertAdjacentElement("beforeend", figcaption);

    const h2 = document.createElement("h2");
    h2.setAttribute("tabindex", "0");
    h2.classList.add("section_titre");
    h2.textContent = `${this._data.name}`;
    figcaption.insertAdjacentElement("afterbegin", h2);

    const city = document.createElement("p");
    city.setAttribute("tabindex", "0");
    city.classList.add("section_ville");
    city.textContent = `${this._data.city}, ${this._data.country}`;
    figureIndex.insertAdjacentElement("beforeend", city);

    const citation = document.createElement("q");
    citation.setAttribute("tabindex", "0");
    citation.classList.add("section_citation");
    citation.textContent = `${this._data.tagline}`;
    figureIndex.insertAdjacentElement("beforeend", citation);

    const price = document.createElement("p");
    price.setAttribute("tabindex", "0");
    price.classList.add("section_prix");
    price.textContent = `${this._data.price}€/jours`;
    figureIndex.insertAdjacentElement("beforeend", price);

    return article;
  }
}
