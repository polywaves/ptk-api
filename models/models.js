require('dotenv').config()
const mongoose = require('mongoose')

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect(process.env.MONGODB_URL)
}

const RequestsSchema = new mongoose.Schema({
    name: String,
    email: String
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})

const Requests = mongoose.model('Requests', RequestsSchema)

module.exports = {
    Requests: Requests,
}
