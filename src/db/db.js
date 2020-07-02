import './idb'

const idb = require("./idb")

const dbPromised = idb.open("football-catalogue", 1, (upgradeDb) =>{
    let footballObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    })
    footballObjectStore.createIndex("name", "name", {unique:false})
})


class IndexedDB{
    static saveFavorite(team){
        dbPromised
        .then((db) =>{
            const tx = db.transaction("teams", "readwrite")
            const store = tx.objectStore("teams")
            store.put(team)
            return tx.complete
        })
        .then(() =>{
            console.log("Team add succesfully")
        })
    }

    static getAll(){
        return new Promise((resolve, reject) =>{
            dbPromised
            .then((db) =>{
                const tx = db.transaction("teams", "readonly")
                const store = tx.objectStore("teams")
                return store.getAll()
            })
            .then((teams) =>{
                resolve(teams)
            })
        })
    }

    static getById(id){
        return new Promise((resolve, reject) =>{
            dbPromised
            .then((db) =>{
                const tx = db.transaction("teams", "readonly")
                const store = tx.objectStore("teams")
                return store.get(id)
            })
            .then((items) =>{
                resolve(items)
            })
        })
    }

    static deleteTeam(id){
        dbPromised
            .then((db) =>{
                const tx = db.transaction("teams", "readwrite")
                const store = tx.objectStore("teams")
                store.delete(id)
                return tx.complete
            })
            .then(() =>{
                console.log("Team delete succesfully")
            })
    }
}

export default IndexedDB