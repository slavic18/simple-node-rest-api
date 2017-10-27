const UsersController = require('../controllers/users');

module.exports = {
    beforeMiddleware: function (router) {
        router.route('/users')
            .get(function (req, res) {
                UsersController.getAll(req, res);
            });
        router.route('/users/:id')
            .get(function (req, res) {
                UsersController.get(req, res);
            });
        router.route('/users/:id').put(function (req, res) {
            UsersController.edit(req, res);
        });
        router.route('/users')
            .post(function (req, res) {
                UsersController.register(req, res);
            });

        router.route('/users/:id/withdraw')
            .patch(function (req, res) {
                UsersController.withdraw(req, res);
            });
        router.route('/users/:id').delete(function (req, res) {
            UsersController.delete(req, res);
        });
    },
    middleware: function (router) {
        router.use(function (req, res, next) {
            return res.status(403).send({
                success: false,
                message: 'No allowed methods'
            });
        });
    },
    afterMiddleware: function (router) {

    }
}



