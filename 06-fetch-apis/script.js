const form = document.querySelector('form');
const questionInput = document.querySelector('#question');
const askBtn = document.querySelector('.askBtn');
const answersBox = document.querySelector('#answers');
const pList = answersBox.querySelectorAll('p');


form.addEventListener('submit', e => {
    e.preventDefault();

    const q = questionInput.value.trim();

    if (!q) {
        pList[0].textContent = 'Please ask a yes-or-no question first.';
        questionInput.focus();
        return
    }

    pList[0].textContent = 'Consulting the Book of Answers...';
    askBtn.disabled = true;
    
})