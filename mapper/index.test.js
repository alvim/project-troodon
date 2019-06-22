import React from 'react'
import PageBuilder from '.'

const lib = {
    Paragraph: text => <p>{text}</p>,
    Divider: () => <hr />,
    Span: () => <span></span>,
    Banner: ({children}) => <div>{children}</div>,
}

const page = [
    { name: "Paragraph", settings: {}},
    { name: "Divider", settings: {}},
    { name: "span", settings: {}}
]

const map = {
    "span": { "component": "Span" },
    "Banner": {
        "children": object => object.children
    }
}

let builder

beforeEach (() => {
    builder = new PageBuilder(lib, map)
})

describe('Builder structure', () => {
    it('should have specific properties', () => {
        expect(builder).toHaveProperty('store')
    })

    it('should have specific methods', () => {
        expect(builder).toHaveProperty('build')
    })
})

describe('PageBuilder build method', () => {
    it('should return an array of component instances', () => {
        const layout = builder.build(page)
        expect(Array.isArray(layout)).toBe(true)
        expect(layout.every(el => React.isValidElement(el))).toBe(true)
    })

    it('should accept valid options', () => {

    })
})

describe('PageBuilder _buildComponent method', () => {
    it('should not render a not found component if passed in PageBuilder options', () => {
        builder = new PageBuilder(lib, {}, { renderInvalidComponent: false })
        expect(builder._renderInvalidComponent('foo')).toBeUndefined()
    })

    it('should render a not found component by default', () => {
        expect(React.isValidElement(builder._renderInvalidComponent('foo'))).toBe(true)
    })
})

describe('PageBuilder _getElement method', () => {
    it('should return a properly mapped component if a map is passed', () => {
        expect(builder._getElement({component: "span", settings: {}}).type.name).toEqual("Span")
    })
})

describe('PageBuilder _getProps method', () => {
    it('should remap properties according to template', () => {
        expect(builder._getProps({component: "Paragraph", settings: { class: 'button' }})).toEqual({ className: 'button' })
    })

    it('should build recursively children and fields starting with "_"', () => {
        expect(
            React.isValidElement(
                builder._getProps({ 
                    component: "Banner",
                    children: [{component: "Paragraph", settings: {}}],
                    settings: {}
                }, map.Banner)
                .children[0]
            )
        ).toBe(true)

        expect(
            builder._getProps({ 
                component: "Text",
                settings: {
                    children: "Yay"
                }
            })
            .children
        ).toEqual("Yay")

        expect(
            React.isValidElement(
                builder._getProps({ 
                    component: "BannerWithModal",
                    settings: {
                        modal: [{
                            component: "Paragraph",
                            settings: {}
                        }]
                    }
                })
                .modal[0]
            )
        ).toEqual(true)
    })
})