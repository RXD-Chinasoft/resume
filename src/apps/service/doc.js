
import axios from 'axios';

export const getRequirements = () => {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: "",
        url: "http://192.168.15.116:8000/apis/requirements",
    };
    axios(options).then(response => {
        console.log(response)
    });
}

export const newRequirement = () => {
    const data = {
        requirement: "test1",
        area: "dalian",
        count: 1,
        saler: 101,
        dm: 103,
        priority: 4,
        english: 1,
        rqtype: 4,
        rqstatus: 5,
        client: "san",
        salaryscope: "5000-10000",
        challengetarget: "",
        resumetarget: "",
        turn: 2,
        teamrange: "5000-10000",
        candidate: "ming",
        contact: "12345678932",
        interviewaddr: "xxxxxxxxx",
        projectaddr: "kanban",
        createtime: "20180127",
        descrpition: []
    };
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(data),
        url: "http://192.168.15.116:8000/apis/requirement",
    };
    axios(options).then(response => {
        console.log(response)
    });
}

export const updateRequirement = () => {
    const data = {
        id: 1,
        requirement: "test1",
        area: "dalian",
        count: 1,
        saler: 101,
        dm: 103,
        priority: 4,
        english: 1,
        rqtype: 4,
        rqstatus: 5,
        client: "san",
        salaryscope: "5000-10000",
        challengetarget: "",
        resumetarget: "",
        turn: 2,
        teamrange: "5000-10000",
        candidate: "ming",
        contact: "12345678932",
        interviewaddr: "dalian ligong",
        projectaddr: "kanban",
        createtime: "20180127",
        descrpition: []
    };
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(data),
        url: "http://192.168.15.116:8000/apis/requirementrenewal",
    };
    axios(options).then(response => {
        console.log(response)
    });
}

export const delRequirement = () => {
    const options = {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        url: "http://192.168.15.116:8000/apis/requirement/" + 1,
    };
    axios(options).then(response => {
        console.log(response)
    });
}

export const getDictionaries = () => {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        url: "http://192.168.15.116:8000/apis/dictionaries",
    };
    axios(options).then(response => {
        console.log(response)
    });
}