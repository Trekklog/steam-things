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

    async marketByName(game, games_limit, delay){

        // verify games_limit
        if (Number(games_limit)){
            games_limit = Math.abs(games_limit)
        }
        else{
            games_limit = 1
        }

        if (Number(delay)){
            delay = Math.abs(delay)

            if (delay < 500) {
                console.log("Delay changed to 500")
                delay = 500
            }
        }
        else{
            delay = 1500
        }

        const res = await this.search(game)
        if (res.error) return res
        else{
            if (res.count === 0) return {
                error: 'Cannot find a game with that name.'
            }
            else{

                let items = []

                for (let index = 0; index < games_limit; index++) {
                    await this.wait(delay) // delay between each request

                    if (res.count < index) {
                        return {
                            items,
                            games_count: items.length,
                        }
                    }

                    const market_search = await this.market(res.games[index].game_id)
                    if (market_search.count !== 0) {
                        items.push({
                            game_name: res.games[index].game_name,
                            game_appid: res.games[index].game_id,
                            items: market_search 
                        })
                    }
                }
                return {
                    items,
                    games_count: items.length,
                }
            }
        }
    },

    wait(time){
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), time)
        })
    }
}
