/** Transforms a string in an camelCaseString 
 * @param {string} text String to be transformed
 * @param {string} separator Separator to be used in split
 * @returns {string} Camel case string
*/
export const camelize = (text, separator = '-') => {
    const words = text.split(separator)

    let result = ""
    for (var i = 0; i < words.length; i++) {
        const word = words[i]
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1)
        result += i == 0 ? word : capitalizedWord
    }

    return result
}

/** Transforms a style string into an style object 
 * @param {string} str String to be transformed
 * @returns {object} Style object
*/
export const getStyleObject = str => {
    if (!str) return null

    return str
        .replace(/(\n|;$)/g, '')
        .replace(/:\s/g, ':')
        .split(';')
        .reduce((obj, declaration) => {
            const [key, val] = declaration.split(':')
            obj[camelize(key)] = val
            return obj
        }, {})
}

/** Check if field has children to build
 * Uses a convention where any field started with "_" is buildable
 * @param {string} key Name of the field
 * @returns {boolean} Should build?
*/
export const isBuildable = (object, key) =>
    key === "children" ||
    Array.isArray(object[key]) && object[key].every(item => item.component) // Duck typing

/** Check if type of a field is Repeater
 * @param {object} field Field which type will be checked
 * @returns {boolean} Is it a repeater?
*/
export const isRepeater = field => Array.isArray(field) && field[0] && field[0].field && field[0].value

/** Check if type of a field is Image 
 * @param {object} field Field which type will be checked
 * @returns {boolean} Is it an Image?
*/
export const isImage = field => field && !!field.image

/** Array flat
 * @param {array} arr Multidimensional array to be flatted.
 * @returns {array} Single dimension array.
 */
export const flat = arr => arr.reduce((acc, val) => acc.concat(val), [])

/** Transforms an object based in a template object.
 * @param {object} data Source to be transformed
 * @param {object} template
 * @param {function} template.__starter A function that receives data object as
 * a param. Should return the initial object.
 * @param {function} template[key] A function that receives data object as a param.
 * Should return the new value.
 * @param {(string[]|function[])} template.__delete Array of strings or functions
 * containing every key to be deleted from final object. Deletes are executed
 * in builder object.
 * @param {ConditionedTransform[]} templates["*"] Array or rest of the arguments
 * containing conditions to be checked with every property. If condition is true,
 * template should be applied. Transforms are executed in builded object.
 * @param {function} ConditionedTransform.condition Function that receives
 * object and key of each property. Return boolean. If true, trigger transform.
 * @param {function} ConditionedTransform.transform Function that receives
 * object and key of each property. Return transformed value.
 * @returns {object} Transformed object.
 */
export const transform = (data, ...templates) => {
    // Configuration objects
    const template = Object.assign({}, ...flat(templates))
    
    // Operations
    let newObject
    const customProps = Object
        .keys(template)
        .filter(key => !['__delete', '__starter', '*'].some(prop => prop === key))

    if (template.__starter) {
        newObject = Object.assign({}, template.__starter(data))
    }

    newObject = Object.assign(
        {},
        newObject,
        customProps.reduce(
            (prev, key) => Object.assign(prev, {
                [key]: (typeof template[key] === "function")
                    ? template[key](data)
                    : template[key]
            }), {})
    )

    if (template["*"]) {
        Object
            .keys(newObject)
            .map(key => {
                for (let obj of template["*"]) {
                    if (obj.condition(newObject, key)) {
                        newObject[key] = obj.transform(newObject, key)
                        break;
                    }
                }
            })
    }

    if (template.__delete) {
        Object
            .keys(newObject)
            .map(key => {
                for (let condition of template.__delete) {
                    if (typeof condition === "function") {
                        if (condition(newObject, key)) {
                            delete newObject[key]
                        }
                    }
                    else if (condition === key) delete newObject[key]
                }
            })
    }

    return newObject
}