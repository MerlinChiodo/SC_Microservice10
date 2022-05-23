/*****************************************
 * Module imports for all required modules
 ****************************************/
const prisma = require(`../prismaClient.js`)

const getServices = async (req, res) => {
    try {
        //query for all services on DB
        const services = await prisma.service.findMany()

        if (services) {
            return res.status(200).json({success: true, msg: services})
        } else {
            return res.status(404).json({success: false, err: "No registered services found!"})
        }
    }catch (e){
        return res.status(500).json({success: false, err: "Ups, something went wrong!"})
    }

}

module.exports = {
    getServices,
}