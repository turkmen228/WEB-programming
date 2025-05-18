document.addEventListener('DOMContentLoaded', () => {
    
const openBtn = document.getElementById('open-feedback-btn');
openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

    const toggle = document.getElementById('theme-toggle');
    const cv = document.getElementById('cv-container');
    const savedTheme = localStorage.getItem('theme');
    const currentHour = new Date().getHours();
    const isDayTime = currentHour >= 7 && currentHour < 21;
    const defaultTheme = isDayTime ? 'light' : 'dark';

    function applyTheme(theme) {
        document.body.classList.toggle('dark-theme', theme === 'dark');
        cv.classList.toggle('dark-theme', theme === 'dark');
        toggle.checked = theme === 'dark';
    }

    applyTheme(savedTheme || defaultTheme);

    toggle.addEventListener('change', () => {
        const newTheme = toggle.checked ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });


    const browserInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language
    };
    localStorage.setItem('browserInfo', JSON.stringify(browserInfo));

    const savedBrowserInfo = JSON.parse(localStorage.getItem('browserInfo'));
    const footer = document.getElementById('browser-info');
    if (savedBrowserInfo) {
        footer.innerHTML = `
            <hr>
            <strong>Інформація про браузер:</strong><br>
            User Agent: ${savedBrowserInfo.userAgent}<br>
            Platform: ${savedBrowserInfo.platform}<br>
            Language: ${savedBrowserInfo.language}
        `;
    }

    const variantNumber = 14;
    fetch(`https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('feedback-container');
            data.forEach(comment => {
                const li = document.createElement('li');
                li.classList.add('comment-card');
                li.innerHTML = `<strong>${comment.name}</strong><br>${comment.body}`;
                container.appendChild(li);
            });
        });

    const modal = document.getElementById('feedback-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const form = modal.querySelector('form');

    setTimeout(() => {
        if (!localStorage.getItem('formSeen')) {
            modal.style.display = 'block';
        }
    }, 60000);

    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        localStorage.setItem('formSeen', 'true');
    });

    form.addEventListener('submit', () => {
        localStorage.setItem('formSeen', 'true');
    });
});

