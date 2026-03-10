function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('jp_current_user');
    localStorage.removeItem('appliedJobs');
    window.location.href = 'index.html';
}

function checkLogin() {
    if (!localStorage.getItem('user')) {
        window.location.href = 'index.html';
    }
}

// Call checkLogin on pages that require login
if (window.location.pathname.includes('home.html') || 
    window.location.pathname.includes('jobs.html') || 
    window.location.pathname.includes('profile.html') || 
    window.location.pathname.includes('applied.html')) {
    checkLogin();
}