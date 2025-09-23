// Predefined student data
const students = [
{ name: "Alice Chen", birth: "2005-08-12", gpa: 3.7, major: "Computer Science", bio: "Loves web dev." },
{ name: "Marco Ruiz", birth: "2004-02-03", gpa: 3.2, major: "Economics", bio: "Soccer fan; learns JS." }
];

// Get references to the form, results container, and error box from the DOM
const form = document.querySelector('#student-form');
const results = document.querySelector('#results');
const errorsBox = document.querySelector('#errors');


/**
 * Render the list of students into the results container.
 * - Clears previous list
 * - Creates <li> for each student
 * - Escapes HTML to prevent injection
 */
function render() {
    results.innerHTML = '';
    students.forEach((s) => {
        const li = document.createElement('li');
        li.className = 'card';
        li.innerHTML = `
            <h3>${escapeHtml(s.name)}</h3>
            <p><strong>Birth:</strong> ${escapeHtml(s.birth)}</p>
            <p><strong>GPA:</strong> ${Number(s.gpa).toFixed(2)}</p>
            <p><strong>Major:</strong> ${escapeHtml(s.major)}</p>
            <p>${escapeHtml(s.bio)}</p>
        `;
        results.appendChild(li);
    });
}

/**
 * Validate the user input before adding a student.
 * Returns an array of error messages.
 */
function validate(data) {
    const errs = [];

    if (!data.name || !data.birth || data.gpaRaw === '' || !data.major || !data.bio) {
        errs.push('All fields are required.');
    }

    if (data.name && data.name.trim().length < 3) {
        errs.push('Name must be at least 3 characters.');
    }

    if (data.gpaRaw !== '') {
        if (Number.isNaN(data.gpa) || data.gpa < 0 || data.gpa > 4) {
            errs.push('GPA must be between 0.00 and 4.00.');
        }
    }
    return errs;
}


/**
 * Escape HTML special characters to prevent XSS.
 */
function escapeHtml(str) {
    return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}


// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const gpaRaw = document.querySelector('#gpa').value.trim();
    const data = {
        name: document.querySelector('#name').value.trim(),
        birth: document.querySelector('#birth').value,
        gpaRaw,
        gpa: parseFloat(gpaRaw),
        major: document.querySelector('#major').value,
        bio: document.querySelector('#bio').value.trim(),
    };

    const errs = validate(data);
    errorsBox.className = '';
    errorsBox.innerHTML = '';

    if (errs.length) {
        errorsBox.className = 'error';
        errorsBox.innerHTML = `<ul>${errs.map(m => `<li>${m}</li>`).join('')}</ul>`;
        return;
    }

    students.push(data);
    form.reset();
    render();
});

// Initial render (show predefined students)
render();
