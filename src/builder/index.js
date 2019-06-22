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

export default Builder