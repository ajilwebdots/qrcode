const express = require('express')
const app = express()
const port = 3001


const database = [{
    fname: "demo",
    lname: "R",
    phone: "1010110100101010",
    email: "demo@gmail.com",
    organisation: "webdots",
    title: "develper"
}]



app.get('/api/vscardgenerate', (req, res) => {
    const vcard = require('vcards-js')

    const mycard = vcard()

    mycard.firstName = database[0].fname
    mycard.lastName = database[0].lname
    mycard.workEmail = database[0].email
    mycard.workPhone = database[0].phone
    mycard.organization = database[0].organisation
    mycard.title = database[0].title

    mycard.saveToFile(`./demo.vcf`)
    console.log(mycard.getFormattedString())
    // mycard.firstName=database[0].fname
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})