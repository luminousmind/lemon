const session = require("express-session");
const prisma = require("../prisma/pool");

// Custom Prisma-based session store
class PrismaSessionStore extends session.Store {
    constructor () {
        super();
    }

    async get(sid, callback) {
        try {
            const session = await prisma.session.findUnique({where: {id: sid}});

            if (!session) {
                return callback(null, null);
            }

            // Check if the session has expired
            if (new Date(session.expiresAt) < new Date()) {
                await prisma.session.delete({where: {id: sid}});
                return callback(null, null);
            }

            callback(null, JSON.parse(session.data));
        } catch (error) {
            callback(error);
        }
    }

    async set(sid, session, callback) {
        try {
            const expiresAt = new Date(Date.now() + session.cookie.maxAge);
            const data = JSON.stringify(session);

            await prisma.session.upsert({
                where: {id: sid},
                update: {data, expiresAt},
                create: {id: sid, data, expiresAt}
            });

            callback(null);
        } catch (error) {
            callback(error);
        }
    }

    async destroy(sid, callback) {
        try {
            await prisma.session.delete({where: {id: sid}});
            callback(null);
        } catch (error) {
            callback(error);
        }
    }
}

module.exports = PrismaSessionStore;