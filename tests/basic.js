const s_things = require('../index.js')


// 319630 = Life is Strange
s_things.market(319630).then(items => {
    console.log(items.count)
    // 37
    console.log(items.items)

}).catch(err => {
    console.log(`[ERR - Market] ${err.name} -- ${err.message}`)
})

// s_things.search('Life is Strange').then(games => {
//     console.log(games)
// }).catch(err => {
//     console.log(`[ERR - Search] ${err.name} -- ${err.message}`)
// })
