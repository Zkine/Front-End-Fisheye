class AccueilTemplate {
  constructor(data) {
    // renvoi les données data pour la création du DOM - index.html
    this._data = data;
  }

  render() {
    // création des articles contenant les images du portrait des photographes
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.setAttribute("href", `./photographer.html?id=${this._data._id}`);
    link.classList.add("link");
    article.appendChild(link);

    const p = document.createElement("p");
    p.classList.add("section_div");
    link.appendChild(p);

    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `../../assets/photographers/${this._data.portrait}`
    );
    img.setAttribute("alt", `Portrait d'${this._data.name}`);
    img.classList.add("section_img");
    p.insertAdjacentElement("afterbegin", img);

    const h2 = document.createElement("h2");
    h2.textContent = `${this._data.name}`;
    h2.classList.add("section_titre");
    link.insertAdjacentElement("beforeend", h2);

    const city = document.createElement("p");
    city.textContent = `${this._data.city}, ${this._data.country}`;
    city.classList.add("section_ville");
    link.insertAdjacentElement("beforeend", city);

    const citation = document.createElement("q");
    citation.textContent = `${this._data.tagline}`;
    citation.classList.add("section_citation");
    link.insertAdjacentElement("beforeend", citation);

    const price = document.createElement("p");
    price.textContent = `${this._data.price}€/jours`;
    price.classList.add("section_prix");
    link.insertAdjacentElement("beforeend", price);

    return article;
  }
}
