import React from "react"

const Button = ({ text }) => <button>{ text }</button>

const stock = {
    Button
}

export const map = {
    Button: {
        fields: {
            text: {
                type: "text"
            }
        }
    }
}

export default stock