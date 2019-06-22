import "@babel/polyfill"
import express from "express"
import ReactDOMServer from "react-dom/server"
import Builder from "./builder"
import Mapper from "./mapper"
import stock from "./stock"

const app = express()
const builder = new Builder()
const mapper = new Mapper(stock)

app.get("/", async (req, res, next) => {
    const json = await builder.getPage()
    const page = mapper.build(json)
    res.send(ReactDOMServer.renderToString(page))
})

app.listen(3000, () => {
    console.log("Server listening on 3000.")
})