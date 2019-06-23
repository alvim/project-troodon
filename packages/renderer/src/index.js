import express from "express"
import bodyParser from "body-parser"
import ComponentsAssembler from "./ComponentsAssembler"
import render from "./Renderer"
import React from "react"
import ReactDOMServer from "react-dom/server"

const app = express()
const stock = {
    Paragraph: text => <p>{text}</p>,
    Divider: () => <hr />,
    Span: () => <span></span>,
    Banner: ({children}) => <div>{children}</div>,
}
const assembler = new ComponentsAssembler(stock)
app.use(bodyParser.json())

app.get("/", (req, res, next) => {
    res.send("Ok!")
})

app.post("/", (req, res, next) => {
    console.log("Components requested...")
    const data = req.body
    const page = assembler.build(data)
    console.log(page)
    // res.send("olaalalar")
    res.send(ReactDOMServer.renderToString(<p>Oi todo bom</p>))
    
})

app.listen(3000, () => {
    console.log("Troodon's renderer listening on 3000.")
})