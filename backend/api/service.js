/*****************************************
 * Module imports for all required modules
 ****************************************/
const express = require('express')
const { getServices } = require('../controller/service')

/**
 * The router allows us to receive requests in files that aren't the main file
 */
const router = express.Router()

/*******************************************************************************
 * Middleware for the server to use
 * Middleware has to be specified for every router, it isn't enough to just tell
 * the main express app what middleware to use
 ******************************************************************************/
router.use(express.urlencoded({ extended: false }))
router.use(express.json())

/*******************************************************************************
 * The request implementation
 ******************************************************************************/
//router.route("/").post();

//route to get information about all existing services
router.get("/", getServices);

//route to get information about a single service
//router.get("/single/:serviceID",);

//router.route("/").put();

//router.route("/").delete();

module.exports = router