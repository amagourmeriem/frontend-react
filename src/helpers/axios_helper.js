import axios from 'axios';

// Fonction pour obtenir le token d'authentification
export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

// Fonction pour configurer l'en-tête d'autorisation
export const setAuthHeader = (token) => {
    if (token !== null) {
        window.localStorage.setItem("auth_token", token);

    } else {
        window.localStorage.removeItem("auth_token");
    }
};

// Configuration de base d'axios
axios.defaults.baseURL = 'http://localhost:8085';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Intercepteur de requête pour ajouter le token d'autorisation
axios.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log('Token ajouté aux en-têtes :', config.headers['Authorization']);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Fonction pour faire des requêtes HTTP classiques
export const request = (method, url, data) => {
    return axios({
        method: method,
        url: url,
        data: data
    });
};

// Fonction pour faire des requêtes avec des fichiers (par exemple, des images)
export const requestWithFile = (method, url, data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });

    return axios({
        method: method,
        url: url,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

};

export const setupAuthInterceptor = (setIsAuthenticated) => {
    axios.interceptors.response.use(
        (response) => {
            if (response && response.data.token) {
                setAuthHeader(response.data.token);
                setIsAuthenticated(true); // Mise à jour de isAuthenticated ici
            }
            return response;
        },
        (error) => Promise.reject(error)
    );
};
