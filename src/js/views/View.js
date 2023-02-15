import icons from '../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();

    this.#clear();

    this._parentElem.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElems = Array.from(newDOM.querySelectorAll('*'));
    const curElems = Array.from(this._parentElem.querySelectorAll('*'));
    newElems.forEach((newEl, i) => {
      const curEl = curElems[i];

      if (
        !newEl.isEqualNode(curEl) &&
        curEl?.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  #clear() {
    this._parentElem.innerHTML = '';
  }
  renderSpinner() {
    const html = `<div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
        </div>`;
    this.#clear();
    this._parentElem.insertAdjacentHTML('afterbegin', html);
  }

  renderError(message = this._errMessage) {
    const html = `
  <div class="error">
    <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this.#clear();
    this._parentElem.insertAdjacentHTML('afterbegin', html);
  }
  renderMessage(message = this._message) {
    const html = `<div class="message">
       <div>
         <svg>
           <use href=" ${icons} }#icon-smile"></use>
         </svg>
       </div>
      <p>${message}</p>
     </div>`;
    this.#clear();
    this._parentElem.insertAdjacentHTML('afterbegin', html);
  }
}
