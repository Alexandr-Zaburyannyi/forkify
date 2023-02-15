import PreviewView from './previewView.js';

class ResultsView extends PreviewView {
  _parentElem = document.querySelector('.results');

  _errMessage = 'No recipes found for your query. Please try again!  ;)';
}
export default new ResultsView();
