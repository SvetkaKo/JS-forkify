import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log(`let's have fun!`);

const controlRecipes = async function () {
  try {
    // const id = window.location.hash.slice(1);
    // const id = '5ed6604591c37cdc054bc886';
    const id = '1';

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
// controlRecipes();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
