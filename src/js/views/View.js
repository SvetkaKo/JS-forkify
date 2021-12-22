import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup); // create virtual DOM

    //convert Node list to Array  => Array.from(...)
    const newElements = Array.from(newDOM.querySelectorAll('*')); // virtual DOM
    const curElements = Array.from(this._parentEl.querySelectorAll('*')); // actual DOM
    // console.log(newElements);
    // console.log(curElements);

    //loop throught arrays and compare them
    newElements.forEach((newEl, index) => {
      const curEl = curElements[index];
      // console.log(newEl, curEl);

      //Update changed TEXT. look at the different text in Node elements
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() != '' // check that firstchilde exists
      ) {
        curEl.textContent = newEl.textContent;
      }

      //Update Chenged Attributes.
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  //animation of rendering spiner while the recipe is loading
  renderSpiner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  // RENDERING ERROR MESSAGE
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  //RENDER SUCCESS MESSAGE
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
