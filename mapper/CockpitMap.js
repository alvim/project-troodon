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