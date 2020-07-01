const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            fsblog: null,
            icomblog: null,
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
        }
    }
}



export default getState;