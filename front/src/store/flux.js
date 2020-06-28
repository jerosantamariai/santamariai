const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            fsblog: null,
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
        }

    }
}



export default getState;