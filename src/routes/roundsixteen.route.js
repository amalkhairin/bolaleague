const express = require('express');
const router = express.Router();
const knex = require('../config/db');

router.put('/update', (req, res) => {
    const { match_id, leg, home_team_id, away_team_id, home_score, away_score, is_finished } = req.body
    if (match_id !== undefined && leg !== undefined && home_team_id !== undefined && away_team_id !== undefined && home_score !== undefined && away_score !== undefined && is_finished !== undefined) {
        knex('Round16').where({match_id, leg}).update({home_score, away_score, is_finished})
            .then(_ => {
                res.send({
                    success: true,
                    message: "Round of 16 updated!"
                })
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
            message: "Invalid input!"
        })
    }
})

router.get('/matches/:leg', (req, res) => {
    const { leg } = req.params;
    knex.select().table('Round16').where({leg})
        .then(data => {
            res.status(200).send({
                success: true,
                data
            })
        })
        .catch(function(error){
            res.status(500).send({
                success: false,
                message: "Internal server error!"
            })
        })
})

module.exports = router