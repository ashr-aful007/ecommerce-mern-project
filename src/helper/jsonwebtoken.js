const jwt = require('jsonwebtoken');

const createJSONwebToken = (payload, secretKey, expiresIn) =>{
     if(typeof payload ===! 'object' || !payload){
          throw new Error('Payload must be a non-empty object')
     }
     if(typeof secretKey ===! 'string' || secretKey === ''){
          throw new Error('secret key must be a non-empty string')
     }
     try{
          const token = jwt.sign(payload, secretKey, {expiresIn});
          return token;
     }catch (error){
          console.error('Failed to sign the JWT:', error);
     }
    
}

module.exports = {createJSONwebToken}