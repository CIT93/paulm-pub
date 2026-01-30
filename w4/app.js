console.log('Hello from app.js! Your JavaScript is connected and running!');
// --- Part 1: Select HTML Elements ----
// We use document.getElementById() to get a reference to an element by its unique ID.

import * as orderForm from './order-handler.js';
import * as priceCalculator from './price-calculator.js';

const orderFormElement = document.getElementById('order-form');
const orderSummary = document.getElementById('order-summary');

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
    
    totalShirts += formData.qty;
    orderSummary.textContent = `You ordered ${formData.qty} ${formData.size} T-Shirt(s)${formData.giftWrap ? ' with' : ' without'} gift wrap.`;
};

const handleClearForm = function() {
    orderForm.clearForm();
    orderSummary.textContent = 'Order Details will appear here...';
    console.log('reset form button clicked');
};

const init = function() {
    console.log('App Initialized');
    orderFormElement.addEventListener('submit', handleOrderSubmit);
    orderFormElement.addEventListener('reset', handleClearForm);    
};

document.addEventListener('DOMContentLoaded', init);


