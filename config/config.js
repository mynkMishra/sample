
if(process.env.NODE_ENV === 'production'){
    //for production phase
    module.exports = require('./config_production')
}else{
    //for development phase
    module.exports = require('./config_dev')
}