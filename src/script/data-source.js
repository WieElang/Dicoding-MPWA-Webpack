import IndexedDB from '../db/db'

const base_url = "https://api.football-data.org/v2/"
const api_key = "4b14af2fc5b44de6ba55b1b0ea3dd582"
const method = {
    method: "GET",
    headers: {
        "X-Auth-Token": api_key
    }
}

class DataSource{
    static getCompetitions(){
        return new Promise(function(resolve, reject){
            fetch(`${base_url}competitions/2001/standings?standingType=TOTAL`,method)
            .then(response =>{
                return response.json()
            })
            .then(responseJson =>{
                resolve(responseJson)
            })
            .catch(error =>{
                reject(error)
            })
        })
    }

    static getTeams(){
        return new Promise(function(resolve, reject){
            fetch(`${base_url}teams`,method)
            .then(response =>{
                return response.json()
            })
            .then(responseJson =>{
                resolve(responseJson.teams)
            })
            .catch(error =>{
                reject(error)
            })
        })
    }

    static getTeamsById(idParam){
        return new Promise(function(resolve, reject){
            fetch(`${base_url}teams/${idParam}`,method)
            .then(response =>{
                return response.json()
            })
            .then(responseJson =>{
                resolve(responseJson)
            })
            .catch(error =>{
                reject(error)
            })
        })
    }

    static getFavorite(){
        return IndexedDB.getAll()
        .then(teams =>{
            return Promise.resolve(teams)
        })
        .catch(error =>{
            return Promise.reject(error)
        })
    }

    static getFavoriteById(idParam){
        return IndexedDB.getById(Number(idParam))
        .then(data =>{
            return Promise.resolve(data)
        })
        .catch(error =>{
            return Promise.reject(error)
        })
    }
}

export default DataSource