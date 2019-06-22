import express from "express"

const json = [{
    component: "Button",
    props: {
        text: "This is a button"
    }
}]

class Builder {
    getPage(route) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(json), 1000)
        })
    }
}

const app = express()
app.use(express.json())

app.get("/", (req, res, next) => {
    res.status(200).json(json)
})

app.listen(3000, () => {
    console.log("Builder listening on 3000.")
})

export default Builder