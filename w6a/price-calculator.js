const shirtPrice = 15;
const giftWrapPrice = 2;

const calculatePrice = function(data){
     if (data.giftWrap) return (data.qty * shirtPrice) + giftWrapPrice;
    else if (data.giftWrap === false) return data.qty * shirtPrice;
    return 0;
};

export const calculateTotal = function(data){
    const calculateTotal = calculatePrice(data);
    console.log('total = ',calculateTotal)
    return {
        totalPrice: calculateTotal,
    };
};



