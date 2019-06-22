import "@babel/polyfill"
import express from "express"
import axios from "axios"

const app = express()

app.get("/", async (req, res, next) => {
    try {
        const { data } = await axios.get(`${process.env.BUILDER_API}`)
        return res.status(200).send(data)
    }
    catch(err) {
        console.error(err)
    }

    res.send("deu ruinzao")
})

app.listen(3000, () => {
    console.log("Troodon's proxy listening on 3000.")
})