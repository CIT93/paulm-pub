
const LOCAL_STORAGE_KEY = 'tshirtOrdersDAta';

export const saveOrders = function(orders){
    try{
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
        console.log('Data save to localStorage Successfully');
    }catch(error){
        console.error('Error saving data to localStorage: ', error);
    };
};

export const loadOrders = function(){
    try{
        const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (dataString){
            return JSON.parse(dataString);
        };
        return [];
    }catch(error){
        console.error('Error saving data to localStorage: ', error);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    };
};

export const clearAllData = function(){
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    console.log('Entries cleared from localStorage');
}