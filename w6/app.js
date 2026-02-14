console.log('Hello from app.js! Your JavaScript is connected and running!');

import * as orderForm from './order-handler.js';
import * as priceCalculator from './price-calculator.js';
import * as resultsDisplay from './results-display.js';
import * as orderStorage from './order-storage.js';

const orderFormElement = document.getElementById('order-form');

const orders = [];

let totalShirts = 1;

const handleOrderSubmit = function(event) {
    event.preventDefault();
    const formData = orderForm.getOrderInputs();
    const calcData = priceCalculator.calculateTotal(formData);

    const newOrder = {
        ...formData,
        ...calcData,
        timestamp: new Date().toISOString()
    };

    orders.push(newOrder);
    console.log(orders);
    orderStorage.saveOrders(orders);
    resultsDisplay.displayResults(newOrder);//completed this in a previouse module
};

const handleClearForm = function() {
    orderForm.clearForm();
    console.log('reset form button clicked');
    resultsDisplay.hideResults();
};

const init = function() {
    console.log('App Initialized');
    const loadedEntries = orderStorage.loadOrders();
    if (loadedEntries.length > 0){
        orders.push(...loadedEntries);
        console.log('Data loaded from localStorage');
    }else{
        console.log('No data found in localStorage');
    }
    orderFormElement.addEventListener('submit', handleOrderSubmit);
    orderFormElement.addEventListener('reset', handleClearForm);
    resultsDisplay.hideResults();
};

document.addEventListener('DOMContentLoaded', init);


