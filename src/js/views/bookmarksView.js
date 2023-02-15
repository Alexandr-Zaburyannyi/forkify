import PreviewView from './previewView.js';

class BookmarksView extends PreviewView {
  _parentElem = document.querySelector('.bookmarks__list');

  _errMessage =
    'No bookmarks yet! Try to find a fine recipe and bookmark it ;)';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}
export default new BookmarksView();
