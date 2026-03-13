



export const postFetch = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(response.status === 401) {
        localStorage.clear();
        window.location.href = '/admin/login';
        return;
    }

    if(!response.ok) {
        const message = await response.text();
        throw new Error(message || response.statusText);
    }

    return response.json();
};


export const getFetch = async (url, query = {}) => {
    const searchParams = new URLSearchParams(query).toString();
    const response = await fetch(url + (searchParams ? '?' + searchParams : ''), {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    });

    if(response.status === 401) {
        localStorage.clear();
        window.location.href = '/admin/login';
        return;
    }

    if(!response.ok) {
        const message = await response.text();
        throw new Error(message || response.statusText);
    }

    return response.json();
};


export const putFetch = async (url, data) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(response.status === 401) {
        localStorage.clear();
        window.location.href = '/admin/login';
        return;
    }

    if(!response.ok) {
        const message = await response.text();
        throw new Error(message || response.statusText);
    }

    return response.json();
};

export const deleteFetch = async (url) => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    });

    if(response.status === 401) {
        localStorage.clear();
        window.location.href = '/admin/login';
        return;
    }

    if(!response.ok) {
        const message = await response.text();
        throw new Error(message || response.statusText);
    }

    return response.json();
};