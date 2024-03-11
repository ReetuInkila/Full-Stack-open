const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://inkilareetu:${password}@fullstackopen.cckaxzj.mongodb.net/puhelinluetteloApp?retryWrites=true&w=majority&appName=fullstackopen`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

const Person = mongoose.model('Person', personSchema)


if(!process.argv[3]){
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(note => {
            console.log(`${note.name} ${note.number}`)
        })
        mongoose.connection.close()
    })
}else if(process.argv[4]){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    person.save().then(() => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}else(
    mongoose.connection.close()
)