export default class recipeService {
    constructor ($resource) {
        'ngInject';

        return $resource(BACKEND_URL + '/recipes/:id', {}, {
            'getRecipeById': {
                method: 'GET'
            },
            'getRecipes': {
                url: BACKEND_URL + '/recipes',
                method: 'GET',
                isArray: true
            },
            'getRecipesByEmail': {
                url: BACKEND_URL + '/recipes?email=:email',
                isArray: true
            },
            'createRecipe': {
                url: BACKEND_URL + '/recipes',
                method: 'POST'
            },
            'removeRecipe': {
                url: BACKEND_URL + '/recipes/:id',
                method: 'DELETE'
            },
            'updateRecipe': {
                url: BACKEND_URL + '/recipes/:id',
                method: 'PUT'
            },
            'getIngredientSuggestions': {
                url: BACKEND_URL + '/ingredients',
                method: 'GET',
                isArray: true
            },
            'getQuantityTypeSuggestions': {
                url: BACKEND_URL + '/quantity_types',
                method: 'GET',
                isArray: true
            },
            'addIngredient': {
                url: BACKEND_URL + '/ingredients',
                method: 'POST'
            },
            'addQuantityType': {
                url: BACKEND_URL + '/quantity_types',
                method: 'POST'
            }
        });
    }
};
