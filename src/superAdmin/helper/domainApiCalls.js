import { API } from "../../backend"


export const createDomain = (userId, token, domain) => {
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
