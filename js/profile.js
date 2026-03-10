function loadProfile() {
    // Personalize profile from stored user, if available
    try {
        const stored = localStorage.getItem('jp_current_user') || localStorage.getItem('user');
        if (stored) {
            const user = JSON.parse(stored);
            const nameEl = document.querySelector('.profile-info h2');
            const headlineEl = document.querySelector('.profile-info p:nth-of-type(1)');
            const emailEl = document.querySelector('.profile-info p:nth-of-type(2)');
            const descriptionEl = document.getElementById('userDescription');
            const skillsContainer = document.getElementById('userSkills');

            if (nameEl && user.fullName) {
                nameEl.textContent = user.fullName;
            }
            if (headlineEl && user.headline) {
                headlineEl.textContent = user.headline;
            } else if (headlineEl && user.role === 'recruiter') {
                headlineEl.textContent = 'Hiring talent';
            }
            if (emailEl && user.email) {
                emailEl.textContent = user.email;
            }

            if (descriptionEl && user.role) {
                if (user.role === 'job-seeker') {
                    descriptionEl.textContent = 'Active job seeker exploring opportunities tailored to my skills and experience.';
                } else if (user.role === 'recruiter') {
                    descriptionEl.textContent = 'Recruiter using this portal to discover top talent and manage open roles efficiently.';
                }
            }

            if (skillsContainer && user.skills) {
                const skills = String(user.skills)
                    .split(',')
                    .map(s => s.trim())
                    .filter(Boolean);
                if (skills.length) {
                    skillsContainer.innerHTML = skills
                        .map(skill => `<span class="skill-badge">${skill}</span>`)
                        .join('');
                }
            }
        }
    } catch (e) {
        console.error('Failed to load dynamic profile', e);
    }

    // Load resume status from localStorage
    const resumeFile = localStorage.getItem('resumeFile');
    if (resumeFile) {
        document.getElementById('resumeStatus').textContent = `Resume uploaded: ${resumeFile}`;
    }
}

document.getElementById('resumeInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        // In a real app, you'd upload to a server. Here we just store the filename.
        localStorage.setItem('resumeFile', file.name);
        document.getElementById('resumeStatus').textContent = `Resume uploaded: ${file.name}`;
        alert('Resume uploaded successfully!');
    }
});

loadProfile();