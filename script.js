document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubRepos();
    initMobileMenu();
});

// GitHub Integration
async function fetchGitHubRepos() {
    const username = 'BrahimB88';
    const container = document.getElementById('github-repos');
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=6`);
        
        if (!response.ok) throw new Error('Failed to fetch repositories');
        
        const repos = await response.json();
        
        // Clear loading spinner
        container.innerHTML = '';
        
        if (repos.length === 0) {
            container.innerHTML = '<p class="text-center">No public repositories found.</p>';
            return;
        }

        repos.forEach(repo => {
            // Filter out forks if desired, or keep all
            if (!repo.fork) {
                const card = createRepoCard(repo);
                container.appendChild(card);
            }
        });

    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        container.innerHTML = `<p class="text-center">Unable to load repositories. <a href="https://github.com/${username}" target="_blank">View on GitHub</a></p>`;
    }
}

function createRepoCard(repo) {
    const div = document.createElement('div');
    div.className = 'repo-card';
    
    const description = repo.description ? 
        (repo.description.length > 100 ? repo.description.substring(0, 100) + '...' : repo.description) : 
        'No description available.';

    const langColor = getLanguageColor(repo.language);
    
    div.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p>${description}</p>
        <div class="repo-meta">
            ${repo.language ? `<span><span class="repo-lang-color" style="background-color: ${langColor}"></span>${repo.language}</span>` : ''}
            <span>★ ${repo.stargazers_count}</span>
            <span>⑂ ${repo.forks_count}</span>
        </div>
    `;
    
    return div;
}

function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Java': '#b07219',
        'TypeScript': '#2b7489',
        'C++': '#f34b7d',
        'C': '#555555'
    };
    return colors[language] || '#858585';
}

// Mobile Menu (Simple Toggle)
function initMobileMenu() {
    // Note: For this simplified implementation, we'll assume the desktop layout handles standard cases.
    // Enhanced mobile menu toggling can be added if the user requests a drawer interaction.
    // Currently CSS media queries handle basic stacking.
}
