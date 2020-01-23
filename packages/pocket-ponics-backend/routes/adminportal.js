import adminportal from '../controllers/adminPortalController';

module.exports = function(app)
{
    app.route('/adminportal')
        .get(adminportal.getPlantIdeals)
        .post(adminportal.createPlantIdeal)
        .put(adminportal.updatePlantIdeal)
        .delete(adminportal.deletePlantIdeal)

}