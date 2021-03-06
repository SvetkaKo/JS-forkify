import icons from 'url:../../img/icons.svg';
import View from './View';
import previewView from './previewView.js';

class ResultsView extends View {
  // private field
  _parentEl = document.querySelector('.results');
  _errorMessage = `Can't find any recipes! Pleas try again :)`;
  _message = '';

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new ResultsView();
