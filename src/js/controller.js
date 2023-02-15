import * as model from './model.js';
import { TIMEOUT_MODAL } from './config.js';

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/actual';

import 'regenerator-runtime/runtime';

import { async } from 'regenerator-runtime';

const controlFetchRecipe = async () => {
  try {
    recipeView.renderSpinner();

    const id = window.location.hash.slice(1);

    resultsView.update(model.getResultsPage());

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);

    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchQuery = async () => {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();

    if (!query) return;

    await model.searchRecipes(query.toLowerCase());

    resultsView.render(model.getResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = goToPage => {
  resultsView.render(model.getResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = newServings => {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlBookmarks = () => {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlRestoreBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async newRecipe => {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    bookmarksView.update(model.state.bookmarks);

    setTimeout(() => {
      addRecipeView.toggleModal();
    }, TIMEOUT_MODAL);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = () => {
  bookmarksView.addHandlerRender(controlRestoreBookmarks);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerRender(controlFetchRecipe);
  recipeView.addHandlerBookmark(controlBookmarks);
  searchView.addHandlerSearch(controlSearchQuery);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerSubmitRecipe(controlAddRecipe);
};
init();

if (module.hot) {
  module.hot.accept();
}
