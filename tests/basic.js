const s_things = require('../index.js')

const test = {
    game: 'Life is strange',
    appid: 319630 // 319630 = Life is Strange
}


// search market item for a given APPID
s_things.market(test.game).then(items => {
     // check for an error, if there is no error print the result
    if (items.error) console.log(items.error)
    else{
        console.log(items.items)
        console.log(items.count)
    }

}).catch(err => {
    console.log(`[ERR - Market] ${err.name} -- ${err.message}`)
})


// search games with the given input
s_things.search(test.appid).then(games => {
    //  check for an error, if there is no error print the result
    if (games.error) console.log(games.error)
    else{
        console.log(games)
    }
}).catch(err => {
    console.log(`[ERR - Search] ${err.name} -- ${err.message}`)
})


// search market items for one or more games
// game_limit and delay can be used too, but those fields are optional
s_things.marketByName(game=test.game, games_limit=1, delay=1500).then(res => {
    if (res.error) console.log(res.error)
    else{
        console.log(res.items)
        console.log(res.games_count)
    }
}).catch(err => {
         console.log(`[ERR - marketByName] ${err.name} -- ${err.message}`)
})
    