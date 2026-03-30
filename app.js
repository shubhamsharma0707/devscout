// ==========================================
// Grab elements we'll be working with
// ==========================================
const repoContainer = document.getElementById('repo-container');
const loadingMsg = document.getElementById('loading-msg');
const themeToggleBtn = document.getElementById('theme-toggle');

// Keeping fetched repos here so we can sort/filter later
let masterData = [];

// ==========================================
// Hit the GitHub API and grab some repos
// ==========================================
async function fetchRepos() {
    try {
        // Asking for 20 JS repos sorted by stars - gives us a solid dataset
        const response = await fetch(
            'https://api.github.com/search/repositories?q=language:javascript&sort=stars&per_page=20'
        );

        if (!response.ok) {
            throw new Error(`GitHub API responded with ${response.status}`);
        }

        const data = await response.json();
        masterData = data.items;

        // Data's here, ditch the spinner and show the goods
        loadingMsg.classList.add('hidden');
        renderCards(masterData);

    } catch (err) {
        console.error('Something went wrong fetching repos:', err);
        loadingMsg.innerHTML = `
            <p>Failed to load data. Rate limit exceeded?<br>Please try again later.</p>
        `;
    }
}

// ==========================================
// Turn repo data into HTML cards
// ==========================================
function renderCards(repos) {
    // If we got nothing back, show a friendly message
    if (!repos || repos.length === 0) {
        repoContainer.innerHTML = '<p class="no-results">No repositories matched your search.</p>';
        return;
    }

    // Using .map() here - no for loops, just functional style
    const cardsHTML = repos.map(repo => {
        // Trim down long descriptions so the cards stay tidy
        const shortDesc = repo.description
            ? repo.description.substring(0, 110) + '...'
            : 'Explore this codebase on GitHub.';

        return `
            <div class="card">
                <div class="card-header">
                    <h3>
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                            ${repo.name}
                        </a>
                    </h3>
                    <span class="lang-tag">${repo.language || 'Code'}</span>
                </div>

                <p class="card-desc">${shortDesc}</p>

                <div class="card-stats">
                    <span title="Stars"> ${repo.stargazers_count.toLocaleString()}</span>
                    <span title="Forks"> ${repo.forks_count.toLocaleString()}</span>
                    <span title="Open Issues"> ${repo.open_issues_count.toLocaleString()}</span>
                </div>
            </div>
        `;
    }).join('');

    // Slap it all into the container at once
    repoContainer.innerHTML = cardsHTML;
}

// ==========================================
// Dark mode toggle
// ==========================================
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeToggleBtn.innerText = ' Toggle Light Mode';
    } else {
        themeToggleBtn.innerText = ' Toggle Dark Mode';
    }
});

// ==========================================
// Kick things off
// ==========================================
fetchRepos();
