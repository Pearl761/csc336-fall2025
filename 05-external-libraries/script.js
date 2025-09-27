// ---------------- Prize Configuration ----------------
// Prize pool: Different tiers (0 = no prize, 1 = 1st prize, etc.) with weight (probability)
const prizePool = [
    {
    tier: 0,
    weight: 70, // 70% chance of no prize
    options: [
      "🌈 No prize — but have a sweet day!",
      "🍵 No prize - but enjoy your tea! ✨",
      "🙂 No prize - Almost there! Better luck next sip!"
    ]
  },
  {
    tier: 1,
    weight: 2, // 2% chance of 1st prize
    options: [
      "🎉 First Prize: FREE Large Drink!",
      "🏆 First Prize: FREE Medium Drink + topping!",
      "🥳 First Prize: 50% OFF for two drinks!"
    ]
  },
  {
    tier: 2,
    weight: 8, // 8% chance of 2nd prize
    options: [
      "✨ Second Prize - $2 OFF any drink!",
      "🍀 Second Prize - Free size upgrade + topping!",
      "🌟 Second Prize - 40% OFF one drink (max $2.50)"
    ]
  },
  {
    tier: 3,
    weight: 20, // 20% chance of 3rd prize
    options: [
      "🥤 Third Prize - $1 OFF any drink",
      "😊 Third Prize - Free oat/almond milk upgrade",
      "🧋 Third Prize - Free topping"
    ]
  },
  
];

// Discount text for lunch/dinner periods
const LunchDiscount = "🕛 Lunch Special (11 AM - 2 PM): Free topping with any drink!"
const DinnerDiscount = "🌙 Evening Special (6 PM - 9:30 PM): Buy 2 drinks, get 1 free!";

// Gradient colors for each prize tier (visual distinction)
const prizeColors = {
    1: "linear-gradient(135deg, #f7971e, #ffd200)",   
    2: "linear-gradient(135deg, #ff9a9e, #fecfef)",   
    3: "linear-gradient(135deg, #e0c097, #b68b6a)",   
    0: "linear-gradient(135deg, #d7d2cc, #304352)",
    lunch: "linear-gradient(135deg, #f6d365, #fda085)",
    dinner: "linear-gradient(135deg, #b24592, #f15f79)",
}



// Discount time ranges (converted to minutes since midnight for easy comparison)
const middayDiscountPeriod = [
    11 * 60,
    14 * 60,
];

const eveningDiscountPeriod = [
    18 * 60,
    21 * 60 + 30,
];


// Text for remaining draw attempts
const drawTimeTexts = [
    "Draw again (2 left)",
    "Draw again (1 left)",
    "No more draws."
]


// ---------------- Global Variables ----------------
// Welcome toast (shows on first button click)
let toastTop = Toastify({
    text: "🧋 Welcome to U&TEA! The button has changed. Click it again! ! !",
    duration: 8000,
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
let drawnTime = 0;

let prizeText = null;


// ---------------- Core Functions ----------------
// Show toast notification with prize/discount content
function showPrize(prize){
    
    const prizeColor = prizeColors[prize];
    if (prize === 'lunch'){
        prizeText = LunchDiscount;
    }
    else if (prize === 'dinner'){
        prizeText = DinnerDiscount;
    }
    else{
        const options = prizePool[prize].options;
        const idx = Math.floor(Math.random() * options.length);
        prizeText = options[idx];
    }
    const priceToast = Toastify({
        text: prizeText,
        duration: 5000,   
        close: true,
        gravity: "top",
        position: "center",
        style: {
            background: prizeColor,  
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "12px",
            padding: "12px 18px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.25)"
        }
    })
    priceToast.showToast();
}


//Check if current time is in a discount period
function isInDiscountPeriod(minute){
    if (minute >= middayDiscountPeriod[0] && minute <= middayDiscountPeriod[1] ||
        minute >= eveningDiscountPeriod[0] && minute <= eveningDiscountPeriod[1]
    ){
        return true;
    }
    return false;
}


// Get current discount type (lunch/dinner) based on time
function getCurrentDiscount(minute){
    if (minute >= middayDiscountPeriod[0] && minute <= middayDiscountPeriod[1]){
        return "lunch";
    }
    else if (minute >= eveningDiscountPeriod[0] && minute <= eveningDiscountPeriod[1]){
        return "dinner";
    }
}


// Randomly select a prize tier based on weight (probability)
function getRandomPrize(){
    const total = prizePool[0].weight + prizePool[1].weight + prizePool[2].weight + prizePool[3].weight;
    const r = Math.random() * total;
    const a = prizePool[1].weight;
    const b = a + prizePool[2].weight;
    const c = b + prizePool[3].weight;
    const d = total;

    if (0 <= r && r <= a){
        return 1;
    }
    else if (a < r && r <= b){
        return 2;
    }
    else if (b < r && r <= c){
        return 3;
    }
    else if (c < r && r <= d){
        return 0;
    }

    
}



// ---------------- Button Interaction ----------------

const dealbtn = document.querySelector("#dealbtn");
const dealstate = document.querySelector("#special p");


// Button click event listener
let now = null;
let h = null;
let m = null;
let minute = null;
dealbtn.addEventListener("click", function(){

    // First click: Show welcome toast + update button/text
    if (clickBtnOnce === false){
        // Show welcome message
        toastTop.showToast(); 
        clickBtnOnce = true;
        dealbtn.innerText = "get your prize ! !";
        dealbtn.className = "clicked";
        dealstate.innerText = "Click the button: If it's discount time, you'll get a fixed deal. Otherwise, draw for random discounts 3 times!";
        
    }
    // Subsequent clicks: Handle prizes/discounts
    else{
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        const minute = h * 60 + m;// Convert current time to minutes

        // Case 1: In discount period (show fixed discount)
        if (isInDiscountPeriod(minute)){
            drawnTime = 3;
            showPrize(getCurrentDiscount(minute));
            dealbtn.innerText = "Deal applied 🎉";
            dealbtn.disabled = true;
        }
        // Case 2: Not in discount period (allow 3 random draws)
        else if (drawnTime < 3){
            drawnTime += 1;
            dealbtn.innerText = drawTimeTexts[drawnTime - 1];
            const prize = getRandomPrize();
            showPrize(prize);
            // Disable button after 3rd draw
            if (drawnTime === 3){
                dealbtn.innerText = "No more draws.";
                dealbtn.disabled = true;    
            }
        }
    
    }
})



// toast.showToast();




