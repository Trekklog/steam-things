const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require('node-fetch')

// map -- async f(fetch_store) > f(get_game_appid)

module.exports ={
    async fetch_store(game){

        let games = []

        const url = `https://store.steampowered.com/search/suggest?term=${game}&f=games`

        const check_store = await fetch(url)
        const res = await check_store.text()

        const dom = new JSDOM(res).window.document

        const games_found = dom.querySelectorAll('.ds_collapse_flag')

        if (games_found.length >= 1) {
            games_found.forEach(game => {

                const game_dom = new JSDOM(game.innerHTML).window.document
    
                const game_name = game_dom.querySelector('.match_name').textContent
                const game_img = game_dom.querySelector('.match_img img').src
                const game_price = game_dom.querySelector('.match_price').textContent
                const game_id = this.get_game_appid(game_img)
    
                games.push({
                    game_name, game_price, game_img, game_id
                })
            })
        }

        return {
            count: games.length,
            games
        }
    },

    get_game_appid(link){
        const reg = /\/(\d+)\//
        return link.match(reg)[0].slice(1, -1)
    }
}
