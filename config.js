var config = {};

config.env = process.env.NODE_ENV || 'development';

config.listenToPort = process.env.MYIP_LISTEN_PORT || 8003;

module.exports = config;
