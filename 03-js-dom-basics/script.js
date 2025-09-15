//diaries list
let savedDiaries = [];

let currentMood = null;

// mood select
function selectMood(mood) {
    currentMood = mood;

    const moodTextMap = {
        happy: "😊 Happy",
        sad: "😢 Sad",
        angry: "😠 Angry",
        excited: "🎉 Excited",
        neutral: "😐 Neutral",
        calm: '😌 Calm',
    };
    const previewMood = document.getElementById('preview-mood');
    previewMood.textContent = moodTextMap[mood];
    previewMood.classList.remove('hint-text');

    const moodColorMap = {
        happy: '#fff0f3',
        sad: '#f0f7ff',
        angry: '#fff0f0',
        neutral: '#f8f9fa',
        calm: '#f0fff4',
        excited: '#fff8e6'
    };
    const previewCard = document.getElementById('preview-card');
    previewCard.style.backgroundColor = moodColorMap[mood];
}

// preview date
function syncDateToPreview() {
    const dateInput = document.getElementById('diary-date');
    
    const selectedDate = dateInput.value;
    
    const previewDate = document.getElementById('preview-date');
    
    if (selectedDate) {
        previewDate.textContent = selectedDate; 
        previewDate.classList.remove('hint-text'); 
    } else {
        previewDate.textContent = 'Select date';
        previewDate.classList.add('hint-text');
    }
}

let date = document.getElementById('diary-date');
date.addEventListener('change', syncDateToPreview);


// preview content
function syncContentToPreview() {
    const contentInput = document.getElementById('diary-content');
    
    const inputContent = contentInput.value.trim();
    
    const previewContent = document.getElementById('preview-content');

    
    if (inputContent) {
        previewContent.textContent = inputContent;
        previewContent.classList.remove('hint-text');
    } else {
        previewContent.textContent = 'Write something about your day.....';
        previewContent.classList.add('hint-text');
    }
}

content = document.getElementById('diary-content');
content.addEventListener('input', syncContentToPreview);

// ---- saveDiary uses createElement ----
function saveDiary() {
  const dateVal = document.getElementById("diary-date").value;
  const contentVal = document.getElementById("diary-content").value.trim();

  if (!dateVal) {
    alert("Please choose a date.");
    return;
  }
  if (!currentMood) {
    alert("Please select your mood.");
    return;
  }
  if (!contentVal) {
    alert("Please write something.");
    return;
  }

