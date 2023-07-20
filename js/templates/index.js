class PhotographersTemplate {
  constructor(data) {
    this._data = data;
  }

  getUserCardDOM() {
    const article = document.createElement("article");
    const link = document.createElement("a");
    link.setAttribute("href", `./photographer.html`);
    link.classList.add("link");
    article.appendChild(link);
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `../../assets/photographers/${this._data.portrait}`
    );
    img.setAttribute("alt", `Portrait de ${this._data.name}`);
    img.classList.add("section_img");
    link.insertAdjacentElement("afterbegin", img);

    const h2 = document.createElement("h2");
    h2.textContent = `${this._data.name}`;
    h2.classList.add("section_titre");
    link.insertAdjacentElement("beforeend", h2);

    const pCity = document.createElement("p");
    pCity.textContent = `${this._data.city}, ${this._data.country}`;
    pCity.classList.add("section_ville");
    link.insertAdjacentElement("beforeend", pCity);

    const q = document.createElement("q");
    q.textContent = `${this._data.tagline}`;
    q.classList.add("section_citation");
    link.insertAdjacentElement("beforeend", q);

    const pPrice = document.createElement("p");
    pPrice.textContent = `${this._data.price}€/jours`;
    pPrice.classList.add("section_prix");
    link.insertAdjacentElement("beforeend", pPrice);
    return article;
  }
}
