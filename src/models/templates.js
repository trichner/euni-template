/* jshint indent: 2 */
var path = require("path");
module.exports = function (sequelize, DataTypes) {
    var characters = sequelize.define('templates', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        externalId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        template: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'templates',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.hasMany(models.templateValues,{as: 'values'})
            }
        },
        instanceMethods: {

        }
    });
    return characters;
};
