// core modules
const fs = require('fs')
const path = require('path')

// local modules
const rootDir = require('../utils/pathUtil')
// const Home = require('./home')


const filePath = path.join(rootDir, 'data', 'favourites.json')

// since jsut storing one data in model next time just use static methods with simple array
module.exports = class Favourite {
    constructor(homeID) {
        this.homeID = homeID
    }

    static getFavourites(callback) {
        fs.readFile(filePath, 'utf-8', (err, content) => {
            if (err) {
                console.log('Error reading file', err);
                return callback([])
            }
            if (content) {
                try {
                    const homes = content.trim() === "" ? [] : JSON.parse(content)
                    callback(homes)
                } catch (parseErr) {
                    console.log("error parsing favourites.json", parseErr);
                    callback([])
                }
            }
        })
    }

    addFavourite() {
        Favourite.getFavourites((favHomes) => {
            let isFav = false
            favHomes.forEach(home => {
                if (home.homeID === this.homeID) {
                    console.log('it already favourite');
                    isFav = true
                }
            });
            if (!isFav) {
                favHomes.push(this)
                fs.writeFile(filePath, JSON.stringify(favHomes), err => {
                    console.log(err);
                })
            }
        })
    }
}