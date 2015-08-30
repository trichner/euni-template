/* jshint indent: 2 */
var path = require("path");
module.exports = function (sequelize, DataTypes) {
    var characters = sequelize.define('characters', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'characters',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        },
        instanceMethods: {

        }
    });
    return characters;
};
