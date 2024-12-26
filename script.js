async function fetchUser() {
    const username = document.getElementById('username').value.trim();
    const profileDiv = document.getElementById('profile');

    if (!username) {
        alert('Please enter a GitHub username');
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error('User not found!');
        }
        const userData = await response.json();

        profileDiv.innerHTML = `
            <img src="${userData.avatar_url}" alt="Avatar">
            <h2>${userData.login}</h2>
            <ul>
                <li>Followers: ${userData.followers}</li>
                <li>Following: ${userData.following}</li>
                <li>Repositories: ${userData.public_repos}</li>
            </ul>
        `;
        profileDiv.style.display = 'block';
    } catch (error) {
        console.error(error);
        profileDiv.innerHTML = `<p>${error.message || 'Something went wrong. Please try again.'}</p>`;
        profileDiv.style.display = 'block';
    }
}
