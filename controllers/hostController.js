//local modules
const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'addHome.html'))
    res.render('host/addHome', {pageTitle: 'Add you home', currPage: 'addHomePage'})
}

exports.postAddHome = (req, res, next) => {
    console.log(req.body.home);
    // registeredHomes.push({"homeName":req.body.home})
    const {homeName, location, price, rating, imageURL} = req.body
    const home = new Home(homeName, location, price, rating, imageURL)
    home.save()
    // res.sendFile(path.join(rootDir, 'views', 'homeAdded.html'))
    res.render('host/homeAdded', {pageTitle: 'Home added', currPage: 'addHomePage'})
}

exports.getHostHomeList = (req, res, next)=>{
    Home.getAllHomes((registeredHomes)=>{
        res.render('host/hostHomeList', {registeredHomes: registeredHomes, pageTitle: 'Your Homes', currPage: 'hostHomeList'})
    })
}

exports.getEditHome = (req, res, next)=>{
    res.render('host/editHome', {pageTitle: 'Edit Home', currPage: 'editHomePage'})
}