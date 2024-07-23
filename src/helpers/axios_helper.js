import axios from 'axios';

export const getAuthToken = () => {
    const token = window.localStorage.getItem('auth_token');
    console.log('Retrieved token from localStorage:', token); // Vérifiez que le token est bien récupéré
    return token;
};

export const setAuthHeader = (token) => {
    if (token !== null) {
        window.localStorage.setItem("auth_token", token);
    } else {
        window.localStorage.removeItem("auth_token");
    }
};

axios.defaults.baseURL = 'http://localhost:8085';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {
    let headers = {};
    const token = getAuthToken();
    if (token !== null && token !== "null") {
        headers = {'Authorization': `Bearer ${token}`};
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data
    });
};