//local modules
const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'addHome.html'))
    res.render('addHome', {pageTitle: 'Add you home', currPage: 'addHomePage'})
}

exports.postAddHome = (req, res, next) => {
    console.log(req.body.home);
    // registeredHomes.push({"homeName":req.body.home})
    const {homeName, location, price, rating, imageURL} = req.body
    const home = new Home(homeName, location, price, rating, imageURL)
    home.save()
    // res.sendFile(path.join(rootDir, 'views', 'homeAdded.html'))
    res.render('homeAdded', {pageTitle: 'Home added', currPage: 'addHomePage'})
}

exports.getHomePage = (req, res, next) => {
        Home.getAllHomes((registeredHomes)=>{
            res.render('home', {registeredHomes: registeredHomes , pageTitle: 'airbnb Home', currPage: 'homePage'})
        }
    )
    //getAllHomes takes a callback and executes it with data from file

    // res.sendFile(path.join(rootDir, 'views', 'home.html'))
    
}

// exports.registeredHomes = registeredHomes