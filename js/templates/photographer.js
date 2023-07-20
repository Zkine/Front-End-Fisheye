class PhotographeTemplate {
  constructor(data) {
    this._data = data;
  }

  getUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add("section_article");
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `../../assets/photographers/${this._data.portrait}`
    );
    img.setAttribute("alt", `Portrait de ${this._data.name}`);
    img.classList.add("section_img");
    article.insertAdjacentElement("afterbegin", img);

    const h2 = document.createElement("h2");
    h2.textContent = `${this._data.name}`;
    h2.classList.add("section_titre");
    article.insertAdjacentElement("beforeend", h2);

    const p1 = document.createElement("p");
    p1.textContent = `${this._data.city}, ${this._data.country}`;
    p1.classList.add("section_ville");
    article.insertAdjacentElement("beforeend", p1);

    const q = document.createElement("q");
    q.textContent = `${this._data.tagline}`;
    q.classList.add("section_citation");
    article.insertAdjacentElement("beforeend", q);

    const p2 = document.createElement("p");
    p2.textContent = `${this._data.price}€/jours`;
    p2.classList.add("section_prix");
    article.insertAdjacentElement("beforeend", p2);
    return article;
  }
}
