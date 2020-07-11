import axios from "axios";

export const ContactService = {
  contacts,
};

function handleResponse(response) {
  let data;
  data = response.data;
  if (response.status === 404) {
    const error = (response && response.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
}

async function contacts() {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
  };
  return await axios.get(`/api/contacts`, requestConfig).then(handleResponse);
}
