import axios from 'axios'

const instans = axios.create ({
    baseURL: 'https://api.chucknorris.io/jokes/random',
})
export const JokeAPI = {
    giveMeJoke() {
        return instans.get(``)
            .then(response => {
                return response.data
            })
    }
}
