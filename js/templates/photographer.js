const url = new URL(window.location.href);
const id = url.searchParams.get("id");

class PhotographerTemplate {
  constructor(data) {
    this._data = data;
  }

  getUserCardDOM() {
    const div = document.createElement("div");

    const h2 = document.createElement("h2");
    h2.textContent = `${this._data.likes}`;
    div.insertAdjacentElement("beforeend", h2);
    return div;
  }
}
