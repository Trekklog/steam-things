const game_items = require('./src/game-items')
const game_search = require('./src/game-search')

module.exports = {
    async search(game){

        if (!game) {
            return {
                error: 'You must enter a game name.'
            }
        }

        if (String(game).length > 40) {
            return {
                error: `Lenght limit is 40 characters.`
            }
        }

        const value = await game_search.fetch_store(game)
        return value
    },

    async market(gameAPPID){

        if (!gameAPPID) {
            return {
                error: 'You must enter a Game APPID.'
            }
        }

        if (!Number(gameAPPID)) {
            return {
                error: `'${gameAPPID}' is not a Game APPID.`
            }
        }

        const value = await game_items.getMarketItems(gameAPPID)
        return value
    },

    async marketByName(game){
        const res = await this.search(game)
        if (res.error) return res
        else{
            if (res.count === 0) return {
                error: 'Cannot find a game with that name.'
            }
            else{
                const items = this.market(res.games[0].game_id)
                return items
            }
        }
    }
}
