import express from "express"
import bodyParser from "body-parser"
import Injector from "./Injector"
import render from "./Renderer"
import React from "react"

const app = express()
const stock = {
    Paragraph: ({children}) => <p>{children}</p>,
    Divider: () => <hr />,
    Span: () => <span></span>,
    Banner: ({children}) => <div>{children}</div>,
}
const injector = new Injector(stock)
app.use(bodyParser.json())

app.get("/", (req, res, next) => {
    res.send("Ok!")
})

app.post("/", (req, res, next) => {
    const data = req.body
    const page = injector.build(data)
    res.send(render(page))
    
})

app.listen(3000, () => {
    console.log("Troodon's renderer listening on 3000.")
})