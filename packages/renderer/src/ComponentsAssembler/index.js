import React from 'react'

/** Responsible for automically building a React layout. */
class ComponentsAssembler {
    /**
     * Create a page builder.
     * @param {object} store Object containing all components to be used.
     * @param {object} options Object containing options.
     * @param {boolean} options.renderInvalidComponent Should render warning
     * when component is not found?
     */
    constructor(store, options = {}) {
        const defaultOptions = {
            renderInvalidComponent: true
        }

        this.store = store
        this.options = Object.assign({}, defaultOptions, options)
    }

    /** Build a component instance. Used iteratively in build method.
     * @param {object} data Contains name and settings of the component.
     * @param {number} index Index of iteration
     * @returns {React.Element}
     */
    _buildComponent(data, index){
        const { component, props } = data
        const type = this.store[component]

        if (type) return React.createElement(type, {...props, key: index}, this.build((props || {}).children))
        else return this._renderInvalidComponent(data.component)
    }

    /** Responsible for managing not found components rendering.
     * @param {string} name Name of the not found component.
     * @returns {React.Element|null}
     */
    _renderInvalidComponent(name) {
        console.warn(`Page Builder couldn't find a component named "${name}".`)
        if (this.options.renderInvalidComponent) return <span>Invalid Component: {name}</span>
    }

    /** Builds a page based on a components store.
     * @param {array|React.Element} page Array containing page data. e.g. Cockpit layout.
     * @param {object} options - Overwrite any PageBuilder options.
     * @param {boolean} options.amp - Should the components load AMP version?
     * @returns {React.Element[]} Contains the page layout with elements.
     */
    build(page, options) {
        if (Array.isArray(page)) return page.map(this._buildComponent, this)
        else return page
    }
}

export default ComponentsAssembler

// import ReactDOMServer from "react-dom/server"

// export default ReactDOMServer.renderToString