const express = require('express');
const router = express.Router();
const knex = require('../config/db');
const { route } = require('./user.route');

router.get('/:group_name', (req, res) => {
    const { group_name } = req.params;
    if (group_name != undefined) {
        knex.select().table('MatchGroup').where({group_name})
            .then(data => {
                res.status(200).send({
                    success: true,
                    data
                })
            })
            .catch(function(error){
                res.status(500).send({
                    success: false,
                    message: "Internal server error!",
                })
            })
    } else {
        res.status(400).send({
            success: false,
            message: "Invalid group name"
        })
    }
})

router.put('/update/:group_name', (req, res) => {
    const { group_name } = req.params;
    const { match_id, home_team_id, away_team_id, home_score, away_score, is_finished, match_result } = req.body;
    if (match_id !== undefined && home_team_id !== undefined && away_team_id !== undefined && home_score !== undefined && away_score !== undefined && match_result !== undefined) {
        knex('MatchGroup').where({match_id}).update({home_score, away_score, is_finished})
            .then(_ => {
                knex.select().table(`Group${group_name}`).where({owner_id: home_team_id})
                    .then(team => {
                        const sc1 = parseInt(home_score)
                        const sc2 = parseInt(away_score)
                        let poin1 = team[0].poin
                        let menang1 = team[0].menang
                        let seri1 = team[0].seri
                        let kalah1 = team[0].kalah
                        let gm1 = team[0].gm + sc1
                        let gk1 = team[0].gk - sc2
                        let main1 = team[0].main + 1
                        let jumlah1 = gm1 + gk1
                        if (match_result === "home_win") {
                            poin1 = poin1 + 3
                            menang1 = menang1 + 1
                        } else if (match_result === "draw") {
                            poin1 = poin1 + 1
                            seri1 = seri1 + 1
                        } else {
                            kalah1 = kalah1 + 1
                        }

                        knex(`Group${group_name}`).where({owner_id: home_team_id})
                            .update({poin:poin1, main:main1, menang:menang1, seri:seri1, kalah:kalah1, gm:gm1, gk:gk1, jumlah:jumlah1})
                            .then(_ => {
                                knex.select().table(`Group${group_name}`).where({owner_id: away_team_id})
                                    .then(team2 => {
                                        const sc3 = parseInt(home_score)
                                        const sc4 = parseInt(away_score)
                                        let poin2 = team2[0].poin
                                        let menang2 = team2[0].menang
                                        let seri2 = team2[0].seri
                                        let kalah2 = team2[0].kalah
                                        let gm2 = team2[0].gm + sc4
                                        let gk2 = team2[0].gk - sc3
                                        let main2 = team2[0].main + 1
                                        let jumlah2 = gm2 + gk2
                                        if (match_result === "away_win") {
                                            poin2 = poin2 + 3
                                            menang2 = menang2 + 1
                                        } else if (match_result === "draw") {
                                            poin2 = poin2 + 1
                                            seri2 = seri2 + 1
                                        } else {
                                            kalah2 = kalah2 + 1
                                        }

                                        knex(`Group${group_name}`).where({owner_id: away_team_id})
                                            .update({poin: poin2, main:main2, menang:menang2, seri:seri2, kalah:kalah2, gm:gm2, gk:gk2, jumlah:jumlah2})
                                            .then(data => {
                                                res.status(200).send({
                                                    success: true,
                                                    message: "Group standings updated!"
                                                })
                                            })
                                            .catch(function(error){
                                                console.log(error)
                                                res.send({
                                                    success: false,
                                                    message: "Internal server error!"
                                                })
                                            })
                                    })
                                    .catch(function(error){
                                        console.log(error)
                                        res.send({
                                            success: false,
                                            message: "Internal server error!"
                                        })
                                    })
                            })
                            .catch(function(error){
                                console.log(error)
                                res.send({
                                    success: false,
                                    message: "Internal server error!"
                                })
                            })
                    })
                    .catch(function(error){
                        console.log(error)
                        res.send({
                            success: false,
                            message: "Internal server error!"
                        })
                    })
            })
            .catch(function(error){
                console.log(error)
                res.send({
                    success: false,
                    message: "Internal server error!"
                })
            })
    } else {
        res.status(400).send({
            success: false,
            message: "Incorrect input!"
        })
    }
})

module.exports = router;