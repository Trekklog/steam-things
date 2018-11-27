const game_items = require('./src/game-items')
const game_search = require('./src/game-search')

module.exports = {
    async search(game){
        const value = await game_search.fetch_store(game)
        return value
    },

    async market(gameAPPID){
        const value = await game_items.getMarketItems(gameAPPID)
        return value
    }
}
