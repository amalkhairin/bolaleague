const express = require('express');
const router = express.Router();
const knex = require('../config/db');

 router.post('/:group_name', (req, res) => {
    let team_list = req.body.team_list;
    const { group_name } = req.params;

    if (team_list !== undefined && group_name !== undefined && team_list.length > 0) {
        const rows = team_list.map(function(t) {
            return { 
                owner_id: t.owner_id,
                team_name: t.team_name,
                poin: 0,
                main: 0,
                menang: 0,
                seri: 0,
                kalah: 0,
                gm: 0,
                gk: 0,
                jumlah: 0,
            }
        })
        const matches = [
            {
                matchday: 1,
                group_name,
                home_team_id: team_list[0].owner_id,
                home_team_name: team_list[0].team_name,
                away_team_id: team_list[1].owner_id,
                away_team_name: team_list[1].team_name,
                home_score: "-",
                away_score: "-",
                home_uploaded: 0,
                away_uploaded: 0,
                is_finished:0
            },
            {
                matchday: 1,
                group_name,
                home_team_id: team_list[2].owner_id,
                home_team_name: team_list[2].team_name,
                away_team_id: team_list[3].owner_id,
                away_team_name: team_list[3].team_name,
                home_score: "-",
                away_score: "-",
                home_uploaded: 0,
                away_uploaded: 0,
                is_finished:0
            },
            {
                matchday: 2,
                group_name,
                home_team_id: team_list[0].owner_id,
                home_team_name: team_list[0].team_name,
                away_team_id: team_list[2].owner_id,
                away_team_name: team_list[2].team_name,
                home_score: "-",
                away_score: "-",
                home_uploaded: 0,
                away_uploaded: 0,
                is_finished:0
            },
            {
                matchday: 2,
                group_name,
                home_team_id: team_list[1].owner_id,
                home_team_name: team_list[1].team_name,
                away_team_id: team_list[3].owner_id,
                away_team_name: team_list[3].team_name,
                home_score: "-",
                away_score: "-",
                home_uploaded: 0,
                away_uploaded: 0,
                is_finished:0
            },
            {
                matchday: 3,
                group_name,
                home_team_id: team_list[0].owner_id,
                home_team_name: team_list[0].team_name,
                away_team_id: team_list[3].owner_id,
                away_team_name: team_list[3].team_name,
                home_score: "-",
                away_score: "-",
                home_uploaded: 0,
                away_uploaded: 0,
                is_finished:0
            },
            {
                matchday: 3,
                group_name,
                home_team_id: team_list[1].owner_id,
                home_team_name: team_list[1].team_name,
                away_team_id: team_list[2].owner_id,
                away_team_name: team_list[2].team_name,
                home_score: "-",
                away_score: "-",
                home_uploaded: 0,
                away_uploaded: 0,
                is_finished:0
            },
            {
                matchday: 4,
                group_name,
                home_team_id: team_list[3].owner_id,
                home_team_name: team_list[3].team_name,
                away_team_id: team_list[0].owner_id,
                away_team_name: team_list[0].team_name,
                home_score: "-",
                away_score: "-",
                home_uploaded: 0,
                away_uploaded: 0,
                is_finished:0
            },
            {
                matchday: 4,
                group_name,
                home_team_id: team_list[2].owner_id,
                home_team_name: team_list[2].team_name,
                away_team_id: team_list[1].owner_id,
                away_team_name: team_list[1].team_name,
                home_score: "-",
                away_score: "-",
                home_uploaded: 0,
                away_uploaded: 0,
                is_finished:0
            },
            {
                matchday: 5,
                group_name,
                home_team_id: team_list[1].owner_id,
                home_team_name: team_list[1].team_name,
                away_team_id: team_list[0].owner_id,
                away_team_name: team_list[0].team_name,
                home_score: "-",
                away_score: "-",
                home_uploaded: 0,
                away_uploaded: 0,
                is_finished:0
            },
            {
                matchday: 5,
                group_name,
                home_team_id: team_list[3].owner_id,
                home_team_name: team_list[3].team_name,
                away_team_id: team_list[2].owner_id,
                away_team_name: team_list[2].team_name,
                home_score: "-",
                away_score: "-",
                home_uploaded: 0,
                away_uploaded: 0,
                is_finished:0
            },
            {
                matchday: 6,
                group_name,
                home_team_id: team_list[2].owner_id,
                home_team_name: team_list[2].team_name,
                away_team_id: team_list[0].owner_id,
                away_team_name: team_list[0].team_name,
                home_score: "-",
                away_score: "-",
                home_uploaded: 0,
                away_uploaded: 0,
                is_finished:0
            },
            {
                matchday: 6,
                group_name,
                home_team_id: team_list[3].owner_id,
                home_team_name: team_list[3].team_name,
                away_team_id: team_list[1].owner_id,
                away_team_name: team_list[1].team_name,
                home_score: "-",
                away_score: "-",
                home_uploaded: 0,
                away_uploaded: 0,
                is_finished:0
            },
        ]

        const rows2 = matches.map(function(m){
            return {
                matchday: m.matchday,
                group_name: m.group_name,
                home_team_id: m.home_team_id,
                home_team_name: m.home_team_name,
                away_team_id: m.away_team_id,
                away_team_name: m.away_team_name,
                home_score: m.home_score,
                away_score: m.away_score,
                home_uploaded: m.home_uploaded,
                away_uploaded: m.away_uploaded,
                is_finished: m.is_finished
            }
        })
        knex.insert(rows).into(`Group${group_name}`)
            .then(data => {
                knex.insert(rows2).into('MatchGroup')
                    .then(data => {
                        res.status(201).send({
                            success: true,
                            message: "Teams inserted!"
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
                res.status(500).send({
                    success: false,
                    message: "Internal server error!"
                })
            })
    } else {
        res.status(400).send({
            success: false,
            message: "Failed to insert teams!"
        })
    }
})

router.get('/qualified', (req, res) => {
    let group_winner = []
    let group_runner_up = []
    knex.select().table('GroupA').orderBy('poin', 'desc').orderBy('jumlah', 'desc').limit(2)
        .then(dataA => {
            group_winner.push(dataA[0])
            group_runner_up.push(dataA[1])
            knex.select().table('GroupB').orderBy('poin', 'desc').orderBy('jumlah', 'desc').limit(2)
                .then(dataB => {
                    group_winner.push(dataB[0])
                    group_runner_up.push(dataB[1])
                    knex.select().table('GroupC').orderBy('poin', 'desc').orderBy('jumlah', 'desc').limit(2)
                        .then(dataC => {
                            group_winner.push(dataC[0])
                            group_runner_up.push(dataC[1])
                            knex.select().table('GroupD').orderBy('poin', 'desc').orderBy('jumlah', 'desc').limit(2)
                                .then(dataD => {
                                    group_winner.push(dataD[0])
                                    group_runner_up.push(dataD[1])
                                    knex.select().table('GroupE').orderBy('poin', 'desc').orderBy('jumlah', 'desc').limit(2)
                                        .then(dataE => {
                                            group_winner.push(dataE[0])
                                            group_runner_up.push(dataE[1])
                                            knex.select().table('GroupF').orderBy('poin', 'desc').orderBy('jumlah', 'desc').limit(2)
                                                .then(dataF => {
                                                    group_winner.push(dataF[0])
                                                    group_runner_up.push(dataF[1])
                                                    knex.select().table('GroupG').orderBy('poin', 'desc').orderBy('jumlah', 'desc').limit(2)
                                                        .then(dataG => {
                                                            group_winner.push(dataG[0])
                                                            group_runner_up.push(dataG[1])
                                                            knex.select().table('GroupH').orderBy('poin', 'desc').orderBy('jumlah', 'desc').limit(2)
                                                                .then(dataH => {
                                                                    group_winner.push(dataH[0])
                                                                    group_runner_up.push(dataH[1])
                                                                    const matches = [
                                                                        {
                                                                            leg: 1,
                                                                            home_team_id: group_winner[0].owner_id,
                                                                            home_team_name: group_winner[0].team_name,
                                                                            away_team_id: group_runner_up[2].owner_id,
                                                                            away_team_name: group_runner_up[2].team_name,
                                                                            home_score: "-",
                                                                            away_score: "-",
                                                                            is_finished: 0
                                                                        },
                                                                        {
                                                                            leg: 1,
                                                                            home_team_id: group_winner[1].owner_id,
                                                                            home_team_name: group_winner[1].team_name,
                                                                            away_team_id: group_runner_up[3].owner_id,
                                                                            away_team_name: group_runner_up[3].team_name,
                                                                            home_score: "-",
                                                                            away_score: "-",
                                                                            is_finished: 0
                                                                        },
                                                                        {
                                                                            leg: 1,
                                                                            home_team_id: group_winner[4].owner_id,
                                                                            home_team_name: group_winner[4].team_name,
                                                                            away_team_id: group_runner_up[6].owner_id,
                                                                            away_team_name: group_runner_up[6].team_name,
                                                                            home_score: "-",
                                                                            away_score: "-",
                                                                            is_finished: 0
                                                                        },
                                                                        {
                                                                            leg: 1,
                                                                            home_team_id: group_winner[5].owner_id,
                                                                            home_team_name: group_winner[5].team_name,
                                                                            away_team_id: group_runner_up[7].owner_id,
                                                                            away_team_name: group_runner_up[7].team_name,
                                                                            home_score: "-",
                                                                            away_score: "-",
                                                                            is_finished: 0
                                                                        },
                                                                        {
                                                                            leg: 1,
                                                                            home_team_id: group_winner[2].owner_id,
                                                                            home_team_name: group_winner[2].team_name,
                                                                            away_team_id: group_runner_up[0].owner_id,
                                                                            away_team_name: group_runner_up[0].team_name,
                                                                            home_score: "-",
                                                                            away_score: "-",
                                                                            is_finished: 0
                                                                        },
                                                                        {
                                                                            leg: 1,
                                                                            home_team_id: group_winner[3].owner_id,
                                                                            home_team_name: group_winner[3].team_name,
                                                                            away_team_id: group_runner_up[1].owner_id,
                                                                            away_team_name: group_runner_up[1].team_name,
                                                                            home_score: "-",
                                                                            away_score: "-",
                                                                            is_finished: 0
                                                                        },
                                                                        {
                                                                            leg: 1,
                                                                            home_team_id: group_winner[6].owner_id,
                                                                            home_team_name: group_winner[6].team_name,
                                                                            away_team_id: group_runner_up[4].owner_id,
                                                                            away_team_name: group_runner_up[4].team_name,
                                                                            home_score: "-",
                                                                            away_score: "-",
                                                                            is_finished: 0
                                                                        },
                                                                        {
                                                                            leg: 1,
                                                                            home_team_id: group_winner[7].owner_id,
                                                                            home_team_name: group_winner[7].team_name,
                                                                            away_team_id: group_runner_up[5].owner_id,
                                                                            away_team_name: group_runner_up[5].team_name,
                                                                            home_score: "-",
                                                                            away_score: "-",
                                                                            is_finished: 0
                                                                        },
                                                                        {
                                                                            leg: 2,
                                                                            home_team_id: group_runner_up[2].owner_id,
                                                                            home_team_name: group_runner_up[2].team_name,
                                                                            away_team_id: group_winner[0].owner_id,
                                                                            away_team_name: group_winner[0].team_name,
                                                                            home_score: "-",
                                                                            away_score: "-",
                                                                            is_finished: 0
                                                                        },
                                                                        {
                                                                            leg: 2,
                                                                            home_team_id: group_runner_up[3].owner_id,
                                                                            home_team_name: group_runner_up[3].team_name,
                                                                            away_team_id: group_winner[1].owner_id,
                                                                            away_team_name: group_winner[1].team_name,
                                                                            home_score: "-",
                                                                            away_score: "-",
                                                                            is_finished: 0
                                                                        },
                                                                        {
                                                                            leg: 2,
                                                                            home_team_id: group_runner_up[6].owner_id,
                                                                            home_team_name: group_runner_up[6].team_name,
                                                                            away_team_id: group_winner[4].owner_id,
                                                                            away_team_name: group_winner[4].team_name,
                                                                            home_score: "-",
                                                                            away_score: "-",
                                                                            is_finished: 0
                                                                        },
                                                                        {
                                                                            leg: 2,
                                                                            home_team_id: group_runner_up[7].owner_id,
                                                                            home_team_name: group_runner_up[7].team_name,
                                                                            away_team_id: group_winner[5].owner_id,
                                                                            away_team_name: group_winner[5].team_name,
                                                                            home_score: "-",
                                                                            away_score: "-",
                                                                            is_finished: 0
                                                                        },
                                                                        {
                                                                            leg: 2,
                                                                            home_team_id: group_runner_up[0].owner_id,
                                                                            home_team_name: group_runner_up[0].team_name,
                                                                            away_team_id: group_winner[2].owner_id,
                                                                            away_team_name: group_winner[2].team_name,
                                                                            home_score: "-",
                                                                            away_score: "-",
                                                                            is_finished: 0
                                                                        },
                                                                        {
                                                                            leg: 2,
                                                                            home_team_id: group_runner_up[1].owner_id,
                                                                            home_team_name: group_runner_up[1].team_name,
                                                                            away_team_id: group_winner[3].owner_id,
                                                                            away_team_name: group_winner[3].team_name,
                                                                            home_score: "-",
                                                                            away_score: "-",
                                                                            is_finished: 0
                                                                        },
                                                                        {
                                                                            leg: 2,
                                                                            home_team_id: group_runner_up[4].owner_id,
                                                                            home_team_name: group_runner_up[4].team_name,
                                                                            away_team_id: group_winner[6].owner_id,
                                                                            away_team_name: group_winner[6].team_name,
                                                                            home_score: "-",
                                                                            away_score: "-",
                                                                            is_finished: 0
                                                                        },
                                                                        {
                                                                            leg: 2,
                                                                            home_team_id: group_runner_up[5].owner_id,
                                                                            home_team_name: group_runner_up[5].team_name,
                                                                            away_team_id: group_winner[7].owner_id,
                                                                            away_team_name: group_winner[7].team_name,
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
                                                                    knex.insert(rows).into('Round16')
                                                                        .then(_ => {
                                                                            res.status(201).send({
                                                                                success: true,
                                                                                message: "All qualified teams inserted",
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

router.get('/standing/:group_name', (req, res) => {
    const { group_name } = req.params;
    if (group_name !== undefined){
        knex.select().table(`Group${group_name}`).orderBy('poin', 'desc').orderBy('jumlah', 'desc')
            .then( data => {
                res.status(200).send({
                    success: true,
                    data
                })
            })
            .catch(function(error){
                res.status(400).send({
                    success: false,
                    message: "Group name not found!"
                })
            })
    } else {
        res.status(400).send({
            success: false,
            message: "Invalid group name!"
        })
    }
})

module.exports = router;