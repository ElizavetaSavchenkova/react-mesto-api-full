export const url = 'https://auth.nomoreparties.co';


function checkResponse(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
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

export const getInfoToken = (token) => {
  return fetch(`${url}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
