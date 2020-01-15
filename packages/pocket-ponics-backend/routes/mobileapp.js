import mobileapp from '../controllers/mobileappController';

module.exports = function(app)
{
    app.route('/mobileapp/greenhouses')
        .get(mobileapp.getGreenhouses)

    app.route('/mobileapp/devices/:devicekey')
        .post(mobileapp.addDeviceKey)
        .delete(mobileapp.deleteDeviceKey)

    app.route('/mobileapp/tiers/:greenhouse_id/:tier')
        .put(mobileapp.updateTier)
        .get(mobileapp.getTier)

    app.route('/mobileapp/greenhouses')
        .post(mobileapp.createGreenhouse)
    
    app.route('/mobileapp/greenhouses/:greenhouse_id')
        .put(mobileapp.updateGreenhouse)
        .delete(mobileapp.deleteGreenhouse)
        .get(mobileapp.getGreenhouse)

    app.route('/mobileapp/greenhouses/detail/:greenhouse_id')
        .get(mobileapp.getGreenhouseAndTiers)

    app.route('/mobileapp/adjustments/:greenhouse_id/:tier')
        .post(mobileapp.makeAdjustments)

    app.route('/mobileapp/sensor/:greenhouse_id/:tier/:sensor_type')
        .get(mobileapp.getReadingsSingle)

    app.route('/mobileapp/sensor/:greenhouse_id/:tier')
        .get(mobileapp.getReadingsTier)

    app.route('/mobileapp/plantdata/')
        .get(mobileapp.getPlantData)

    app.route('/mobileapp/sensor/:greenhouse_id')
        .get(mobileapp.getReadingsGreenhouse)

    app.route('/mobileapp/greenhouses/history/:greenhouse_id/')
        .get(mobileapp.getGreenhouseReadings)
}