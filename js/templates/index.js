class PhotographersTemplate {
  constructor(data) {
    this._data = data;
  }

  getUserCardDOM() {
    const article = document.createElement("article");
    const link = document.createElement("a");
    link.setAttribute("href", `./photographer.html?id=${this._data._id}`);
    link.classList.add("link");
    article.appendChild(link);

    const div = document.createElement("div");
    div.classList.add("section_div");
    link.appendChild(div);

    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `../../assets/photographers/${this._data.portrait}`
    );
    img.setAttribute("alt", `Portrait de ${this._data.name}`);
    img.classList.add("section_img");
    div.insertAdjacentElement("afterbegin", img);

    const h2 = document.createElement("h2");
    h2.textContent = `${this._data.name}`;
    h2.classList.add("section_titre");
    link.insertAdjacentElement("beforeend", h2);

    const pCity = document.createElement("p");
    pCity.textContent = `${this._data.city}, ${this._data.country}`;
    pCity.classList.add("section_ville");
    link.insertAdjacentElement("beforeend", pCity);

    const qCitation = document.createElement("q");
    qCitation.textContent = `${this._data.tagline}`;
    qCitation.classList.add("section_citation");
    link.insertAdjacentElement("beforeend", qCitation);

    const pPrice = document.createElement("p");
    pPrice.textContent = `${this._data.price}€/jours`;
    pPrice.classList.add("section_prix");
    link.insertAdjacentElement("beforeend", pPrice);

    return article;
  }
}
