import sensorgrid from '../controllers/sensorgridController';

module.exports = function(app)
{
    app.route('/sensorgrid/sensor/greenhouse')
        .post(sensorgrid.postReadingsGreenhouse);

    app.route('/sensorgrid/sensor/:level')
        .post(sensorgrid.postReadingsLevel)

    app.route('/sensorgrid/sensor/:level/:sensor_type')
        .post(sensorgrid.postReadingsSingle)

    app.route('/sensorgrid/powersource')
        .put(sensorgrid.updatePowerSource)

    app.route('/sensorgrid/backuplevel')
        .put(sensorgrid.updateBackupBatteryLevel)

    app.route('/sensorgrid/adjustments')
        .get(sensorgrid.getAdjustments)
}