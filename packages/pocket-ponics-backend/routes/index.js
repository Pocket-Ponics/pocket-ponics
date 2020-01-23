export default (app) => {

    //Sensor Grid Endpoints
    require('./sensorgrid')(app)

    //Mobile App Endpoints
    require('./mobileapp')(app)

    //Authentication Endpoints
    require('./auth')(app)

    //Admin Portal Endpoints
    require('./adminportal')(app)
};