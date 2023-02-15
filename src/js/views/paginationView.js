import icons from '../../img/icons.svg';

import View from './View.js';

class PaginationView extends View {
  _parentElem = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElem.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');

      const goToPage = btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = +this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (curPage === 1 && numPages > 1) {
      return `<button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      <span>Page ${curPage + 1}</span>
    </button>`;
    }

    if (curPage === numPages && numPages > 1) {
      return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
    `;
    }

    if (curPage < numPages) {
      return `<button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
          <span>Page ${curPage + 1}</span>
        </button>
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
                  <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                  </svg>
                  <span>Page ${curPage - 1}</span>
                </button>
        `;
    }
    return '';
  }
}
export default new PaginationView();
