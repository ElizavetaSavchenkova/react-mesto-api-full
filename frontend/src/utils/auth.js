export const url = 'https://api.mestoliza.students.nomoredomains.sbs';

function checkResponse(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка auth utlis frontend: ${res.status}`);
}

export const registerUser = ({email, password}) => {
  return fetch(`${url}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(checkResponse)

};

export const authorizeUser = ({email, password}) => {
  return fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(checkResponse);
}

export const getInfoToken = (jwt) => {
  return fetch(`${url}/users/me`, {
    method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
  }).then(checkResponse);
};
