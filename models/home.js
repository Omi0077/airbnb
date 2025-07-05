//core modules
const fs = require('fs')
const path = require('path')

// local modules
const rootDir = require('../utils/pathUtil')


module.exports = class Home {
    constructor(homeName, location, price, rating, imageURL) {
        this.homeName = homeName
        this.location = location
        this.price = price
        this.rating = rating
        this.imageURL = imageURL
    }

    save() {
        Home.getAllHomes((registeredHomes) => {
            registeredHomes.push(this)
            const filePath = path.join(rootDir, 'data', 'homes.json')
            fs.writeFile(filePath, JSON.stringify(registeredHomes), err => {
                console.log(err);
            })
        })
    }

    // to hndle async problem instead of returning this func takes a callback and executes it with data from file
    static getAllHomes(callback) {
        const filePath = path.join(rootDir, 'data', 'homes.json')
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
}