console.log('Hello from app.js! Your JavaScript is connected and running!');

import * as formHandler from './form-handler.js';
import * as calculator from './calculator.js';
import * as resultsDisplay from './results-display.js';
import * as storage from './storage.js';
import * as tableRenderer from './table-renderer.js';

const carbonFootprintEntries = [];
const carbonFootprintForm = document.getElementById('carbonFootprintForm');
const clearFormButton = document.getElementById('clearFormButton');
const clearAllDataButton = document.getElementById('clearAllDataButton');

let isConfirmingClearAll = false;
let clearAllTimeoutId = null;

const resetClearAllButton = function(){
    if(clearAllTimeoutId){
        clearTimeout(clearAllTimeoutId);
    };

    isConfirmingClearAll = false;
    clearAllDataButton.textContent = 'Clear All Saved Data';
    clearAllDataButton.classList.remove('danger-button');
    clearAllDataButton.classList.remove('confirm-state');
    clearAllDataButton.classList.add('danger-button');
};

const resetAllUIStates = function(){
    resetClearAllButton();
};

const handleFormSubmit = function(event) {
    event.preventDefault();
    const formData = formHandler.getFormInputs();
    const calculateResults = calculator.calculateFootprint(formData);

    const newEntry = {
        ...formData,
        ...calculateResults,
        id: storage.generateUniqueId(),
        timestamp: new Date().toISOString()
    };

    carbonFootprintEntries.push(newEntry);
    console.log(carbonFootprintEntries);
    storage.saveEntries(carbonFootprintEntries);
    resultsDisplay.displayResults(calculateResults);
    tableRenderer.renderTable(carbonFootprintEntries,{
            onDelete: handleDeleteEntry,
            onEdit: handleEditEntry,
        });
    resetAllUIStates();
};

const performClearAllData = function(){
    carbonFootprintEntries.length = 0;
    console.log("In-memory array cleared:", carbonFootprintEntries);
    storage.clearAllEntries();
    tableRenderer.renderTable(carbonFootprintEntries,{
            onDelete: handleDeleteEntry,
            onEdit: handleEditEntry,
        });
    formHandler.clearForm();
    resultsDisplay.hideResults();
    resetAllUIStates();
};

const handleClearForm = function() {
    formHandler.clearForm();
    resultsDisplay.hideResults();
    resetAllUIStates();
};

// Week 7.1: Now supports deleting entries from the table.
const handleDeleteEntry = function(id){
    console.log(`Delete button clicked for ID: ${id} functionality added in week 7`);
    // 1. Find the index of the entry to delete in our in-memory array.
    const indexToDelete = carbonFootprintEntries.findIndex(function(entry){
        return entry.id === id;
    });

    if(indexToDelete !== -1){
        // 2. Remove the entry from the in-memory array using splice().
        carbonFootprintEntries.splice(indexToDelete, 1);
        console.log('entry removed from memory');
        // 3. Save the modified (smaller) array back to localStorage.
        storage.saveEntries(carbonFootprintEntries);
        // 4. Re-render the table to reflect the deletion.
        tableRenderer.renderTable(carbonFootprintEntries,{
            onDelete: handleDeleteEntry,
            onEdit: handleEditEntry,
        });// 5. If the table is now empty, hide the results section and clear the form.
        if(carbonFootprintEntries.length === 0){
            resultsDisplay.hideResults();
            formHandler.clearForm();
        }
        // Reset states even if entry not found (e.g., error case)
        resetAllUIStates();
    }else{
        console.log('Did not find index');
        resetAllUIStates();
    };
};

const handleEditEntry = function(id){
    console.log(`Edit button clicked for ID: ${id} functionality added in week 7`);

    resetAllUIStates();

};

const init = function() {
    console.log(`App initialized: DOM is ready! Try submitting the form or clearing it.`)
    carbonFootprintForm.addEventListener('submit', handleFormSubmit);
    clearFormButton.addEventListener('click', handleClearForm);
    resultsDisplay.hideResults();
    const loadedEntries = storage.loadEntries();
    if(loadedEntries.length > 0){
        carbonFootprintEntries.push(...loadedEntries);
        console.log('Entries loaded from localStorage');
    }else{
        console.log('No entries found in localStorage, starting fresh');

    };

    // handleDeleteEntry("1771488140666");

    tableRenderer.renderTable(carbonFootprintEntries,{
            onDelete: handleDeleteEntry,
            onEdit: handleEditEntry,
        });

    clearAllDataButton.addEventListener('click', function(event){
        event.stopPropagation();
        if(isConfirmingClearAll){
            performClearAllData();
        }else{
            isConfirmingClearAll = true;
            clearAllDataButton.textContent = 'Are you sure? Click again';
            clearAllDataButton.classList.add('confirm-state');

            clearAllTimeoutId = setTimeout(function(){
                resetClearAllButton();
                console.log('Clear All confirmation timed out');
            }, 3000); // 3 seconds
        };
    });

    document.addEventListener('click', function(event){
        if(isConfirmingClearAll && event.target !== clearAllDataButton){
            resetClearAllButton();
        }
    });
};

document.addEventListener('DOMContentLoaded', init);