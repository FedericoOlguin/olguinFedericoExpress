export default {
    mongo: {
        USER: process.env.MONGO_USER,
        PWD: process.env.MONGO_PWD,
        DB: process.env.MONGO_DB
    },
    jwt: {
        SECRET: process.env.JWT_SECRET,
        COOKIE:process.env.JWT_COOKIE
    }

}