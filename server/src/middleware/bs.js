const bs = require('../bs/index')

module.exports = (app)=>{
    for(const group of bs) {
        for(const api in group) {
            app.post(api, group[api])
        }
    }
}