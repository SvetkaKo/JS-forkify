import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log(`let's have fun! You're amazing!`);

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // const id = '5ed6604591c37cdc054bc886';
    // const id = '1';

    if (!id) return;

    //render spiner while the recipe is loading
    recipeView.renderSpiner();

    // update results view to mark selected search result
    resultsView.update(model.getSearhResultsPage());

    //loading recipe from model
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);

    //updating bookmarks view
    bookmarkView.update(model.state.bookmarks);

    console.log(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

const controlSerchResults = async function () {
  try {
    resultsView.renderSpiner();

    //get
    const query = searchView.getQuery();
    if (!query) return;

    // load search results
    await model.loadSerchResults(query);

    // Rendering results
    resultsView.render(model.getSearhResultsPage());

    //render buttons
    paginationView.render(model.state.serch);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // Rendering NEW results
  resultsView.render(model.getSearhResultsPage(goToPage));

  //render NEW buttons
  paginationView.render(model.state.serch);
};

const controlServings = function (newServ) {
  // Update the recipe servings (in state)
  model.updateServings(newServ);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //add or remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  //update element after bookmarking
  recipeView.update(model.state.recipe);

  //render bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpiner();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    //render bookmark
    bookmarkView.render(model.state.bookmarks);

    //chang id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 3000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHendlerSearch(controlSerchResults);
  paginationView.addHendlerClick(controlPagination);
  recipeView.addHandlerUpdaitServings(controlServings);
  recipeView.addHandlerAddBookmar(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
