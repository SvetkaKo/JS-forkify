import icons from 'url:../../img/icons.svg';
import View from './View';

class Pagination extends View {
  // private field
  _parentEl = document.querySelector('.pagination');
  // currentPage = model.state.serch.page;

  addHendlerClick(handler) {
    this._parentEl.addEventListener('click', function (ev) {
      const btn = ev.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    console.log(this._parentEl);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    let currentPage = this._data.page;
    console.log(currentPage);

    // Variants of current page:
    //this is page 1 and there are other pages
    if (currentPage === 1 && numPages > 1)
      return this._generateMarkupButtonNext(currentPage);

    //this is page 1 and there are NO other pages
    if (currentPage === 1 && numPages === 1) return '';

    //Last page
    if (currentPage === numPages && numPages > 1)
      return this._generateMarkupButtonPrev(currentPage);
    //Other
    if (currentPage > 1 && currentPage != numPages)
      return (
        this._generateMarkupButtonPrev(currentPage) +
        this._generateMarkupButtonNext(currentPage)
      );
    return `it works`;
  }

  _generateMarkupButtonPrev(result) {
    return `
          <button data-goto="${
            result - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${result - 1}</span>
          </button>`;
  }
  _generateMarkupButtonNext(result) {
    return `
          <button data-goto="${
            result + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${result + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
}

export default new Pagination();
