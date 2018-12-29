import React, { Component } from 'react';

class UploadCakeShowUserCard extends Component {
  render() {
    return (
            <div className="card col-md-6 col-12 cardStyles">
                <img className="card-img-top" src={this.props.image} width={90} alt="Card cap"/>
                <div className="card-body">
                    <p className="card-text">{this.props.description}</p>
                    <p className="card-text">{this.props.uploadedDate}</p>
                    <p className="card-text">Deadline: {this.props.deadline}</p>
                    <p className="card-text">Required: {this.props.quantity || "0"} cakes</p>
                    <p><br/>{this.props.status === "unaccepted" ? "Waiting for response..." : "Your order has been accepted"}</p>
                </div>
            </div>
    );
  }
}

export default UploadCakeShowUserCard;