import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  serch: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      courceUrl: recipe.source_url,
      img: recipe.image_url,
      servings: recipe.servings,
      cooking_time: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const loadSerchResults = async function (query) {
  try {
    state.serch.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.serch.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        img: rec.image_url,
      };
    });
    console.log();
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};
