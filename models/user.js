'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
            email: {
                type: DataTypes.STRING,
                required: true,
                validate: {
                    len: {
                        args: [6, 128],
                        msg: "Email address must be between 6 and 128 characters in length"
                    },
                    isEmail: {
                        msg: "Email address must be valid"
                    }
                }
            },
            username: {
                allowNull: false,
                type: DataTypes.STRING,
                required: true,
                validate: {
                    len: {
                        args: 3,
                        msg: "Username must be at least 3 characters in length"
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                required: true,
                validate: {
                    len: {
                        args: 6,
                        msg: "Password must have minimum 6 characters"
                    }
                }
            },
            bank: {
                type: DataTypes.FLOAT,
                required: true,
                allowNull: false,
                isFloat: { msg: 'The bank must be numeric.' },
                min: { args: [0], msg: 'The bank should not be less than 0.' },
            }
        },
        {
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                }
            }
        });
    return User;
};