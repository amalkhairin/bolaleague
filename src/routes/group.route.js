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



module.exports = router;