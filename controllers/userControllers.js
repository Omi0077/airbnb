const Favourite = require('../models/favourites')
const Home = require('../models/home')



exports.getHomePage = (req, res, next) => {
    Home.getAllHomes((registeredHomes) => {
        res.render('store/index', { registeredHomes: registeredHomes, pageTitle: 'airbnb Home', currPage: 'homePage' })
    }
    )
    //getAllHomes takes a callback and executes it with data from file

    // res.sendFile(path.join(rootDir, 'views', 'home.html'))

}

exports.getBookingsPage = (req, res, next) => {
    Home.getAllHomes((registeredHomes) => {
        res.render('store/bookings', { registeredHomes: registeredHomes, pageTitle: 'Your Bookings', currPage: 'bookings' })
    })
}

exports.getFavPage = (req, res, next) => {
    Favourite.getFavourites(async (favHomes) => {
        // const favHomeList = []
        // favHomes.forEach(home => {
        //     Home.findHome(home.homeID , (homeObj)=>{
        //         favHomeList.push(homeObj)
        //     })
        // });
        const favHomeList = await Promise.all(favHomes.map(async (home) => {
            return new Promise((resolve, reject) => {
                Home.findHome(home.homeID, (homeObj) => {
                    if (homeObj) resolve(homeObj);
                    else reject(`Home with ID ${home.homeID} not found`);
                })
            })

        }))
        // console.log(favHomeList, 'lol');
        res.render('store/favList', { favHomeList: favHomeList, pageTitle: 'Favourites', currPage: 'favList' })
    })
}

exports.getListPage = (req, res, next) => {
    Home.getAllHomes((registeredHomes) => {
        res.render('store/homeList', { registeredHomes: registeredHomes, pageTitle: 'All Homes', currPage: 'homeList' })
    })
}

exports.getHomeDetailPage = (req, res, next) => {
    const homeID = req.params.homeID
    Home.findHome(homeID, (home) => {
        if (!home) {
            res.redirect('/')
            console.log('home not found in db');
        }
        else {
            res.render('store/homeDetail', { home: home, pageTitle: 'Details', currPage: 'homePage' })
        }
    })
}

exports.postFavPage = (req, res, next) => {
    const favHomeID = req.body.homeID
    console.log(favHomeID);
    const favHome = new Favourite(favHomeID)
    favHome.addFavourite()
    res.redirect('/favourites')
}