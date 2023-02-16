import icons from '../../img/icons.svg ';

class SearchView {
  _parentElem = document.querySelector('.search');

  // _errMessage = "You can't search for nothing :)";
  getQuery() {
    const recipeName = this._parentElem.querySelector('.search__field').value;
    if (recipeName === '') return;
    this.#clearSearchFieald();
    return recipeName;
  }
  #clearSearchFieald() {
    this._parentElem.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElem.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
