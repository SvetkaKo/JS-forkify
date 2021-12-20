import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log(`let's have fun!`);

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // const id = '5ed6604591c37cdc054bc886';
    // const id = '1';

    if (!id) return;

    //render spiner while the recipe is loading
    recipeView.renderSpiner();

    //loading recipe from model
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSerchResults = async function () {
  try {
    resultsView.renderSpiner();

    //get
    const query = searchView.getQuery();
    if (!query) return;

    // load aearch results
    await model.loadSerchResults(query);

    console.log(model.state.serch.results);
    model.state.serch.results;
    resultsView.render(model.state.serch.results);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHendlerSearch(controlSerchResults);
};
init();
