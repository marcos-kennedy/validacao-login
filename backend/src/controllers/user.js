const userModel = require('../models/tblUsuario')

async function createUser(user){
    return userModel.create(user)
}

async function getUser(login_param){
    const user = await userModel.findOne({
        attributes: ['username','password'],
        where: {username: login_param} 
    })
    return user
}


module.exports = {createUser, getUser}