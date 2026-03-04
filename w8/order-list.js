
const orderTable = document.getElementById('order-table');
const orderList = document.getElementById('order-table-body');
const noEntriesMessage = document.getElementById('noEntriesMessage');
const clearAllDataButton = document.getElementById('clearAllButton');
const tableBody = document.getElementById('order-table-body');

let moduleCallbacks = {};

const formatDateForDisplay = function(timestamp){
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US',{
        year: 'numeric', month: 'short', day: 'numeric'
    });
};

const createTableRow = function(entry){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${formatDateForDisplay(entry.timestamp)}</td>
        <td>${entry.qty}</td>
        <td>${entry.size}</td>
        <td>$${entry.totalPrice}</td>
        <td class="action-cell">
        <button class="action-button edit" data-id="${entry.id}">Edit</button>
        <p>
        <button class="action-button delete" data-id="${entry.id}">Delete</button>
        </td>
        `;
    return row;
};

tableBody.addEventListener('click', function(event){
    const target = event.target;
    const id = target.dataset.id;
    if(!id)return;
    // console.log('Button clicked with ID:', id);
    if(target.classList.contains('edit') && typeof moduleCallbacks.onEdit === 'function'){
        moduleCallbacks.onEdit(id);
    }else if(target.classList.contains('delete') && typeof moduleCallbacks.onDelete === 'function'){
        moduleCallbacks.onDelete(id);
    };
});

export const renderOrders = function(orders, callbacks){
    moduleCallbacks = callbacks;
    orderList.innerHTML = '';
    if (orders.length === 0){
        orderTable.style.display = 'none';
        noEntriesMessage.style.display = 'block';
        clearAllDataButton.style.display = 'none';
        return;
    }else{
        orderTable.style.display = 'table';
        noEntriesMessage.style.display = 'none';
        clearAllDataButton.style.display = 'block';
    };

    const sortedOrders = [...orders].sort(function(a,b){
        return new Date(b.timestamp) - new Date(a.timestamp);
    });

    for (const order of sortedOrders){
        const rowElement = createTableRow(order);
        orderList.appendChild(rowElement);
    };
};