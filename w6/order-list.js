
const orderTable = document.getElementById('order-table');
const orderList = orderTable.querySelector('#order-table-body');
const noEntriesMessage = document.getElementById('noEntriesMessage');
const clearAllDataButton = document.getElementById('clearAllButton')

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
        `;
    return row;
};

export const renderOrders = function(orders){
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