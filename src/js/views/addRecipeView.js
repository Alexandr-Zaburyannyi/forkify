import icons from '../../img/icons.svg';

import View from './View.js';

class AddRecipeView extends View {
  _parentElem = document.querySelector('.upload');

  _message = 'Your recipe was succesfully uploaded :)';

  _overlay = document.querySelector('.overlay');

  _modalWindow = document.querySelector('.add-recipe-window');

  _openBtn = document.querySelector('.nav__btn--add-recipe');
  _closeBtn = document.querySelector('.btn--close-modal');
  _uploadBtn = document.querySelector('.upload__btn');

  constructor() {
    super();
    this.addHandlerOpenModal();
    this.addHandlerCloseModal();
  }

  addHandlerOpenModal() {
    this._openBtn.addEventListener('click', e => {
      e.preventDefault();
      this.toggleModal();
    });
  }

  addHandlerCloseModal() {
    this._closeBtn.addEventListener('click', e => {
      e.preventDefault();
      this.toggleModal();
    });
    this._overlay.addEventListener('click', this.toggleModal.bind(this));
  }

  addHandlerSubmitRecipe(handler) {
    this._uploadBtn.addEventListener('click', e => {
      e.preventDefault();
      const rawData = new FormData(this._parentElem);
      const data = [...rawData];
      handler(Object.fromEntries(data));
    });
  }

  toggleModal() {
    this._overlay.classList.toggle('hidden');
    this._modalWindow.classList.toggle('hidden');
  }
}
export default new AddRecipeView();
