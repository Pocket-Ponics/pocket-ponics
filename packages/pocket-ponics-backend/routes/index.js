import sensorgrid from '../controllers/sensorgridController';

export default (app) => {
    app.route('/sensor')
        .get(sensorgrid.getAllReadings)
        .post(sensorgrid.createReading);

    app.route('/sensor/:sensorId')
        .get(sensorgrid.getReading)
        .put(sensorgrid.updateReading)
        .delete(sensorgrid.deleteReading);
};