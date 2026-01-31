console.log('Hello from app.js! Your JavaScript is connected and running!');
// --- Part 1: Select HTML Elements ----
// We use document.getElementById() to get a reference to an element by its unique ID.

import * as orderForm from './order-handler.js';
import * as priceCalculator from './price-calculator.js';
import * as resultsDisplay from './results-display.js';

const orderFormElement = document.getElementById('order-form');

const orders = [];

let totalShirts = 1;

const handleOrderSubmit = function(event) {
    event.preventDefault();
    const formData = orderForm.getOrderInputs();
    const calcData = priceCalculator.calculateTotal(formData);
    // console.log('Total calculated: ', calcData);

    const newOrder = {
        ...formData,
        ...calcData,
        timestamp: new Date().toISOString()
    };

    orders.push(newOrder);
    console.log(orders);
    resultsDisplay.displayResults(calcData,formData);
};

const handleClearForm = function() {
    orderForm.clearForm();
    console.log('reset form button clicked');
    resultsDisplay.hideResults();
};

const init = function() {
    console.log('App Initialized');
    orderFormElement.addEventListener('submit', handleOrderSubmit);
    orderFormElement.addEventListener('reset', handleClearForm);
    resultsDisplay.hideResults();
};

document.addEventListener('DOMContentLoaded', init);


