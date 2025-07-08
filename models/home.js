//core modules
const fs = require('fs')
const path = require('path')

// local modules
const rootDir = require('../utils/pathUtil')
const Favourite = require('./favourites')

const filePath = path.join(rootDir, 'data', 'homes.json')

module.exports = class Home {
    constructor(homeName, location, price, rating, imageURL) {
        this.homeName = homeName
        this.location = location
        this.price = price
        this.rating = rating
        this.imageURL = imageURL
        this.homeID = Math.random()
    }

    static homeCount = 0  // this gets reset to 0 every time server restarts

    save() {
        Home.getAllHomes((registeredHomes) => {
            registeredHomes.push(this)
            fs.writeFile(filePath, JSON.stringify(registeredHomes), err => {
                console.log(err);
            })
        })
    }

    // to hndle async problem instead of returning this func takes a callback and executes it with data from file
    static getAllHomes(callback) {
        fs.readFile(filePath, 'utf-8', (err, content) => {
            if (err) {
                console.error('Error reading homes.json:', err.message);
                return callback([]);
            }

            try {
                // If file is empty or only whitespace, fallback to []
                const homes = content.trim() === "" ? [] : JSON.parse(content);
                callback(homes);
            } catch (parseErr) {
                console.error('Error parsing homes.json:', parseErr.message);
                callback([]);
            }
        })
        // return registeredHomes
    }

    // again taking callback to handle async file reading
    static findHome(homeID, callback){
        Home.getAllHomes((registeredHomes)=>{
            // registeredHomes.forEach(home => {
            //     if(home.homeID == homeID){
            //         callback(home)
            //         // return home
            //     }
            // });
            const homeFound = registeredHomes.find(home => home.homeID === Number(homeID))
            callback(homeFound)
        })
    }

    static updateHome(newHome, callback){
       Home.getAllHomes((registeredHomes)=>{
        const homeToBeEdited = registeredHomes.find(home => home.homeID === Number(newHome.homeID))
        Object.assign(homeToBeEdited, newHome)
        // console.log(registeredHomes);
        fs.writeFile(filePath, JSON.stringify(registeredHomes), callback)
       })
    }

    static deleteHome(homeIDToDelete, callback){
        Home.getAllHomes((registeredHomes)=>{
            const index = registeredHomes.findIndex(home => home.homeID === Number(homeIDToDelete))
            if(index !== -1){
                registeredHomes.splice(index,1)
            }
            fs.writeFile(filePath, JSON.stringify(registeredHomes), err =>{
                if(err){
                    console.log('error writing file',err);
                }
                else{
                    Favourite.deleteFavourite(homeIDToDelete, callback)
                }
            })
        })
    }
}