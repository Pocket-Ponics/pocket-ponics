import sensorgrid from '../controllers/sensorgridController';
import mobileapp from '../controllers/mobileappController';
import auth from '../controllers/authController';

export default (app) => {

    //Sensor Grid Endpoints
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

    //Mobile App Endpoints
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

    //Authentication Endpoints
    app.route('/auth/get_token')
        .get(auth.getToken)

    app.route('/auth/reset_password')
        .post(auth.resetPassword)

    app.route('/auth/change_password')
        .post(auth.changePassword)
};