/* Module imports */
const amqp = require('amqplib/callback_api')
const {updateSchema, deleteSchema} = require('./eventSchema')
const Ajv = require('ajv')
const prisma = require("../prismaClient")
const moment = require('moment')

/* AJV-setup to check JSON-Schema */
const ajv = new Ajv({allErrors: true})
const updateValidate = ajv.compile(updateSchema)
const deleteValidate = ajv.compile(deleteSchema)

/* Login data from PATH */
const rabbitMQUsername = process.env.rabbitUser
const rabbitMQPassword = process.env.rabbitPass
const serverURL = process.env.server

/* Constant used to limit the length of the aboutUs */
const MAX_LENGTH = 255;

amqp.connect(`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${serverURL}:5672`, function (error0, connection) {
    if (error0) {
        throw error0
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1
        }

        console.log('Listening for events')

        channel.consume('landingpage', async function (msg) {
            //consume incoming event
            console.log(msg.content.toString())

            let eventJSON
            try {
                eventJSON = JSON.parse(msg.content.toString())
            }catch (e){
                console.log(e)
                return;
            }

            //check if event is valid with update and delete schema
            if(updateValidate(eventJSON) || deleteValidate(eventJSON)){
                //event is valid, check if date is valid
                let date
                try{
                    //convert Datestring to JSDate
                    let momentDate = moment(eventJSON.date,'YYYY-MM-DDTHH:mm-ss')
                    date = momentDate.toDate()
                }catch (e){
                    //something failed while converting string to date
                    console.log(e)
                    return;
                }

                //date is valid, check which event was recieved
                if(eventJSON.event_name === "Delete My Service"){
                    //event is a delete event
                    //check if service already exists in DB
                    const service = await prisma.service.findUnique({
                        where: {
                            service_name: eventJSON.service_name,
                        }
                    })

                    if(service) {
                        //service already exists, delete it
                        const deleteService = await prisma.service.delete({
                            where:{
                                service_name: eventJSON.service_name,
                            },
                        })
                    }else{
                        //do nothing, since service was not saved
                        console.log(`No service with given name: ${eventJSON.service_name} found!`)
                    }

                    }else{
                    //event is an update event
                    //check if service already exists in DB
                    const service = await prisma.service.findUnique({
                        where: {
                            service_name: eventJSON.service_name,
                        }
                    })

                    if(service){
                        //service already exists, just update info
                        try {
                            if(eventJSON.about_us){
                                //about us was given --> update

                                //check if about us is not too long
                                if(eventJSON.about_us.length <= MAX_LENGTH) {
                                    await prisma.service.update({
                                        where: {
                                            service_name: eventJSON.service_name
                                        },
                                        data: {
                                            about_us: eventJSON.about_us,
                                            last_edited: date,
                                        }
                                    })
                                }
                            }
                            if(eventJSON.picture){
                                //picture was given --> update
                                await prisma.service.update({
                                    where: {
                                        service_name: eventJSON.service_name,
                                    },
                                    data: {
                                        picture: eventJSON.picture,
                                        last_edited: date,
                                    }
                                })
                            }
                        }catch (e){
                            //something failed while updating the info
                            console.log(e)
                        }
                    }else{
                        //only create a new Service if the url is given
                        if(eventJSON.url){
                            try{
                                const service = await prisma.service.create({
                                    data: {
                                        service_name: eventJSON.service_name,
                                        url: eventJSON.url,
                                        last_edited: date,
                                    }
                                })

                                if(eventJSON.about_us){
                                    //about us was given, add
                                    await prisma.service.update({
                                        where: {
                                            service_name: eventJSON.service_name
                                        },
                                        data: {
                                            about_us: eventJSON.about_us,
                                        }
                                    })
                                }


                                if(eventJSON.picture){
                                    //about us was given, add
                                    await prisma.service.update({
                                        where: {
                                            service_name: eventJSON.service_name
                                        },
                                        data: {
                                            picture: eventJSON.picture,
                                        }
                                    })
                                }
                            }catch (e) {
                                console.log(e);
                            }
                        }else{
                            console.log('Service ${eventJSON.service_name} did not include URL');
                        }
                    }
                }
            }else{
                //event is invalid
                console.log("Error while validating Schema: \n" + updateValidate.errors + deleteValidate.errors)
            }
        }, {
            noAck: true,
        })
    })
})