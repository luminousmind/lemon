const prisma = require("../prisma/pool");

const cleanupSessions = async () => {
    const now = new Date();

    try {
        const result = await prisma.session.deleteMany({
            where: {
                expiresAt: {lt: now}
            }
        });

        console.log(`Cleanup: removed ${result.count} expired sessions`);
    } catch (error) {
        console.log("Cleanup failed to clean up sessions");
    }
}

module.exports = cleanupSessions;