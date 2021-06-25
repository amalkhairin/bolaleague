const express = require('express');
const router = express.Router();
const knex = require('../config/db');

router.get('/draw', (req, res) =>{
    let winner = [];
    knex.select('home_team_id').table('SemiFinal').limit(2)
        .then(dataID => {
            knex.select().table('SemiFinal').where(function(){
                this.where({home_team_id: dataID[0].home_team_id})
            }).orWhere({away_team_id:dataID[0].home_team_id})
            .then(match1 => {
                // leg 1
                    const score1 = parseInt(match1[0].home_score) //home
                    const score2 = parseInt(match1[0].away_score) //away
                    // leg 2
                    const score3 = parseInt(match1[1].home_score)  //away as home
                    const score4 = parseInt(match1[1].away_score)  //home as away
                    const home_score = score1 + score4
                    const away_score = score2 + score3
                    console.log(`${home_score} - ${away_score}`)
                    if (home_score === away_score) {
                        if (score2 > score4) {
                            winner.push({
                                owner_id: match1[0].away_team_id,
                                team_name: match1[0].away_team_name
                            })
                        } else {
                            winner.push({
                                owner_id: match1[0].home_team_id,
                                team_name: match1[0].home_team_name
                            })
                        }
                    } else if (home_score > away_score) {
                        winner.push({
                            owner_id: match1[0].home_team_id,
                            team_name: match1[0].home_team_name
                        })
                    } else {
                        winner.push({
                            owner_id: match1[0].away_team_id,
                            team_name: match1[0].away_team_name
                        })
                    }
                    knex.select().table('SemiFinal').where(function(){
                        this.where({home_team_id: dataID[1].home_team_id})
                    }).orWhere({away_team_id:dataID[1].home_team_id})
                    .then(match1 => {
                        // leg 1
                            const score1 = parseInt(match1[0].home_score) //home
                            const score2 = parseInt(match1[0].away_score) //away
                            // leg 2
                            const score3 = parseInt(match1[1].home_score)  //away as home
                            const score4 = parseInt(match1[1].away_score)  //home as away
                            const home_score = score1 + score4
                            const away_score = score2 + score3
                            console.log(`${home_score} - ${away_score}`)
                            if (home_score === away_score) {
                                if (score2 > score4) {
                                    winner.push({
                                        owner_id: match1[0].away_team_id,
                                        team_name: match1[0].away_team_name
                                    })
                                } else {
                                    winner.push({
                                        owner_id: match1[0].home_team_id,
                                        team_name: match1[0].home_team_name
                                    })
                                }
                            } else if (home_score > away_score) {
                                winner.push({
                                    owner_id: match1[0].home_team_id,
                                    team_name: match1[0].home_team_name
                                })
                            } else {
                                winner.push({
                                    owner_id: match1[0].away_team_id,
                                    team_name: match1[0].away_team_name
                                })
                            }
                            const matches = {
                                home_team_id: winner[0].owner_id,
                                home_team_name: winner[0].team_name,
                                away_team_id: winner[1].owner_id,
                                away_team_name: winner[1].team_name,
                                home_score: "-",
                                away_score: "-",
                                is_finished: 0
                            }
                            knex.insert(matches).into('Final')
                                .then(_ =>{
                                    res.status(200).send({
                                        success: true,
                                        message: "Final updated"
                                    })
                                })
                                .catch(function(error){
                                    console.log(error)
                                    res.status(500).send({
                                        success: false,
                                        message: "Internal server error"
                                    })
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
            .catch(function(error){
                console.log(error)
                res.status(500).send({
                    success: false,
                    message: "Internal server error!"
                })
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

router.get('/matches', (req, res) => {
    const { leg } = req.params;
    knex.select().table('Final')
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

router.put('/update', (req, res) => {
    const { match_id, home_team_id, away_team_id, home_score, away_score, is_finished } = req.body
    if (match_id !== undefined &&  home_team_id !== undefined && away_team_id !== undefined && home_score !== undefined && away_score !== undefined && is_finished !== undefined) {
        knex('Final').where({match_id}).update({home_score, away_score, is_finished})
            .then(_ => {
                res.send({
                    success: true,
                    message: "Final updated!"
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

module.exports = router