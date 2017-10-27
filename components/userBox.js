import "isomorphic-fetch";
import Link from "next/link";
import React from "react";

export default class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleWithdrawClick = this.handleWithdrawClick.bind(this);
    }
    handleRemoveClick(){
        this.props.handleRemoveClick(this.props.id);
    }
    handleWithdrawClick(){
        this.props.handleWithdrawClick(this.props.id);
    }
    render() {
        const props = this.props;
        return (
            <div className="user-box">
                <div className="content">
                    <div className="user-box-email">
                        {props.email && props.email}
                    </div>
                    <div className="user-box-name">
                        {props.username && props.username}
                    </div>
                    <div className="user-box-amount">
                        {props.bank && props.bank}
                    </div>
                </div>
                <div className="user-box-actions">
                    <button type="button" className="btn btn-primary" onClick={this.handleWithdrawClick}>Withdraw 10 points</button>
                    <a href={'/users/' + props.id}>
                        <button type="button" className="btn btn-info">Edit</button>
                    </a>
                    <button type="button" className="btn btn-danger" onClick={this.handleRemoveClick}>Delete</button>
                </div>
            </div>
        )
    }
}