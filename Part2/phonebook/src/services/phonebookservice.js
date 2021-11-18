import axios from 'axios'

const BASE_URL = `http://localhost:3001/persons`

const getAll = () => {
    const response = axios.get(BASE_URL)
    return response.then(res => res.data)
}

const create = (name, number) => {
    const response = axios.post(BASE_URL, { name, number })
    return response.then(res => res.data)
}

const remove = (id) => {
    const response = axios.delete(`${BASE_URL}/${id}`)
    return response.then(res => res)
}

const update = (id, number, name) => {
    const response = axios.put(`${BASE_URL}/${id}`, { number, name })
    return response.then(res => res.data)

}

const phonebookService = { getAll, create, remove, update }

export default phonebookService