const resultsContainer = document.getElementById('order-summary');
const totalOrderCost = resultsContainer.querySelector('#display-total');
const resultsDetails = resultsContainer.querySelector('#display-qty');
const giftWrapDetails = resultsContainer.querySelector('#display-gift');

// export const displayResults = function(results,size){
export const displayResults = function(results,size){
    totalOrderCost.textContent = `${results.totalPrice}`;
    resultsDetails.textContent = `${size.qty} ${size.size}`;
    giftWrapDetails.textContent= `${size.giftWrap ? 'Yes' : 'No'}`;
    resultsContainer.style.display = 'block';
};

export const hideResults = function(){
    resultsContainer.style.display = 'none';
};