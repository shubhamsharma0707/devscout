// ==========================================
// DOM Elements & State
// ==========================================
const repoContainer = document.getElementById('repo-container');
const loadingMsg = document.getElementById('loading-msg');
const searchInput = document.getElementById('search-input');
const languageDropdown = document.getElementById('filter-language');
const sortDropdown = document.getElementById('sort-select');

let masterData = [];

// ==========================================
// Fetch repos from GitHub
// ==========================================
async function fetchRepos() {
    try {
        const response = await fetch(
            'https://api.github.com/search/repositories?q=stars:>10000&sort=stars&per_page=30'
        );

        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const data = await response.json();
        masterData = data.items;

        loadingMsg.classList.add('hidden');
        renderCards(masterData);

    } catch (error) {
        console.error('Fetch Error:', error);
        loadingMsg.innerHTML = `<span style="color: var(--fam-yellow);">Failed to load data. Rate limit exceeded? Please try again later.</span>`;
    }
}

// ==========================================
// Render repo cards using .map()
// ==========================================
function renderCards(repositories) {
    if (!repositories || repositories.length === 0) {
        repoContainer.innerHTML = '<p class="text-muted" style="text-align:center; grid-column: 1/-1;">No repositories found. Try adjusting your search.</p>';
        return;
    }

    const htmlCards = repositories.map(repo => {
        const cleanDesc = repo.description
            ? repo.description.substring(0, 100) + '...'
            : 'Explore this codebase on GitHub.';

        return `
            <div class="bento-card">
                <span class="status-badge">${repo.language || 'Code'}</span>
                <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3>
                <p>${cleanDesc}</p>

                <div class="repo-stats">
                    <span title="Stars"> ${repo.stargazers_count.toLocaleString()}</span>
                    <span title="Forks"> ${repo.forks_count.toLocaleString()}</span>
                </div>
            </div>
        `;
    }).join('');

    repoContainer.innerHTML = htmlCards;
}

// ==========================================
// Search, Filter, Sort & Debounce
// ==========================================
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function updateDashboard() {
    let currentData = [...masterData];

    // Search by keyword
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        currentData = currentData.filter(repo => {
            const name = repo.name ? repo.name.toLowerCase() : '';
            const desc = repo.description ? repo.description.toLowerCase() : '';
            return name.includes(searchTerm) || desc.includes(searchTerm);
        });
    }

    // Filter by language
    const selectedLang = languageDropdown.value;
    if (selectedLang !== 'all') {
        currentData = currentData.filter(repo => {
            if (!repo.language) return false;
            return repo.language.toLowerCase() === selectedLang.toLowerCase();
        });
    }

    // Sort remaining results
    const sortValue = sortDropdown.value;
    currentData.sort((a, b) => {
        if (sortValue === 'stars-desc') return b.stargazers_count - a.stargazers_count;
        if (sortValue === 'stars-asc') return a.stargazers_count - b.stargazers_count;
        if (sortValue === 'issues-desc') return b.open_issues_count - a.open_issues_count;
        return 0;
    });

    renderCards(currentData);
}

// Wire up listeners
const debouncedUpdate = debounce(updateDashboard, 300);
searchInput.addEventListener('input', debouncedUpdate);
languageDropdown.addEventListener('change', updateDashboard);
sortDropdown.addEventListener('change', updateDashboard);

// Start the app
fetchRepos();