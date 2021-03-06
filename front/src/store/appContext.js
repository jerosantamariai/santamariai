import React, { Component } from 'react';
import getState from './flux';

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
    class StoreWrapper extends Component {

        constructor(props) {
            super(props);

            this.state = getState({
                getStore: () => this.state.store,
                getActions: () => this.state.actions,
                setStore: updateStore => this.setState({
                    store: Object.assign(this.state.store, updateStore),
                    actions: { ...this.state.actions }
                })
            })
        }

        componentDidMount() {
            this.state.actions.getFsBlogs('http://localhost:5000/fsblog');
            this.state.actions.getIcomBlogs('http://localhost:5000/icomblog');
            this.state.actions.getHC('http://localhost:5000/homecarousel');
        }

        render() {
            return (
                <Context.Provider value={this.state}>
                    <PassedComponent {...this.props} />
                </Context.Provider>
            )
        }
    }
    return StoreWrapper;
}
export default injectContext;