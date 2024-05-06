import React from 'react';
import {Image,Badge, Media, Button} from 'react-bootstrap';
import PropTypes from 'prop-types'; 
import Icofont from 'react-icofont';
import apiConstant  from "../../constant/appConstant"

class QuickBite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.qty || 0,
      show: this.props.show || true,
      max:this.props.maxValue || 5,
      min:this.props.minValue || 0
    };
  }

  IncrementItem = () => {
    // if(this.props.hasVariants) {
    //   this.props.showVariants();
    //   return;
    // }

    if(this.state.quantity >= this.state.max) {

    }else {
        this.setState({
            quantity: this.state.quantity + 1
        });
        if(this.props.isVariant) {
        this.props.getValue({id:this.props.id, variantId: this.props.title, quantity: (this.state.quantity + 1 ), price: this.props.price});
      } else {
        this.props.getValue({id:this.props.id, quantity: (this.state.quantity + 1 ), price: this.props.price});
      }
      }
  }
  DecreaseItem = () => {
    if(this.state.quantity <= (this.state.min)) {

    }else {
      this.setState({ quantity: this.state.quantity - 1 });
      if(this.props.isVariant) {
        this.props.getValue({id:this.props.id, variantId: this.props.title, quantity: (this.state.quantity - 1 ), price: this.props.price});
      } else {
        this.props.getValue({id:this.props.id, quantity: (this.state.quantity - 1 ), price: this.props.price});
      }
    }
  }

  render() {
      return (
      	<div className={`p-3 ${!this.props.hasVariants ? "border-bottom " : ""}`+this.props.itemClass}>
		   {this.props.hasVariants === false && (this.state.quantity===0?
	            <div className="float-right" style={{marginTop: "15px"}}> 
	              <Button variant='outline-secondary' onClick={this.IncrementItem} size="sm">ADD</Button>
	            </div>
	            :
            <div className="count-number float-right" style={{marginTop: "15px"}}>
	               <Button variant="outline-secondary" onClick={this.DecreaseItem} className="btn-sm left dec"> <Icofont icon="minus" /> </Button>
	               <input className="count-number-input" type="text" value={this.state.quantity} readOnly/>
	               <Button variant="outline-secondary" onClick={this.IncrementItem} className="btn-sm right inc"> <Icofont icon="icofont-plus" /> </Button>
	            </div>)
	         }
            {this.props.hasVariants === true &&
            <div className="float-right" style={{marginTop: "7px", fontSize: "30px"}}> 
              <Icofont icon="expand-alt" />
              </div>
            }
		   <Media>
         {
           !this.props.isVariant && !this.props.image && 
           <div className="mr-3"><Icofont icon="ui-press" className={"text-"+this.props.badgeVariant+" food-item"} /></div>
         }
		      {!this.props.isVariant && this.props.image &&
          this.props.image.indexOf('http') === -1 &&
          this.props.image !== "N/A" &&
		      	<Image className={"mr-4 rounded-pill " + this.props.imageClass}
            // fluid
            width="55"
            height="55"
            src={this.props.image !== "N/A"
            ? `${apiConstant.BACKEND_BASE_URL}/public/images/uploads/${this.props.image}`: "/img/1.jpg"} alt={this.props.imageAlt} />
		      }
          {!this.props.isVariant && this.props.image &&
          this.props.image.indexOf('http') !== -1 &&
		      	<Image className={"mr-4 rounded-pill " + this.props.imageClass}
            // fluid
            width="55"
            height="55"
            src={this.props.image !== "N/A"
            ? this.props.image: "/img/1.jpg"} alt={this.props.imageAlt} />
		      }
          {
            (this.props.isVariant || this.props.image === "N/A") &&
            <div style={{marginRight: "1.5rem", height: "55px", width:"55px"}}></div>
          }
		      <Media.Body>
		         <h6 style={{margin: "0"}}>{this.props.title} {this.props.showBadge?<Badge variant={this.props.badgeVariant}>{this.props.badgeText}</Badge>:""}</h6>
		         {this.props.description && this.props.description !== '' ?
              <p className="text-gray mb-0" style={{fontSize: "16px"}}>
                { this.props.description }
              </p> : ''
            }
             <p className="text-gray mb-0">
               {
                 this.props.hasVariants
                 &&
                 <span>From </span>
               }
               {this.props.priceUnit}{this.props.price}
             </p>
		      </Media.Body>
		   </Media>
		</div>
    );
  }
}


QuickBite.propTypes = {
  itemClass:PropTypes.string,
  title: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  image: PropTypes.string,
  imageClass: PropTypes.string,
  showBadge: PropTypes.bool,
  badgeVariant: PropTypes.string,
  badgeText: PropTypes.string,
  price: PropTypes.number.isRequired,
  priceUnit: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  qty: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  getValue: PropTypes.func.isRequired
};
QuickBite.defaultProps = {
  itemClass:'gold-members',
  imageAlt:'',
  imageClass:'',
  showBadge: false,
  price: '',
  priceUnit:'$',
  showPromoted: false,
  badgeVariant: 'danger'
}

export default QuickBite;