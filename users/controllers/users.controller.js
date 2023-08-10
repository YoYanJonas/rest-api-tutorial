const UserModel = require('../models/users.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

// commentY  edited here 

exports.getById = (req, res) => {
    const friendQuery = req.query.friend === 'true' || 'defualt';
    UserModel.findById(req.params.userId, friendQuery)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};


// commentY  added  here
 
exports.addFriendById = (req, res)=>{
    UserModel.addFriendById(req.body.userId,req.params.userId)
        .then((result)=>{
            res.status(200).send({result})
        })
        .catch((error)=>{
            res.status(404).send({message:{error}})
        })
}

exports.removeFriendById=(req, res)=>{
    UserModel.removeFriendById(req.body.userId, req.params.userId)
    .then((result)=>{
        res.status(200).send({result})
    })
    .catch((error)=>{
        res.status(404).send({message:{error}})
    })}