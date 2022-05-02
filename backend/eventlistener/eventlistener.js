/* Module imports */
const amqp = require('amqplib/callback_api')
const schema = require('./eventSchema')
const Ajv = require('ajv')
const {PrismaClient} = require("@prisma/client");
const moment = require('moment')

/* AJV-setup to check JSON-Schema */
const ajv = new Ajv({allErrors: true})
const validate = ajv.compile(schema)

/* Login data from PATH */
const rabbitMQUsername = process.env.rabbitUser
const rabbitMQPassword = process.env.rabbitPass
const serverURL = process.env.server

/* PrismaClient for database queries */
const prisma = new PrismaClient({
    log: ['query','info','warn','error'],
})

/* Constant used to limit the lenght of the aboutUs */
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

            let eventJSON = JSON.parse(msg.content.toString())

            //check if event is valid
            if(validate(eventJSON)){
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
                    //service doesnt exist, create new one
                    if(eventJSON.about_us && eventJSON.picture) {
                        //only try to create when all required info is given
                        try {
                            const createService = await prisma.service.create({
                                data: {
                                    service_name: eventJSON.service_name,
                                    about_us: eventJSON.about_us,
                                    picture: eventJSON.picture,
                                    last_edited: date,
                                }
                            })
                        } catch (e) {
                            //something failed while creating the service
                            console.log(e)
                        }
                    }
                }
            }else{
                //event is invalid
                console.log(validate.errors)
            }
        }, {
            noAck: true,
        })
    })
})