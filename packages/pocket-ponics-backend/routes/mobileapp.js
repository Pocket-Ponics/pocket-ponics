import mobileapp from '../controllers/mobileappController';

module.exports = function(app)
{
    app.route('/mobileapp/greenhouses')
        .get(mobileapp.getGreenhouses)

    app.route('/mobileapp/levels/:greenhouse_id/:level')
        .put(mobileapp.updateLevel)
        .get(mobileapp.getLevel)

    app.route('/mobileapp/greenhouses')
        .post(mobileapp.createGreenhouse)
    
    app.route('/mobileapp/greenhouses/:greenhouse_id')
        .put(mobileapp.updateGreenhouse)
        .delete(mobileapp.deleteGreenhouse)
        .get(mobileapp.getGreenhouse)
    
    app.route('/mobileapp/adjustments/:greenhouse_id/:level')
        .post(mobileapp.makeAdjustments)

    app.route('/mobileapp/sensor/:greenhouse_id/:level/:sensor_type')
        .get(mobileapp.getReadingsSingle)

    app.route('/mobileapp/sensor/:greenhouse_id/:level')
        .get(mobileapp.getReadingsLevel)

    app.route('/mobileapp/sensor/:greenhouse_id')
        .get(mobileapp.getReadingsGreenhouse)
}