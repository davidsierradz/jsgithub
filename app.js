const GITHUB_API_URL = 'https://api.github.com/';

let githubUsernameButton = document.querySelector('#github-username-button');
let githubUsernameInput;

githubUsernameButton.addEventListener('click', e => {
  githubUsernameInput = document.querySelector('#github-username-input').value;

  fetch(GITHUB_API_URL + 'users/' + githubUsernameInput)
    .then(response => response.json())
    .then(json => {
      document.querySelector('#github-user-span-name').innerHTML = json.name;
      document.querySelector('#github-user-span-company').innerHTML = json.company;
      document.querySelector('#github-user-span-location').innerHTML = json.location;
    });

  fetch(GITHUB_API_URL + 'users/' + githubUsernameInput + '/repos')
    .then(response => response.json())
    .then(json => {
      let githubUserReposTbody = document.querySelector('#github-user-repos-tbody');
      githubUserReposTbody.innerHTML = '';
      json.forEach((repo, index) => {
        githubUserReposTbody.innerHTML +=
          `
            <tr>
              <th scope="row">${index+1}</th>
              <td>${repo.name}</td>
              <td>${repo.language}</td>
            </tr>
          `
      });
    });

  fetch(GITHUB_API_URL + 'users/' + githubUsernameInput + '/following')
    .then(response => response.json())
    .then(json => {
      let githubUserFriendsTbody = document.querySelector('#github-user-friends-tbody');
      githubUserFriendsTbody.innerHTML = '';
      json.forEach((friend, index) => {
        githubUserFriendsTbody.innerHTML +=
          `
            <tr>
              <th scope="row">${index+1}</th>
              <td>${friend.login}</td>
            </tr>
          `
      });
    });
});
