const GITHUB_API_URL = 'https://api.github.com/';

let jsonResource;

let githubUsernameButton = document.querySelector('#github-username-button');
let githubUsernameInput;

githubUsernameButton.addEventListener('click', function(e) {
  githubUsernameInput = document.querySelector('#github-username-input').value;

  fetch(GITHUB_API_URL + 'users/' + githubUsernameInput)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      jsonResource = json;
      document.querySelector('#github-user-span-name').innerHTML = jsonResource.name;
      document.querySelector('#github-user-span-company').innerHTML = jsonResource.company;
      document.querySelector('#github-user-span-location').innerHTML = jsonResource.location;
    });

  fetch(GITHUB_API_URL + 'users/' + githubUsernameInput + '/repos')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let githubUserReposTbody = document.querySelector('#github-user-repos-tbody');
      githubUserReposTbody.innerHTML = '';
      json.forEach(function(repo, index) {
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
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let githubUserFriendsTbody = document.querySelector('#github-user-friends-tbody');
      githubUserFriendsTbody.innerHTML = '';
      json.forEach(function(friend, index) {
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
