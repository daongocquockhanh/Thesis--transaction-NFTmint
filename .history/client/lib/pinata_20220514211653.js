const key = c421d2c7cb323f93ae01
const secret = d0c41e12839ba614e227cd6fbe58ab55c0357beb831db4a49361070030db3f32

import axios from 'axios'

export const pinJSONToIPFS = async json => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`

    return axios
        .post(url, json, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            },
        })
        .then( (response) => {
            return response.data.IpfsHash
        })
        .catch((error) => {
            console.log(error)
        })
}

export const pinFileToIPFS = async (file, pinataMetaData) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

    let data = new FormData()

    data.append('file', file)
    data.append('pinataMetadata', JSON.stringify(pinataMetaData))

    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            },
        })
        .then(function (response) {
            return response.data.IpfsHash
        })
        .catch(function (error) {
            console.log(error)
        })
}