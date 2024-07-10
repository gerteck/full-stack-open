import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
        .catch(error => {
            console.log(error)
        });
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
        .then(response => response.data)
        .catch(error => {
            console.log(error)
        });
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
        .then(response => response.data)
        .catch(error => {
            console.log(error)
        });
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.log(error)
        });
}


// export default {
//     getAll: getAll,
//     create: create,
//     update: update
// }
// cleaner:

export default { getAll, create, update, remove }; 