const jwt = require('jsonwebtoken');
const customer = require('../model/signUp');



exports.authorization=(req,res,next)=>{

try{
    const token = req.headers.authorization;

   
    let decodeToken= jwt.verify(token,'SecretString')
    console.log('Decoding....=====',decodeToken)

    let userId= decodeToken.id;
    console.log(userId)


        customer.findOne({_id:userId})
        .then(data=>{

            if(data){
                req.currentUser=userId;
                next();
            }

            else{
                res.status(401).json({
                message:"No data Found"
                })
            }
        
        }).catch(err=>{
            res.status(401).json({
            message: 'Unathorized User'
            })
        })
}
catch(err){

    res.status(401).json({
        message: 'Unathorized User(Token expired please login again)'
    })
}
}