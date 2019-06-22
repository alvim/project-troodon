import { flat, transform, camelize, getStyleObject } from './utils'

describe('Flat function', () => {
    it('should flat multidimensional arrays', () => {
        expect(flat([1, 2, [3, 4]])).toEqual([1, 2, 3, 4])
    })
})

describe('Transform function', () => {
    it('should return an object from data according to default template', () => {
        expect(
            transform(
                {"component": "Button", "settings": { "class": "foo", "bar": undefined }},
                {
                    "__starter": obj => obj.settings,
                    "className": obj => obj.settings.class,
                    "__delete": ["class", (object, key) => !object[key]]
                }
            )
        ).toEqual({ "className": "foo" })
        expect(
            transform(
                { "bar": { "image": "src-foo-bar", "path": "/src/foo/bar.jpg", "size": "200x200" } },
                {
                    "bar": object => object.bar.path
                }
            )
        ).toEqual({ "bar": "/src/foo/bar.jpg" })
    })
})

describe('Camelize function', () => {
    it('transforms a string in Camel Case', () => {
        expect(camelize('flex-direction')).toBe('flexDirection')
    })
})

describe('getStyleObject function', () => {
    it('returns a style object from a style string', () => {
        const str = `flex-direction: column;\nborder: 1px solid white;`

        expect(getStyleObject(str)).toMatchObject({ flexDirection: "column", border: "1px solid white" })
    })

    it('returns null if string is falsey', () => {
        expect(getStyleObject("")).toBeNull()
    })
})