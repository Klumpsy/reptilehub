import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    let token = parts.pop().split(';').shift();
    return decodeURIComponent(token);
  }
  return null;
}

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Accept": 'application/json',
    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
  },
});

export const csrf = async () => {
  return await axiosClient.get("/sanctum/csrf-cookie");
};

export default axiosClient;