const DiscountPool = [
    "🎉 BOGO: Buy 1 get 1 50% off (medium).",
    "🌟 Student Special: Any medium for $3.99.",
    "🍠 Taro Lover: Free topping on taro milk tea.",
    "🍮 Pudding Day: Add pudding for free!",
    "🥛 Oat Milk Upgrade: +$0.50 only today!"
];

const LunchDiscount = "🕛 Lunch Special (11 AM - 2 PM): Free topping with any drink!"
const DinnerDiscount = "🌙 Evening Special (6 PM - 9:30 PM): Buy 2 drinks, get 1 free!";

const middayDiscountPeriod = [
    11 * 60,
    14 * 60,
];

const eveningDiscountPeriod = [
    18 * 60,
    21 * 60 + 30,
];

let toastTop = Toastify({
    text: "🧋 Welcome to U&TEA! The button has changed. Click it again to see what deals we've drawn ! ! !",
    duration: -1,
    close: true,
    gravity: "top", 
    position: "center",
    style: {
    background: "linear-gradient(135deg, #e09e48, #B68B6A)",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "12px",
    padding: "12px 18px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.25)"
    }
});

let clickBtnOnce = false;


// const now = new Date();

// const h = now.getHours();
// const m = now.getMinutes();

// console.log(h);
// console.log(m);
// console.log(now);
// const minute = h * 60 + m;

// console.log(minute);

function isInDiscountPeriod(){
    if (minute >= middayDiscountPeriod[0] && minute <= middayDiscountPeriod[1] ||
        minute >= eveningDiscountPeriod[0] && minute <= eveningDiscountPeriod[1]){
        return true;
    }
    return false;
}

// console.log(isInDiscountPeriod());


const dealbtn = document.querySelector("#dealbtn");

// console.log(dealbtn);

dealbtn.addEventListener("click", function(){
    if (clickBtnOnce === false){
        toastTop.showToast();
        clickBtnOnce = true;
        dealbtn.innerText = "Show Today's Deal";
        dealbtn.className = "clicked";
    }
    else{
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        const minute = h * 60 + m;
        if (isInDiscountPeriod()){

        }
    }
})



// toast.showToast();




