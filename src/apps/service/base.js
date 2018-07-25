import axios from 'axios';

export const BASE_URL = "http://192.168.15.100/apis"
export const POST = (url, body = '') => {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(body),
        url: BASE_URL + url,
    };
    console.log("post,", url, body)
    return axios(options)
}

export const POSTFORM = (url, formData) => {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: formData,
        url: BASE_URL + url,
    };
    console.log("post,", url, formData)
    return axios(options)
}

export const PUT = (url, body) => {
    const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(body),
        url: BASE_URL + url,
    };
    return axios(options)
}

export const DELETE = (url, body) => {
    const options = {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(body),
        url: BASE_URL + url,
    };
    return axios(options)
}