import axios from 'axios'

export const register = (username, password) => (dispatch) => {
    console.log(username, password)
    const form = { username, password }
    axios.post('http://localhost:5000/signup', form).then(res => {
        console.log(res)
        if (res.data.success) {
            console.log('register complete')
        }
    }).catch(err => {
        console.error(err)
    })
}

export const login = (username, password) => (dispatch) => {
    const form = { username, password }
    axios.post('/login', form).then(res => {
        console.log(res)
        if (res.data.success) {
            console.log('register complete')
        }
    }).catch(err => {
        console.error(err)
    })
}