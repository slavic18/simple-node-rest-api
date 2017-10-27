import "isomorphic-fetch";
import React from "react";
import Layout from "../components/layout";
import UserBox from "../components/userBox";


export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleWithdrawClick = this.handleWithdrawClick.bind(this);
    }

    componentDidMount() {
        const res = fetch('http://localhost:9999/api/users/').then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();

        }).then((data) => {
            this.setState({
                users: data
            })
        });
    }

    handleRemoveClick(id) {
        const res = fetch(`http://localhost:9999/api/users/${id}`, {method: 'DELETE'});
        res.then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((data) => {
            if (data.success) {
                this.setState({
                    users: this.state.users.filter(item => item.id !== id)
                });
            }
        })
    }

    handleWithdrawClick(id) {
        const res = fetch(`http://localhost:9999/api/users/${id}/withdraw`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: 10})
        })
            .then(function (response) {
                return response.json();
            }).then((data) => {
                if (data.success && data.updatedAmount) {
                    this.state.users.map((item, index) => {
                        if (item.id === id) {
                            let users = this.state.users;
                            users[index].bank = data.updatedAmount;
                            this.setState({users});
                        }
                    });
                } else {
                    throw new Error(data.err);
                }
            }).catch((err) => {
                alert(err.message);
            })
    }

    render() {
        return (
            <Layout title={ 'Home page' }>
                <div>
                    <h1 className="text-center">Users list🤔</h1>
                </div>
                {this.state.users.map((item) => {
                    return <UserBox key={item.id} {...item} handleRemoveClick={this.handleRemoveClick}
                                    handleWithdrawClick={this.handleWithdrawClick}/>
                })}
            </Layout>
        )
    }
}