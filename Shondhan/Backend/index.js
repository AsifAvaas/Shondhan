const express = require('express')
const app = express()
const cors = require('cors')
const MongDB = require('./Database')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const port = process.env.PORT || 8000
const frontend = process.env.FrontEnd


MongDB()


const UserRouter= require('./Routes/UserRoute')
const ReportRouter= require('./Routes/ReportRoute')
const EventRouter= require('./Routes/EventRoute')
const serviceRouter= require('./Routes/ServiceRoute')
const ProfileRouter= require('./Routes/ProfileRoute')


const allowedOrigins = [
    frontend,
    'https://talk-threads-seven.vercel.app'
];

app.use(express.json())

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'accessToken', 'refreshToken'],
    credentials: true
}))
app.use(cookieParser())





app.use('/auth',UserRouter)
app.use('/api',ReportRouter)
app.use('/api',EventRouter)
app.use('/api',serviceRouter)
app.use('/api',ProfileRouter)











app.get('/', (req, res) => {
    res.status(200).send(`Backend is running in port ${port}`)
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});