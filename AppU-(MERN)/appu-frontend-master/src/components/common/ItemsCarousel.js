import React from 'react';
import OwlCarousel from 'react-owl-carousel3';
import MayLikeItem from './MayLikeItem';


class ItemsCarousel extends React.Component {

  render() {  
    let itemLength = this.props.itemsList.length;
    	return (
	      <OwlCarousel 
        nav={itemLength>=5?true:false} 
        loop={itemLength>=5?true:false} 
         {...options}  className="owl-theme owl-carousel-five offers-interested-carousel ">
	        { this.props.itemsList && this.props.itemsList.map((item) => 
				<div  className="item item-carousel itemcarousel" key={item._id}>
					<MayLikeItem className="itemcarousel"
						title={item.name}
						price={item.menuitems.length + ' items'}
						image={item.image}
						imageClass='img-fluid'
						imageAlt='Menu Category'
					/>
				</div>
			 )
			}
	      </OwlCarousel>
	    );
	}
  
}


  const options={
    responsive: {
          0:{
              items:2,
          },
          600:{
              items:3,
          },
          1000: {
            items: 4,
          },
          1200: {
            items: 5,
          },
        },
      
      startPosition:0,
      lazyLoad: true,
      pagination: "false",
      dots: false,
      autoPlay: 2000,
      navText: ["<i class='icofont-thin-left'></i>", "<i class='icofont-thin-right'></i>"]
  }
  


  


export default ItemsCarousel;