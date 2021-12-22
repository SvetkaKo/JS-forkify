import icons from 'url:../../img/icons.svg';
import View from './View';

class ResultsView extends View {
  // private field
  _parentEl = document.querySelector('.results');
  _errorMessage = `Can't find any recipes! Pleas try again :)`;
  //success message
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return `<li class="preview">
          <a class="preview__link ${
            result.id === id ? 'preview__link--active' : ''
          }" href="#${result.id}">
            <figure class="preview__fig">
              <img src="${result.img}" alt="Test" crossorigin/>
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
              <div class="preview__user-generated">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>
          `;
  }

  //   _pagination() {
  //     const btn = document.querySelector('.pagination');
  //     btn.classList.remove('hidden');
  //   }
}

export default new ResultsView();
