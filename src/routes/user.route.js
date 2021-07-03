const express = require('express');
const router = express.Router();
const knex = require('../config/db');

router.post('/login', (req, res) => {
    const ownerId = req.body.owner_id;
    const pass = req.body.password;

    knex('User')
        .where({owner_id: ownerId})
        .select()
        .then(function(result){
            if (!result || !result[0]) {
                res.status(404).send({
                    success: false,
                    message: "User not found!"
                })
            }
            else if (pass === result[0].password){
                res.status(200).send({
                    success: true,
                    message: "Login success!",
                    data: result,
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: "Password mismatch!"
                })
            }
        })
        .catch(function(error){
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Internal server error!"
            })
        })
});

router.post('/signup', (req, res) => {
    const { owner_id, team_name, no_wa, password, status } = req.body;
    if (owner_id !== undefined && team_name !== undefined && no_wa !== undefined && password !== undefined) {
        knex('User').insert({owner_id,team_name,no_wa,password,status})
            .then(data => {
                knex.select().table('User').where({owner_id})
                    .then(dataLogin => {
                        res.status(201).send({
                            success: true,
                            data: dataLogin
                        })
                    })
                    .catch(function(error){
                        console.log(error);
                        res.status(500).send({
                            success: false,
                            message: "Internal server error!"
                        })
                        return res;
                    })
            })
            .catch(function(error){
                console.log(error);
                res.status(400).send({
                    success: false,
                    message: "User already registered"
                })
            })
    } else {
        res.status(400).send({
            success: false,
            message: "please fill the empty fields"
        })
    }
})

router.get('/', (req, res) => {
    knex.select().table('User')
        .then(data => {
            res.status(200).send({
                success: true,
                data
            })
        })
        .catch(function(error){
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Internal server error!"
            })
        })
})

router.get('/:owner_id', (req, res) => {
    const { owner_id } = req.params;
    if (owner_id != undefined) {
        knex.select().table('User')
            .where({owner_id})
            .then(data => {
                if (!data[0]) {
                    res.status(404).send({
                        success: false,
                        message: "User not found!"
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        data
                    })
                }
            })
            .catch(function(error){
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: "Internal server error!"
                })
            })
    }
})

router.put('/status', (req, res) => {
    const { owner_id, status } = req.body;
    if (owner_id !== undefined && status !== undefined) {
        knex('User')
            .where({owner_id})
            .update({status})
            .then(data => {
                if (data === 0) {
                    res.status(404).send({
                        success: false,
                        message: "User not found!"
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "User status updated!"
                    })
                }
            })
            .catch(function(error){
                console.log(error)
                res.status(500).send({
                    success: false,
                    message: "Internal server error!"
                })
            })
    } else {
        res.status(400).send({
            success: false,
            message: "owner_id or status is empty!"
        })
    }
})

router.delete('/', (req, res) => {
    knex('User').del().then(data => {
        res.status(200).send({
            success: true,
            message: "All users deleted!"
        })
    })
    .catch(function(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error!"
        })
    })
})

router.get('/wa/:owner_id', (req, res) => {
    const { owner_id } = req.params;
    if (owner_id != undefined) {
        knex.select('no_wa').table('User')
            .where({owner_id})
            .then(data => {
                if (!data[0]) {
                    res.status(404).send({
                        success: false,
                        message: "User not found!"
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        data
                    })
                }
            })
            .catch(function(error){
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: "Internal server error!"
                })
            })
    }
})

router.get('/registered/all', (req, res) => {
    knex.select().table('User').where({status:1})
        .then(data => {
            res.status(200).send({
                success: true,
                data
            })
        })
        .catch(function(error){
            console.log(error)
            res.status(500).send({
                success: false,
                message: "Internal server error!"
            })
        })
})

router.get('/is_open/:id_phase', (req, res) => {
    const { id_phase } = req.params;
    if (id_phase !== undefined) {
        knex.select('is_open').table('phase_open').where({id_phase})
            .then(data => {
                let status;
                if (data[0].is_open === 1) {
                    status = true;
                } else {
                    status = false
                }
                res.status(200).send({
                    success: true,
                    data: status
                })
            })
            .catch(function(error){
                res.status(500).send({
                    success: false,
                    message: "Internal server error!"
                })
            })
    } else {
        res.status(400).send({
            success: false,
            message: "Invalid input!"
        })
    }
})

router.put('/is_open/update', (req, res) => {
    const { id_phase, is_open } = req.body;
    if (id_phase !== undefined) {
        knex('phase_open')
            .where({id_phase})
            .update({is_open})
            .then(data => {
                if (data === 0) {
                    res.status(404).send({
                        success: false,
                        message: "id not found!"
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "open phase updated!"
                    })
                }
            })
            .catch(function(error){
                console.log(error)
                res.status(500).send({
                    success: false,
                    message: "Internal server error!"
                })
            })
    } else {
        res.status(400).send({
            success: false,
            message: "id phase is empty!"
        })
    }
})

router.put('/admin/message', (req, res) => {
    const { message } = req.body;
    if (message !== undefined) {
        knex('MessageAdmin').where({id:1}).update({message})
            .then(data =>{
                if (data === 0) {
                    res.status(404).send({
                        success: false,
                        message: "id not found!"
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "Message updated!"
                    })
                }
            })
            .catch(function(error){
                console.log(error)
                res.status(500).send({
                    success: false,
                    message: "Internal server error!"
                })
            })
    } else {
        res.status(400).send({
            success: false,
            message: "invalid message input!"
        })
    }
})

router.get('/admin/message', (req, res) => {
    knex.select('message').table('MessageAdmin').where({id:1})
        .then(data => {
            res.status(200).send({
                success: true,
                data
            })
        })
        .catch(function(error){
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Internal server error!"
            })
        })
})

module.exports = router;