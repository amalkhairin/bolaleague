const express = require('express');
const router = express.Router();
const knex = require('../config/db');

router.delete('/reset', (req, res) => {
    knex('User').del().then(data => {
        knex('GroupA').del().then(data => {
            knex('GroupB').del().then(data => {
                knex('GroupC').del().then(data => {
                    knex('GroupD').del().then(data => {
                        knex('GroupE').del().then(data => {
                            knex('GroupF').del().then(data => {
                                knex('GroupG').del().then(data => {
                                    knex('GroupH').del().then(data => {
                                        knex('MatchGroup').del().then(data => {
                                            knex('Round16').del().then(data => {
                                                knex('QuarterFinal').del().then(data => {
                                                    knex('SemiFinal').del().then(data => {
                                                        knex('Final').del().then(data => {
                                                            res.status(200).send({
                                                                success: true,
                                                                message: "Table reset!"
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

module.exports = router