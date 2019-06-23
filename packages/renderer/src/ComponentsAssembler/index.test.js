import React from 'react'
import PageBuilder from '.'

const lib = {
    Paragraph: text => <p>{text}</p>,
    Divider: () => <hr />,
    Span: () => <span></span>,
    Banner: ({children}) => <div>{children}</div>,
}

const page = [
    { component: "Paragraph", props: { children: "I'm a paragraph" }},
    { component: "Divider", props: {}},
    { component: "Span", props: { children: { component: "Span", props: {}} }}
]

let builder

beforeEach (() => {
    builder = new PageBuilder(lib)
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

    // it('should accept valid options', () => {

    // })
})

describe('PageBuilder _buildComponent method', () => {
    it('should not render a not found component if passed in PageBuilder options', () => {
        builder = new PageBuilder(lib, { renderInvalidComponent: false })
        expect(builder._renderInvalidComponent('foo')).toBeUndefined()
    })

    it('should render a not found component by default', () => {
        expect(React.isValidElement(builder._renderInvalidComponent('foo'))).toBe(true)
    })
})