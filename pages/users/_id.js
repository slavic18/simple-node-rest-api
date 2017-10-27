import "isomorphic-fetch";
import React from "react";
import Layout from "../../components/layout";
import EditForm from "../../components/EditForm";
import config from "../../config/config.json";
export default class EditPage extends React.Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps(req) {
        const {query} = req;
        const res = await fetch(`${config.base_api_url}/${query.id}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        const response = await res.json();
        return {user: response}
    }

    render() {
        return (
            <Layout title={ 'Edit user' }>
                <div>
                    {this.props.user  ? <EditForm {...this.props.user}/> : 'User does not exist.'}
                </div>
            </Layout>
        )
    }
}