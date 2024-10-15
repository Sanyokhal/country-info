import axios from "axios";

let makeRequest = async function (link: string, data: object = {}): Promise<object> {
    return await axios.get(link, data).then(response => {
        return response.data;
    }).catch((err) => {
        return {}
    })
}
export {makeRequest};
