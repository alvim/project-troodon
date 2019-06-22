import express from "express"
import bodyParser from "body-parser"
import ReactDOMServer from "react-dom/server"
import Mapper from "../../mapper/dist"
import stock from "../../stock"

const mapper = new Mapper(stock)

const app = express()
app.use(bodyParser())
app.use(express.json())

app.post("/", (req, res, next) => {
    const data = req.body
    res.send(ReactDOMServer.renderToString(mapper.build(data)))
})

app.listen(3000, () => {
    console.log("Troodon's listening on 3000.")
})