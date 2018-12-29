import React, {Component} from "react";
import ShopNavbar from '../components/nav_bar/ShopNavbar';



class AcceptedOrdersProvider extends Component{

  constructor(props){
    super(props);
    this.state = {
      orders: {
        uploadPhoto: [],
        custom: [],
        offTheShelf: []
      }
    }
  }

  componentDidMount(){
    this.props.socket.emit("GET_ACCEPTED_ORDERS");

    this.props.socket.on("ACCEPTED_ORDERS", data => {
      this.setState({
        orders: data
      })
    })
  }

  render(){
    return(
      <div>
        <div>
          <img className="logo" src="/dependencies/pics/newlogo2.png" />
          <ShopNavbar />
        </div>
      </div>
    )
  }
}

export default AcceptedOrdersProvider;