const {PrismaClient} = require("@prisma/client");

/* PrismaClient for database queries */
const prisma = new PrismaClient({
    log: ['query','info','warn','error'],
})

module.exports = prisma