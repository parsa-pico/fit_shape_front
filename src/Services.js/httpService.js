import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// function setJwt(jwt) {
//   axios.defaults.headers.common["x-auth-token"] = jwt;
// }
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log(error);
    alert("An unexpected error occurrred.");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  // setJwt,
};
