// ################################################
// #                                              #
// #  js file to look at form data and return it  #
// #                                              #
// ################################################

//reference to the main order form
const orderForm = document.getElementById('order-form');

//get references from the quantity field
const qtyField = orderForm.querySelector('#qty');

//get references from the size radio buttons
const sizeRadios = orderForm.querySelectorAll('input[name="size"]');

//get references from the gift wrap checkbox
const giftWrapCheckbox = orderForm.querySelector('#gift-wrap');

const getSelectedSizeValue = function(sizeRadios) {
    for(const radio of sizeRadios) {
        if(radio.checked) {
            // console.log(`Selected size: ${radio.value} and it is ${radio.checked}`);
            return radio.value;
        };
    };
};

export const getOrderInputs = function() {
    return {
        qty: parseInt(qtyField.value) || 1,
        size: getSelectedSizeValue(sizeRadios),
        giftWrap: giftWrapCheckbox.checked
    };
};

export const clearForm = function() {
    orderForm.reset();
    qtyField.value = 1;
    sizeRadios[0].checked = true;
    giftWrapCheckbox.checked = false;
    console.log('form cleared');
};