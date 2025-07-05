const Home = require('../models/home')


exports.getHomePage = (req, res, next) => {
        Home.getAllHomes((registeredHomes)=>{
            res.render('store/index', {registeredHomes: registeredHomes , pageTitle: 'airbnb Home', currPage: 'homePage'})
        }
    )
    //getAllHomes takes a callback and executes it with data from file

    // res.sendFile(path.join(rootDir, 'views', 'home.html'))
    
}

exports.getBookingsPage = (req, res, next)=>{
    Home.getAllHomes((registeredHomes)=>{
        res.render('store/bookings', {registeredHomes: registeredHomes, pageTitle: 'Your Bookings', currPage: 'bookings'})
    })
}

exports.getFavPage = (req, res, next)=>{
    Home.getAllHomes((registeredHomes)=>{
        res.render('store/favList', {registeredHomes: registeredHomes, pageTitle: 'Favourites', currPage: 'favList'})
    })
}

exports.getListPage = (req, res, next)=>{
    Home.getAllHomes((registeredHomes)=>{
        res.render('store/homeList', {registeredHomes: registeredHomes, pageTitle: 'All Homes', currPage: 'homeList'})
    })
}

exports.getHomeDetailPage = (req, res, next)=>{
    const homeID = req.params.homeID
    Home.findHome(homeID, (home)=>{
        res.render('store/homeDetail', {home: home, pageTitle: 'Details', currPage: 'homeDetailPage'})
    })
}