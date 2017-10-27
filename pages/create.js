import "isomorphic-fetch";
import React from "react";
import Layout from "../components/layout";
import Form from "../components/form";


export default class CreatePage extends React.Component {
    constructor(props) {
        super(props);
    }

    //
    // componentDidMount() {
    //     const res = fetch('http://localhost:9999/api/users/').then((response) => {
    //         if (response.status >= 400) {
    //             throw new Error("Bad response from server");
    //         }
    //         return response.json();
    //
    //     }).then((data) => {
    //         this.setState({
    //             users: data
    //
    //         })
    //     });
    // }



    render() {
        return (
            <Layout title={ 'Create new user' }>
                <div>
                    <h1 className="text-center">Create new user</h1>
                    <Form/>
                </div>
            </Layout>
        )
    }
}