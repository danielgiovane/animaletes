export const api = 'https://dogsapi.origamid.dev/json';

export const TOKEN_POST = (body) => {
  return {
    url: api + '/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  }
}

export const USER_GET = (token) => {
  return {
    url: api + '/api/user',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }
  }
}
