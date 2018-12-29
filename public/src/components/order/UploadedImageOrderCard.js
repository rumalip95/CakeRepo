import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class UploadedImageOrderCard extends Component {
  render() {
    return (
      <div className="card col-md-6 col-12 cardStyles">
          <img className="card-img-top" src={this.props.image} width={90} alt="Card cap"/>
          <div className="card-body">
              <p className="card-text">{this.props.description}</p>
              <p className="card-text">{this.props.uploadedDate}</p>
              {this.props.deadline ? <p className="card-text">Deadline: {this.props.deadline}</p> : <div/>}
              {this.props.quantity ? <p className="card-text">Required: {this.props.quantity || "0"} cakes</p> : <div/>}
              {/* <Link style={{color:"#252525"}} to={this.props.to}> */}
              {/* <a  className="btn btn-primary cakeButton" style={{margin:"5px"}}>{this.props.buttonText}</a>
              <a  className="btn btn-primary cakeButton">{this.props.buttonText2}</a> */}
              {/* </Link> */}
          </div>
      </div>
    );
  }
}

export default UploadedImageOrderCard;