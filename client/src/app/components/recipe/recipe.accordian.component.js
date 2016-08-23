import templateUrl from './recipe.accordian.component.html';

let RecipeAccordianComponent = {
    bindings: {
        recipes: '='
    },
    controller: 'RecipeController',
    templateUrl: templateUrl
};

export default RecipeAccordianComponent;
