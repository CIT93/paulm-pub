const resultsContainer = document.getElementById('order-summary');
const totalOrderCost = resultsContainer.querySelector('#display-total');
const resultsDetails = resultsContainer.querySelector('#display-qty');
const giftWrapDetails = resultsContainer.querySelector('#display-gift');

// export const displayResults = function(results,size){
export const displayResults = function(newOrder){
    totalOrderCost.textContent = `${newOrder.totalPrice}`;
    resultsDetails.textContent = `${newOrder.qty} ${newOrder.size}`;
    giftWrapDetails.textContent= `${newOrder.giftWrap ? 'Yes' : 'No'}`;
    resultsContainer.style.display = 'block';
};

export const hideResults = function(){
    resultsContainer.style.display = 'none';
};