import React from 'react';
import PropTypes from 'prop-types'; 
import {Image,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import apiConstant  from "../../constant/appConstant"

class MayLikeItem extends React.Component {
  
	render() {
    	return (
        <Link to='/' 
                onClick={(e) => {
                  e.preventDefault();
                  let trg = document.getElementById(this.props.title);
                  trg && trg.scrollIntoView({ behavior: "smooth", block: "start" });
                }}>
    		<div className={"position-relative " + this.props.boxClass}>
                {/* <Button onClick={this.props.onAdd} className="btn btn-primary btn-sm position-absolute">ADD</Button> */}
                
                {
                  this.props.image && this.props.image.indexOf('http') === -1 &&
                <Image
                  src={this.props.image !== "N/A"
                  ? `${apiConstant.BACKEND_BASE_URL}/public/images/uploads/${this.props.image}`: "/img/1.jpg"} className={this.props.imageClass} alt={this.props.imageAlt} />
                }
                                {
                this.props.image && this.props.image.indexOf('http') !== -1 &&
                <Image
                  src={this.props.image !== "N/A"
                  ? this.props.image : "/img/1.jpg"} className={this.props.imageClass} alt={this.props.imageAlt} />
                }
                <div className='titlecategoryitems'>             
                   {this.props.title?
	               <h6 >{this.props.title}</h6>
	               :""
	            }</div>

              <div className='pricetag' >
	            {this.props.price?
	              <small>{this.props.price}</small>
	               :""
	            }</div>
                  
              
            </div></Link>
		);
	}
}


MayLikeItem.propTypes = {
  onAdd: PropTypes.func,
  image: PropTypes.string.isRequired,
  imageClass: PropTypes.string,
  imageAlt: PropTypes.string,
  boxClass: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
};
MayLikeItem.defaultProps = {
  	imageAlt:'',
    image:'',
    imageClass:'',
    boxClass:'mall-category-item',
    title:'',
    price:'',
}

export default MayLikeItem;