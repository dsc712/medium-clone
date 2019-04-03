const { Model } = require("objection");

class Bookmark extends Model{
    static get tableName(){
        return "bookmark";
    }

}

module.exports = Bookmark;