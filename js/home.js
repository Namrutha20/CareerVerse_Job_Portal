// Home page functionality
function searchJobs() {
    const query = document.querySelector('.hero-search-input').value.trim();
    if (query) {
        // Store search query and redirect to jobs page
        localStorage.setItem('searchQuery', query);
        window.location.href = 'jobs.html';
    }
}

function searchCategory(category) {
    localStorage.setItem('searchQuery', category);
    window.location.href = 'jobs.html';
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.hero-search-btn');
    const searchInput = document.querySelector('.hero-search-input');

    if (searchBtn) {
        searchBtn.addEventListener('click', searchJobs);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchJobs();
            }
        });
    }
});