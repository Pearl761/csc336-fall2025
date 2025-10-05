const form = document.querySelector('form');
const questionInput = document.querySelector('#question');
const askBtn = document.querySelector('.askBtn');
const answersBox = document.querySelector('#answers');
const pList = answersBox.querySelectorAll('p');


form.addEventListener('submit', e => getAdviceAndActivity(e))

async function getAdviceAndActivity(e) {
    e.preventDefault();

    const q = questionInput.value.trim();

    if (!q) {
        pList[0].textContent = 'Please ask a yes-or-no question first.';
        questionInput.focus();
        return
    }

    pList[0].textContent = 'Consulting the Book of Answers...';
    pList[1].textContent = '';
    pList[2].textContent = '';
    pList[3].textContent = '';
    askBtn.disabled = true;

    
    await fetchAndShowAnswers();
    
    

    askBtn.disabled = false;
}

async function fetchAndShowAnswers() {
    const answerResp = await fetch("https://answerbook.david888.com/?lang=en");
    const answerJson = await answerResp.json();
    // const answerText = answerJson.answer;

    let answerText = "";
    if (typeof answerJson.answer === "string") {
        answerText = answerJson.answer;
    } else {
        answerText = answerJson.answer.en; 
    }

    const actResp = await fetch("https://api.adviceslip.com/advice");
    const actData = await actResp.json();
    const activityText = actData.slip.advice;
    
    pList[0].innerHTML = '<strong>📜 Answer:</strong>';
    pList[1].innerHTML = answerText;

    pList[2].innerHTML = '<strong>🎲 Suggestion:</strong>';
    pList[3].innerHTML = activityText;
    
}


// fetch("https://answerbook.david888.com/?lang=en")
//   .then(resp => resp.json())
//   .then(data => console.log("Answerbook API response:", data))
//   .catch(err => console.error("Answerbook API error:", err));