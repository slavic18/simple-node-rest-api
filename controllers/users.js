var models = require('../models');
const options = require('../config/config.json');
let UsersController = {
    /**
     * get all users
     * @param req
     * @param res
     * @returns {json}
     */
    getAll(req, res) {
        models.User.findAll({attributes: ['id', 'email', 'username', 'bank']}).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(404).json({success: false, error: err.message});
        });
    },
    /**
     * get single user
     * @param req
     * @param res
     * @returns {json}
     */
    get(req, res) {
        if (!req.params.id) {
            res.json({success: false, error: 'User id is required'});
        }

        models.User.findOne({
            where: {id: Number(req.params.id)},
            attributes: ['id', 'email', 'username']
        }).then((data) => {
            if (!data) {
                throw new Error("User not found");
            }
            res.json(data);
        }).catch((err) => {
            res.status(404).json({success: false, error: err.message});
        });
    },
    /**
     * register new user
     * @param req
     * @param res
     * @returns {json}
     */
    register(req, res) {
        // prepare fields
        let updatedFields = this._updatedFields(req.body);

        // set default user amount
        updatedFields.bank = options.start_user_amount || 1000;

        models.User.create(updatedFields).then((data) => {
            res.json({success: true, user: data});
        }).catch((err) => {
            console.log(err);
            res.status(404).json({success: false, error: err});
        });
    },
    /**
     * edit user
     * @param req
     * @param res
     * @returns {json}
     */
    edit(req, res) {
        // prepare fields
        if (!req.params.id) {
            res.json({success: false, error: "User id is required"});
            return false;
        }
        let user_id = Number(req.params.id);
        let updatedFields = this._updatedFields(req.body);

        models.User.update(updatedFields, {where: {id: user_id}}).then((data) => {
            res.json({success: true, user: data});
        }).catch((err) => {
            res.status(404).json({success: false, error: err.message});
        });
    },
    /**
     * Delete user
     * @param req
     * @param res
     * @returns {json}
     */
    delete: (req, res) => {
        models.User.destroy({
            where: {
                id: req.params.id
            }
        }).then((data) => {
            res.json({
                success: !!data
            });
        }).catch((err)=> {
            res.status(404).json({success: false, err: err.message})
        });
    },

    /**
     * Withdraw bank amount
     * @param req
     * @param res
     * @returns {json}
     */
    withdraw(req, res) {
        try {
            if (!req.params.id) {
                throw new Error('User id is required');
            }

            if (!req.body.amount) {
                throw new Error('Amount is required');
            }

            let amount = req.body.amount;
            amount = Number(amount);

            if (!amount || amount < 0) {
                throw new Error('Amount must be more than 0');
            }

            models.User.findById(parseInt(req.params.id))
                .then((user) => {
                    if (!user) {
                        throw new Error("User does not exist");
                    }
                    if ((Number(user.bank) - amount) < 0) {
                        throw new Error("Withdraw amount is to big");
                    }
                    return user.decrement('bank', {by: amount});
                })
                .then((data) => {
                    res.json({success: true, updatedAmount: (Number(data.bank) - amount).toFixed(2)});
                })
                .catch((err) => {
                    res.status(404).json({success: false, err: err.message});
                });

        } catch (err) {
            res.status(404).json({success: false, err: err.message});
        }

    },
    // prepare fields.
    _updatedFields(body) {
        const availableFields = ['email', 'username', 'password'];
        let result = {};
        for (let item in body) {
            if (body.hasOwnProperty(item)) {
                if (availableFields.indexOf(item) != -1) {
                    result[item] = body[item];
                }
            }
        }
        return result;
    },
}


module.exports = UsersController;
