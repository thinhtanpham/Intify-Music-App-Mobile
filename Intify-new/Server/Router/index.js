const MusicRouter= require('./MusicRouter')
const UserRouter= require('./UserRouter')

function router (app) {

    app.use('/', MusicRouter)
    app.use('/account', UserRouter)
}

module.exports = router