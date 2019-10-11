import sensorgrid from '../controllers/sensorgridController';
import mobileapp from '../controllers/mobileappController';

export default (app) => {

    //Sensor Grid Endpoints
    app.route('/sensorgrid/sensor/greenhouse')
        .post(sensorgrid.postReadingsGreenhouse);

    app.route('/sensorgrid/sensor/level/:level')
        .post(sensorgrid.postReadingsLevel)

    app.route('/sensorgrid/sensor/single/:level/:sensor_type')
        .post(sensorgrid.postReadingsSingle)

    app.route('/sensorgrid/powersource')
        .put(sensorgrid.updatePowerSource)

    app.route('/sensorgrid/backuplevel')
        .put(sensorgrid.updateBackupBatteryLevel)

    app.route('/sensorgrid/adjustments')
        .get(sensorgrid.getAdjustments)

    //Mobile App Endpoints
    app.route('/mobileapp/greenhouses')
        .get(mobileapp.getGreenhouses)
    
    app.route('/mobileapp/levels/:greenhouse_id/:level')
        .put(mobileapp.updateLevel)
        .get(mobileapp.getLevel)

    

    
    
};