import axios from 'axios';

export const BASE_URL = "http://192.168.15.116:8000/apis"
export const POST = (url, body = '') => {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(body),
        url: BASE_URL + url,
    };
    console.log("post,", url, body)
    axios(options).then(response => {
        console.log(response)
    });
}

export const PUT = (url, body) => {
    const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(body),
        url: BASE_URL + url,
    };
    axios(options).then(response => {
        console.log(response)
    });
}

export const DELETE = (url, body) => {
    const options = {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(body),
        url: BASE_URL + url,
    };
    axios(options).then(response => {
        console.log(response)
    });
}