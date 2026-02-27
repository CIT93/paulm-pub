// --- Part 3: Implement the form-handler.js module ---

// This module handles getting input values from the form and clearing it.
// Simplified: Only focuses on Household Size input for now.

// Reference to the main carbon footprint form for event listening
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

const hhMembersInput = document.getElementById('householdMembers'); // renamed here
const homeSquareFootageInput = document.getElementById('homeSquareFootage');

// Apartment Checkbox reference
const isApartmentInput = carbonFootprintForm.querySelector('#isApartment');

// Food Choices reference(radio buttons - we need to query for all with the same 'name')
// this returns a node list, which is array "like"
// An Array is a list of items array[index]
const dietTypeRadios = carbonFootprintForm.querySelectorAll('input[name="dietType"]');
const foodPackagingRadios = carbonFootprintForm.querySelectorAll('input[name="foodPackaging"]');

// @param {NodeList} radioButtons - A NodeList (like an array) of radio button elements.
// @returns {string} The 'value' attribute of the selected radio button.
const getSelectedRadioValue = function (radioButtons) {// Write a function to handle this and return the value
    // Loop over the node list to find the radio button checked (clicked)
    // for...of to loop over node list (array like)
    // let selectDietType = null;
    for(const radio of radioButtons){
        // Code to be executed for each value
        if(radio.checked) {
            // console.log(`${radio.value} has the attribute of ${radio.checked}`);
            return radio.value;
        };
    };
};

//--- Part 1: Code clearForm and getFormInput
// Collects all relevant input values from the form for Household Size, Home Size, and Food Choices.
// @returns {Object} An object containing all the collected input values.
export const getFormInputs = function() {
    return {
        // Look closely at the line below
        householdMembers: parseInt(householdMembersInput.value) || 1, 
        homeSquareFootage: parseInt(homeSquareFootageInput.value) || 0,
        isApartment: isApartmentInput.checked,
        dietType: getSelectedRadioValue(dietTypeRadios),
        foodPackaging: getSelectedRadioValue(foodPackagingRadios)
    }
};

// Clears all input fields in the form and resets default selections.
export const clearForm = function() {
    carbonFootprintForm.reset();
    householdMembersInput.value = 1;
    homeSquareFootageInput.value = 0;
    dietTypeRadios[0].checked;
    foodPackagingRadios[0].checked;
    console.log('Clear Form');
};