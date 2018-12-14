const axios = require('axios');

module.exports = {
    getAllCharacters(){
        return axios.get('https://swapi.co/api/people').then(person => {
            return person.data
        })
    }
}