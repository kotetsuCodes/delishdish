import templateUrl from './accordian.component.html';

let AccordianComponent = {
    bindings: {
        shoppinglists: '='
    },
    controller: 'ShoppinglistController',
    templateUrl: templateUrl
};

export default AccordianComponent;
