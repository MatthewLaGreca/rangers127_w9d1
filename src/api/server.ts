let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5NTg2NjU0NSwianRpIjoiMmYyODRlZWEtMzY1ZS00ZTQ4LTk2NjgtOTJkODk1ZGE3NTI3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkRpbmVycywgRHJpdmUtSW4gYW5kIERpdmVzIiwibmJmIjoxNjk1ODY2NTQ1LCJleHAiOjE3Mjc0MDI1NDV9.Asf2FOwofl8hpdded1OeaEGH7-kqaidd0IszVv2k8lc" // to be filled in later when I'm able to actually host on render
let userId = localStorage.getItem('token')

export const serverCalls = {
    getShop: async () => {

        const response = await fetch(`https://guy-fieris-car-chaos.onrender.com/api/shop`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        })

        if (!response.ok){
            throw new Error('Failed to fetch data'), response.status
        }
         
        return await response.json()
    },

    getOrder: async () => {

        const response = await fetch(`https://guy-fieris-car-chaos.onrender.com/api/order/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        })

        if (!response.ok){
            throw new Error('Failed to fetch data'), response.status
        }
         
        return await response.json()
    },

    createOrder: async (data: any) => {

        const response = await fetch(`https://guy-fieris-car-chaos.onrender.com/api/order/create/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        })

        if (!response.ok){
            throw new Error('Failed to fetch data'), response.status
        }
         
        return await response.json()
    },

    updateOrder: async (id: string, data: any) => {

        const response = await fetch(`https://guy-fieris-car-chaos.onrender.com/api/order/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        })

        if (!response.ok){
            throw new Error('Failed to fetch data'), response.status
        }
         
        return await response.json()
    },

    deleteOrder: async (id: string, data: any) => {

        const response = await fetch(`https://guy-fieris-car-chaos.onrender.com/api/order/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        })

        if (!response.ok){
            throw new Error('Failed to fetch data'), response.status
        }
         
        return await response.json()
    },
}