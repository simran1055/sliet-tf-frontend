import { API } from "../../backend"


export const createCoordinator = (userId, token, coordinator) => {
    return fetch(`${API}/coordinator/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: coordinator
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getCoordinators = () => {
    return fetch(`${API}/coordinators`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const getCoordinator = (CoordinatorId, token) => {
    return fetch(`${API}/coordinator/${CoordinatorId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",

            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const updateCoordinator = (coordinatorId, token, data) => {
    return fetch(`${API}/coordinator/${coordinatorId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
