require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = 'mongodb+srv://geffersonteodoro:CSEwSij7SZQapRrV@cluster0.0qsvdoo.mongodb.net/noteApp?retryWrites=true&w=majority'

module.exports = {
    MONGODB_URI,
    PORT
}