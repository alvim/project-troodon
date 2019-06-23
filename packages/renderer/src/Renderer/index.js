import ReactDOMServer from "react-dom/server"

export default (page) => {
    return ReactDOMServer.renderToString(page)
}