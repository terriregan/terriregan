var config = {
  development: {
  	user: 'USER',
    pass: 'PASS'
  },
  testing: {
    
  },
  production: {
  	user: 'USER',
    pass: 'PASS'
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];