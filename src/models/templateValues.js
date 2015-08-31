/* jshint indent: 2 */
var path = require("path");
module.exports = function (sequelize, DataTypes) {
    var characters = sequelize.define('templateValues', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'templateValues',
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
