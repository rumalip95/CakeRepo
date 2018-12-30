import React, { Component } from 'react';
import ShopNavbar from '../nav_bar/ShopNavbar'
import Footer from "../footer/Footer"
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import { cakeProvidersCakeData } from '../serviceprovider/CakeProvidersCakeData';
import CakeProvidersCakeCard from '../serviceprovider/CakeProvidersCakeCard';
import { withRouter } from "react-router-dom"
import UploadCakeProviderCake from '../uploadcake/UploadCakeProviderCake.js'
import Uploading from "../../screens/Uploading"
import {cakeData} from '../order/UploadedImageOrderData';
import UploadedImageOrderCard from '../order/UploadedImageOrderCard';


class CustomizingOrder extends Component {

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
    
      

    renderCakeArray=(type)=>{
        return this.state.orders[type].map(ele => {
              return (
                <UploadedImageOrderCard
                  id={ele._id}
                  key={ele._id}
                  description={ele.description || ele.cakeId[0].text || ""}
                  uploadDate={ele.uploadDate}
                  deadline={ele.deadline}
                  buttonText={"Accept"}
                  buttonText2={"Decline"}
                  image={ele.image || ele.cakeId[0].image || ""}
                  quantity={ele.quantity}
                />
              )
            })
      }

      


      renderToRow = (array) => {
        let finalArray = [];
        const chunk = 2;
        let i, j, tempArray, renderRow;
        for (i = 0, j = array.length; i < j; i += chunk) {
            tempArray = array.slice(i, i + chunk);
            renderRow = (
                <div key={i} className="row">
                    {[tempArray]}
                </div>
            )
            finalArray.push(renderRow)
        }
        return finalArray;
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    getImageString = (imageString) => {
        this.setState({
            image: imageString
        })
    }

    componentDidMount(){
        this.props.socket.emit("GET_ORDERS");
        this.props.socket.on("ORDERS_LIST", data => {
            // console.log(data)
            let processD = {
                uploadPhoto: data.uploadPhoto[0] || [], 
                offTheShelf: data.offTheShelf[0] || [],
                custom: data.custom[0] || []
            }
            console.log(processD)
          this.setState({
            orders: processD
          })
        })
      }

    

  render() {
    var uploadedArray = this.renderToRow(this.renderCakeArray("uploadPhoto"));
    var customArray = this.renderToRow(this.renderCakeArray("custom"));
    var offTheShelfArray = this.renderToRow(this.renderCakeArray("offTheShelf"));
    return (
      <div>
          <div>
                <img className="logo" src="/dependencies/pics/newlogo2.png" />
                    <ShopNavbar />
         </div>
         <div className="offset-2 col-8" style={{marginTop: "10px"}}>
                    {offTheShelfArray.length !== 0 ? offTheShelfArray : (<p>No off the shelf cake orders </p>)}
         </div>
         <div className="offset-2 col-8">
                    {uploadedArray.length !== 0 ? uploadedArray : (<p>No image uploaded cake orders </p>)}
         </div>
         <div className="offset-2 col-8">
                    {customArray.length !== 0 ? customArray : (<p>No custom uploaded cake orders </p>)}
         </div>
        <div>
            <Footer/>
        </div>
      </div>
    );
  }
}

export default withRouter(CustomizingOrder);