import auth from '../controllers/authController';

module.exports = function(app)
{
    app.route('/auth/get_token')
        .get(auth.getToken)

    app.route('/auth/reset_password')
        .post(auth.resetPassword)

    app.route('/auth/change_password')
        .post(auth.changePassword)

    app.route('/auth/create_user')
        .post(auth.createUser)

    app.route('/auth/get_token_admin')
        .get(auth.getTokenForAdmin)
}