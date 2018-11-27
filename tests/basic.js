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


// search market items for specific game, first element that matches with the input will be used
s_things.marketByName(test.game).then(res => {
    if (res.error) console.log(res.error)
    else{
        console.log(res.items)
        console.log(res.count)
    }
}).catch(err => {
         console.log(`[ERR - marketByName] ${err.name} -- ${err.message}`)
})
    