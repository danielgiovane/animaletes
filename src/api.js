export const api = "https://dogsapi.origamid.dev/json";

export const TOKEN_POST = (body) => {
  return {
    url: api + "/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
};

export const TOKEN_VALIDATE_POST = (token) => {
  return {
    url: api + "/jwt-auth/v1/token/validate",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
};

export const USER_GET = (token) => {
  return {
    url: api + "/api/user",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
};

export const USER_POST = (body) => {
  return {
    url: api + "/api/user",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
};

export const PHOTO_POST = (formData, token) => {
  return {
    url: api + "/api/photo",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    },
  };
};

export const PHOTOS_GET = ({ page, total, usuario }) => {
  return {
    url: `${api}/api/photo/?_page=${page}&_total=${total}&_user=${usuario}`,
    options: {
      method: "GET",
      cache: "no-store",
    },
  };
};

export const PHOTO_GET = (id) => {
  return {
    url: `${api}/api/photo/${id}`,
    options: {
      method: "GET",
      cache: "no-store",
    },
  };
};
