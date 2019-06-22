const defaultTemplate = {
    __starter: object => object.settings,
    className: object => object.settings.class,
    style: object => getStyleObject(object.settings.style),
    "*": [
        {
            condition: (object, key) => isRepeater(object[key]),
            transform: (object, key) => object[key].map(obj => obj.value)
        },
        {
            condition: (object, key) => isImage(object[key]),
            transform: (object, key) => object[key].path
        },
        {
            condition: (object, key) => isBuildable(object, key),
            transform: (object, key) => this.build(object[key])
        }
    ],
    __delete: ["class", "component", (object, key) => !object[key]]
}

const defaultMap = {
    "Html": {
        "component": "RawHtml"
    },
    "Text": {
        "component": "RawHtml"
    },
    "Image": {
        "src": object => object.settings.image
    },
    "Banner": {
        "children": object => object.children
    },
    "Container": {
        "children": object => object.children
    },
    "grid": {
        "component": "Grid",
        "children": object => object.columns
    },
    "column": {
        "component": "Column",
        "children": object => object.children
    },
    "Section": {
        "children": object => object.children
    }
}

export default defaultMap