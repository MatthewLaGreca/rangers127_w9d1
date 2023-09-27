let accessToken = "" // to be filled in later when I'm able to actually host on render
let userId = localStorage.getItem('token')

export const serverCalls = {
    getShop: async () => {

        const response = await fetch(`this needs to be the url for my cars inventory`, {
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
    }
}