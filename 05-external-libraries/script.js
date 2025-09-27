const prizePool = [
  {
    tier: 1,
    weight: 2,
    options: [
      "🎉 First Prize: FREE Large Drink!",
      "🏆 First Prize: FREE Medium Drink + topping!",
      "🥳 First Prize: 50% OFF for two drinks!"
    ]
  },
  {
    tier: 2,
    weight: 8,
    options: [
      "✨ Second Prize - $2 OFF any drink!",
      "🍀 Second Prize - Free size upgrade + topping!",
      "🌟 Second Prize - 40% OFF one drink (max $2.50)"
    ]
  },
  {
    tier: 3,
    weight: 20,
    options: [
      "🥤 Third Prize - $1 OFF any drink",
      "😊 Third Prize - Free oat/almond milk upgrade",
      "🧋 Third Prize - Free topping"
    ]
  },
  {
    tier: 0,
    weight: 70,
    options: [
      "🌈 No prize — but have a sweet day!",
      "🍵 No prize - but enjoy your tea! ✨",
      "🙂 No prize - Almost there! Better luck next sip!"
    ]
  }
];

const prizeColors = {
    1: "linear-gradient(135deg, #f7971e, #ffd200)",   
    2: "linear-gradient(135deg, #ff9a9e, #fecfef)",   
    3: "linear-gradient(135deg, #e0c097, #b68b6a)",   
    0: "linear-gradient(135deg, #d7d2cc, #304352)",
    lunch: "linear-gradient(135deg, #f6d365, #fda085)",
    dinner: "linear-gradient(135deg, #b24592, #f15f79)",
}

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

const drawTimeTexts = [
    "Draw again (2 left)",
    "Draw again (1 left)",
    "No more draws."
]

let toastTop = Toastify({
    text: "🧋 Welcome to U&TEA! The button has changed. Click it again to see what deals we've drawn ! ! !",
    duration: 10000,
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


// const now = new Date();

// const h = now.getHours();
// const m = now.getMinutes();

// console.log(h);
// console.log(m);
// console.log(now);
// const minute = h * 60 + m;

// console.log(minute);

function showPrize(prize){
    const prizeColor = prizeColors[prize];
    const priceToast = Toastify({
        text: prize,
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

function isInDiscountPeriod(minute){
    if (minute >= middayDiscountPeriod[0] && minute <= middayDiscountPeriod[1] ||
        minute >= eveningDiscountPeriod[0] && minute <= eveningDiscountPeriod[1]
    ){
        return true;
    }
    return false;
}

function getCurrentDiscount(minute){
    if (minute >= middayDiscountPeriod[0] && minute <= middayDiscountPeriod[1]){
        return "lunch";
    }
    else if (minute >= eveningDiscountPeriod[0] && minute <= eveningDiscountPeriod[1]){
        return "dinner";
    }
}

// console.log(isInDiscountPeriod());

function getRandomPrize(){
    const total = prizePool[0].weight + prizePool[1].weight + prizePool[2].weight + prizePool[3].weight;
    const r = Math.random() * total;
    const a = prizePool[0].weight;
    const b = a + prizePool[1].weight;
    const c = b + prizePool[2].weight;
    const d = total;

    // console.log(total, r, a, b, c, d);

    if (0 <= r && r <= a){
        const options = prizePool[0].options;
        const idx = Math.floor(Math.random() * options.length);
        // console.log(1, 'idx:', idx, options);
        return options[idx];
    }
    else if (a < r && r <= b){
        const options = prizePool[1].options;
        const idx = Math.floor(Math.random() * options.length);
        // console.log(2, 'idx:', idx, options);
        return options[idx];
    }
    else if (b < r && r <= c){
        const options = prizePool[2].options;
        const idx = Math.floor(Math.random() * options.length);
        // console.log(3, 'idx:', idx, options);
        return options[idx];
    }
    else if (c < r && r <= d){
        const options = prizePool[3].options;
        const idx = Math.floor(Math.random() * options.length);
        // console.log(4, 'idx:', idx, options);
        return options[idx];
    }

    
}

// console.log(getRandomPrize());



const dealbtn = document.querySelector("#dealbtn");
const dealstate = document.querySelector("#special p");

// console.log(dealbtn);

dealbtn.addEventListener("click", function(){
    if (clickBtnOnce === false){
        toastTop.showToast();
        clickBtnOnce = true;
        dealbtn.innerText = "Click again to draw ! ! (3 times)";
        dealbtn.className = "clicked";
        dealstate.innerText = "Click the button: If it's discount time, you'll get a fixed deal. Otherwise, try your luck for a random discount!";
    }
    else{
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        const minute = h * 60 + m;
        if (isInDiscountPeriod(minute)){
            // console.log(getCurrentDiscount(minute));
            drawnTime = 3;
            showPrize(getCurrentDiscount(minute));
            // console.log(drawnTime);
        }
        else{
            if (drawnTime < 3){
                drawnTime += 1;
                dealbtn.innerText = drawTimeTexts[drawnTime - 1];
                // console.log(getRandomPrize());
                const prize = getRandomPrize();
                showPrize(prize);
                
            }
            else{
                dealbtn.innerText = "No more draws.";
                // dealstate.innerText = "No more draws. Please come back later ! ! !";
                // console.log("No more draws.");
            }
        }
    }
})



// toast.showToast();




