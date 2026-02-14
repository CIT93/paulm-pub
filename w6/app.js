console.log('Hello from app.js! Your JavaScript is connected and running!');

import * as orderForm from './order-handler.js';
import * as priceCalculator from './price-calculator.js';
import * as orderStorage from './order-storage.js';
import * as orderList from './order-list.js';

const orderFormElement = document.getElementById('order-form');
const clearAllDataButton = document.getElementById('clearAllButton');
const orders = [];

let totalShirts = 1;
let isConfirmingClearAll = false;
let clearAllTimeout = null;

const resetClearAllButton = function(){
    if(clearAllTimeout){
        clearTimeout(clearAllTimeout);
    };
    isConfirmingClearAll = false;
    clearAllDataButton.textContent = 'Clear All Data';
    clearAllDataButton.classList.remove('danger-button');
    clearAllDataButton.classList.remove('confirm-state');
    clearAllDataButton.classList.add('danger-button');
};

const resetAllUIStates = function(){
    resetClearAllButton();
};

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
    orderList.renderOrders(orders);
};

const performClearAllData = function(){
    orders.length = 0;
    orderStorage.clearAllData();
    orderList.renderOrders(orders);
    orderForm.clearForm();
    resetAllUIStates();
}

const handleClearForm = function() {
    orderForm.clearForm();
    console.log('reset form button clicked');
    // resultsDisplay.hideResults();
    resetAllUIStates();
};

const init = function() {
    console.log('App Initialized');
    const loadedEntries = orderStorage.loadOrders();
    if (loadedEntries.length > 0){
        orders.push(...loadedEntries);
        console.log('Data loaded from localStorage');
        orderList.renderOrders(orders);
    }else{
        console.log('No data found in localStorage');
    };
    orderFormElement.addEventListener('submit', handleOrderSubmit);
    orderFormElement.addEventListener('reset', handleClearForm);

    clearAllDataButton.addEventListener('click', function(event){
        event.stopPropagation();
        if(isConfirmingClearAll){
            performClearAllData();

        }else{
            isConfirmingClearAll = true;
            clearAllDataButton.textContent = "Click again if you are sure";
            clearAllDataButton.classList.add('confirm-state');
            clearAllTimeout = setTimeout(function(){
                resetClearAllButton();
            },3000);
        };

    });

    document.addEventListener('click', function(event){
        if(isConfirmingClearAll && event.target !== clearAllDataButton){
            resetClearAllButton();
        };
    });
};

document.addEventListener('DOMContentLoaded', init);


