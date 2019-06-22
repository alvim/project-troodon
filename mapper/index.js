import React from 'react'
import { transform, isBuildable, isRepeater, isImage, getStyleObject } from './utils'

/** Responsible for automically building a React layout. */
class PageBuilder {
    /**
     * Create a page builder.
     * @param {object} store Object containing all components to be used.
     * @param {object} map Object containing transforms to be used in each
     * component _getElement execution.
     * @param {object} options Object containing options.
     * @param {boolean} options.renderInvalidComponent Should render warning
     * when component is not found?
     */
    constructor(store, map, options) {
        const defaultOptions = {
            renderInvalidComponent: true
        }

        this.store = store
        this.map = map
        this.options = Object.assign({}, defaultOptions, options)
    }

    /** Build a component instance. Used iteratively in build method.
     * @param {object} data Contains name and settings of the component.
     * @param {number} index Index of iteration
     * @returns {React.Element}
     */
    _buildComponent(data, index){
        const { type, props } = this._getElement(data)

        if (type) return React.createElement(type, {...props, key: index}, props.children)
        else return this._renderInvalidComponent(data.component)
    }

    /** Get component name and props 
     * @param {object} data Object containing element settings.
     * @returns {object} Object containing type and props of the element.
    */
    _getElement(data) {
        const map = this.map[data.component] || {}
        const component = map.component || data.component
        const type = this.store[component]
        if (!type) return {}
        const props = this._getProps(data, map)

        return { type, props }
    }

    /** Get element props from a settings object 
     * @param {object} settings Contains element settings.
     * @param {object} map Map for element properties transformation.
     * @returns {object} Props object.
    */
    _getProps(data, map) {
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

        return transform(data, defaultTemplate, map)
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

export default PageBuilder