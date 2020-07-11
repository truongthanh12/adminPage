import axios from "axios";

export const userService = {
  login,
  getMe,
  getUsers,
  getUser,
  Register,
  detailModal,
  Delete,
};

async function login(user) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(user);

  return await axios
    .post(`/api/auth/login`, body, requestConfig)
    .then(handleResponse);
}

function handleResponse(response) {
  let data;
  data = response.data;
  if (response.status === 404) {
    const error = (response && response.message) || response.statusText;
    return Promise.reject(error);
  }
  if (data.msg) {
    return data.msg;
  }
  return data;
}

async function getMe() {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
  };
  return await axios.get(`/api/auth/getMe`, requestConfig).then(handleResponse);
}

async function getUsers() {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
  };
  return await axios.get(`/api/users`, requestConfig).then(handleResponse);
}

async function getUser(id) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
  };
  return await axios.get(`/api/user/${id}`, requestConfig).then(handleResponse);
}
async function Register(user) {
  const body = JSON.stringify(user);
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
  };
  return await axios
    .post(`/api/auth/register`, body, requestConfig)
    .then(handleResponse);
}
async function Delete(id) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
  };
  return await axios
    .delete(`/api/users/${id}`, requestConfig)
    .then(handleResponse);
}
async function detailModal(id) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
  };
  return await axios
    .get(`/api/users/${id}`, requestConfig)
    .then(handleResponse);
}
