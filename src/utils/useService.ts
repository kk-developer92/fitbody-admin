import axios from "axios";

export function parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}

export default (service: string) => {
    const url = `${import.meta.env.VITE_API_URL}/${service}`;
    const token = useCookie('token');
    
    const config = {
        headers: {
            Authorization: token.value
        }
    };
    
    return {
        create(data: any) {
            return axios.post(url, data, config);
        },
        find(params?: any) {
            return axios.get(url, {
                params: {
                    query: params
                },
                ...config
            });
        },
        get(id: string) {
            return axios.get(`${url}/${id}`, config);
        },
        patch(id: string, data: any) {
            return axios.patch(`${url}/${id}`, data, config);
        },
        delete(id: string) {
            return axios.delete(`${url}/${id}`, config);
        }
    };
}