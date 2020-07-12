const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            fsblog: null,
            icomblog: null,
            hc: null,
        },

        actions: {
            getFsBlogs: url => {
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setStore({
                            fsblog: data
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },

            getIcomBlogs: url => {
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setStore({
                            icomblog: data
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },

            getHC: url => {
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setStore({
                            hc: data
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
        }
    }
}



export default getState;