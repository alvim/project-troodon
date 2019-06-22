import "@babel/polyfill"
import express from "express"
import Builder from "./builder"
import Mapper from "./mapper"
import renderer from "./renderer"
import stock0 from "./stock.0"
import stock1 from "./stock.1"
import exporter from "./exporter.0"
import { exportSpecifier } from "@babel/types";

const app = express()
const builder = new Builder()
const mapper = new Mapper(stock1)

app.get("/", async (req, res, next) => {
    const json = await builder.getPage()
    const components = mapper.build(json)
    const page = renderer(components)
    const response = await exporter(page)
    res.send()
})

app.listen(3000, () => {
    console.log("Server listening on 3000.")
})