var config = {
  development: {
   
  },
  testing: {
    
  },
  production: {
    
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];