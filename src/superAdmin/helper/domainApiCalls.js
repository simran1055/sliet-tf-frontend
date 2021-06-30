import { API } from "../../backend"


export const createDomain = (userId, token, domain) => {

    console.log(domain.studentCoordinator)

    return fetch(`${API}/domain/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: domain
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getdomains = () => {
    return fetch(`${API}/domains`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const getDomain = (DomainId) => {
    return fetch(`${API}/domain/${DomainId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",

        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
