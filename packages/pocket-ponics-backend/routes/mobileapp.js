import mobileapp from '../controllers/mobileappController';

module.exports = function(app)
{
    app.route('/mobileapp/greenhouses')
        .get(mobileapp.getGreenhouses)

    app.route('/mobileapp/tiers/:greenhouse_id/:tier')
        .put(mobileapp.updateTier)
        .get(mobileapp.getTier)

    app.route('/mobileapp/greenhouses')
        .post(mobileapp.createGreenhouse)
    
    app.route('/mobileapp/greenhouses/:greenhouse_id')
        .put(mobileapp.updateGreenhouse)
        .delete(mobileapp.deleteGreenhouse)
        .get(mobileapp.getGreenhouse)
    
    app.route('/mobileapp/adjustments/:greenhouse_id/:tier')
        .post(mobileapp.makeAdjustments)

    app.route('/mobileapp/sensor/:greenhouse_id/:tier/:sensor_type')
        .get(mobileapp.getReadingsSingle)

    app.route('/mobileapp/sensor/:greenhouse_id/:tier')
        .get(mobileapp.getReadingsTier)

    app.route('/mobileapp/sensor/:greenhouse_id')
        .get(mobileapp.getReadingsGreenhouse)

    app.route('/mobileapp/greenhouses/:greenhouse_id/:start/:end')
        .get(mobileapp.getGreenhouseReadings)
}