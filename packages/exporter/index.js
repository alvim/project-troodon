import axios from "axios"

class Exporter {
    savePage(page) {
        axios.post(`${PROD_ENVIRONMENT_POST}/save`, {
            data: {
                page
            }
        })
    }
}

export default exporter