import axios from "axios";

export const blogService = {
  addBlog,
  showInfoBlog,
  blogList,
  categoryList,
  Delete,
  addPoster,
};

async function addBlog(blog) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
  };
  const body = JSON.stringify(blog);

  return await axios
    .post(`/api/blogs`, body, requestConfig)
    .then(handleResponse);
}
async function addPoster(blog) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
  };
  const body = JSON.stringify(blog);

  return await axios
    .post(`/api/blogs/poster`, body, requestConfig)
    .then(handleResponse);
}
async function showInfoBlog(id) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
  };

  return await axios
    .get(`/api/blogs/${id}`, requestConfig)
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
    .delete(`/api/blogs/${id}`, requestConfig)
    .then(handleResponse);
}
async function blogList() {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
  };

  return await axios.get(`/api/blogs`, requestConfig).then(handleResponse);
}
async function categoryList() {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
  };

  return await axios.get(`/api/cates`, requestConfig).then(handleResponse);
}
function handleResponse(response) {
  let data;
  data = response.data;
  if (response.status === 404) {
    const error = (response && response.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
}
