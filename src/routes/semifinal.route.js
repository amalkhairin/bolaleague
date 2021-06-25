const express = require('express');
const router = express.Router();
const knex = require('../config/db');

router.get('/draw', (req, res) => {
    let winner = [];
    knex.select('home_team_id').table('QuarterFinal').limit(4)
        .then(dataID => {
            knex.select().table('QuarterFinal').where(function(){
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
                    knex.select().table('QuarterFinal').where(function(){
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
                            knex.select().table('QuarterFinal').where(function(){
                                this.where({home_team_id: dataID[2].home_team_id})
                            }).orWhere({away_team_id:dataID[2].home_team_id})
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
                                    knex.select().table('QuarterFinal').where(function(){
                                        this.where({home_team_id: dataID[3].home_team_id})
                                    }).orWhere({away_team_id:dataID[3].home_team_id})
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
                                            
                                            const matches = [
                                                {
                                                    leg: 1,
                                                    home_team_id: winner[0].owner_id,
                                                    home_team_name: winner[0].team_name,
                                                    away_team_id: winner[2].owner_id,
                                                    away_team_name: winner[2].team_name,
                                                    home_score: "-",
                                                    away_score: "-",
                                                    is_finished: 0
                                                },
                                                {
                                                    leg: 1,
                                                    home_team_id: winner[1].owner_id,
                                                    home_team_name: winner[1].team_name,
                                                    away_team_id: winner[3].owner_id,
                                                    away_team_name: winner[3].team_name,
                                                    home_score: "-",
                                                    away_score: "-",
                                                    is_finished: 0
                                                },
                                                {
                                                    leg: 2,
                                                    home_team_id: winner[2].owner_id,
                                                    home_team_name: winner[2].team_name,
                                                    away_team_id: winner[0].owner_id,
                                                    away_team_name: winner[0].team_name,
                                                    home_score: "-",
                                                    away_score: "-",
                                                    is_finished: 0
                                                },
                                                {
                                                    leg: 2,
                                                    home_team_id: winner[3].owner_id,
                                                    home_team_name: winner[3].team_name,
                                                    away_team_id: winner[1].owner_id,
                                                    away_team_name: winner[1].team_name,
                                                    home_score: "-",
                                                    away_score: "-",
                                                    is_finished: 0
                                                },
                                            ]
                                            const rows = matches.map(function(m){
                                                return {
                                                    leg: m.leg,
                                                    home_team_id: m.home_team_id,
                                                    home_team_name: m.home_team_name,
                                                    away_team_id: m.away_team_id,
                                                    away_team_name: m.away_team_name,
                                                    home_score: m.home_score,
                                                    away_score: m.away_score,
                                                    is_finished: m.is_finished
                                                }
                                            })
                                            knex.insert(rows).into('SemiFinal')
                                                .then(_ => {
                                                    res.status(201).send({
                                                        success: true,
                                                        message: "Semi-final updated!"
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

router.get('/matches/:leg', (req, res) => {
    const { leg } = req.params;
    knex.select().table('SemiFinal').where({leg})
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
    const { match_id, leg, home_team_id, away_team_id, home_score, away_score, is_finished } = req.body
    if (match_id !== undefined && leg !== undefined && home_team_id !== undefined && away_team_id !== undefined && home_score !== undefined && away_score !== undefined && is_finished !== undefined) {
        knex('SemiFinal').where({match_id, leg}).update({home_score, away_score, is_finished})
            .then(_ => {
                res.send({
                    success: true,
                    message: "Semi-final updated!"
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