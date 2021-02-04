const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')

dotenv.config({path: './config/config.env'})
// Coonect To DB
mongoose.connect('mongodb+srv:Ahmed:ahmed123@cluster0.jqlsh.mongodb.net/devcamper?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:false
    }
).catch(err=> console.log(err));

// Load Bootcamps
const Bootcamps = require('./Bootcamps/model/Bootcamps')
// Load Courses
const Course = require('./Courses/model/Course')
// Load Users
const User = require('./Users/model/User')
// Load Reviews
const Review = require('./Reviews/model/Review')


// Read JSON files
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/Bootcamps/data/bootcamps.json`, 'utf-8')
)
const courses = JSON.parse(
    fs.readFileSync(`${__dirname}Courses/data/courses.json`, 'utf-8')
)
const users = JSON.parse(
    fs.readFileSync(`${__dirname}Users/data/users.json`, 'utf-8')
)
const reviews = JSON.parse(
    fs.readFileSync(`${__dirname}Reviews/data/reviews.json`, 'utf-8')
)

// Import into DB
const importData = async ()=>{
    try {
        await Bootcamps.create(bootcamps);
        await Course.create(courses);
        await User.create(users);
        await Review.create(reviews);

        console.log('Data Imported...'.green.inverse)
        process.exit();
    } catch (err) {
        console.log(err)
    }
}

// Delete Data
const deleteData = async ()=>{
    try {
        await Bootcamps.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();

        console.log('Data Distroyed...'.red.inverse)
        process.exit();
    } catch (err) {
        console.log(err)
    }
}


if(process.argv[2] === '-i'){
    importData()
}else if(process.argv[2] === '-d'){
    deleteData()
}