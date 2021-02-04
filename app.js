const path = require('path')
const express = require('express');
const dotenv = require('dotenv')
const colors = require('colors')
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const errorHandler = require('./Errors/middleware/error')
// Middlewares
const logger = require('./middleware/logger')
// Load env vars
dotenv.config({path: './config/config.env'})

// Connect To DB
mongoose.connect('mongodb+srv:Ahmed:ahmed123@cluster0.jqlsh.mongodb.net/devcamper?retryWrites=true&w=majority', 
        {
            useNewUrlParser: true,
            useCreateIndex:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        },
        ()=>{
            return console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
         }
    ).catch(err => `DATABASE ERROR: ${err}`)


//Routes
const bootcampsRoutes = require('./Bootcamps/routes/bootcamps')
const coursesRoutes = require('./Courses/routes/courses')
const authRoutes = require('./Authenticates/routes/auth')
const usersRoutes = require('./Users/routes/users')
const reviewsRoutes = require('./Reviews/routes/review')


const app = express();


// Body Parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

app.use(logger);

// File uploadinf
app.use(fileupload());

// Sanitize Data
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// Set security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Mins
    max: 100
})

app.use(limiter);
// Prevent http polution
app.use(hpp());

// Enable CORS
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount Routers
const route = '/api/v1'
app.use(route,'bootcamps', bootcampsRoutes);
app.use(route,'/courses',coursesRoutes);
app.use(route,'/auth',authRoutes);
app.use(route,'/auth/users',usersRoutes);
app.use(route,'/reviews',reviewsRoutes);
app.use(errorHandler);

//listen
const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

// Handle Unhandle promise rejections
process.on('unhandledRejection', ( err, promise )=>{
    console.log(`Error: ${err.message}`.red)
    // Close server & exit process
    server.close(()=> process.exit(1))
})