import React from "react";
import OwlCarousel from "react-owl-carousel3";
import ProductBox from "../home/ProductBox";
import apiConstant from "../../constant/appConstant"

const CategoriesCarousel = (props) => {
  const { businessCategories } = props;
  const getImageUrl = (img) => {
    if(img === "N/A") {
      return "/img/2.jpg";
    } else if (img && img.indexOf('http') === -1) {
      return `${apiConstant.BACKEND_BASE_URL}/public/images/uploads/${img}`;
    } else {
      return img;
    }
  }

  return (
    <>
      {businessCategories ? (
        <OwlCarousel
          nav
		      loop
          {...options}
          className="owl-carousel-category owl-theme"
        >
          {businessCategories &&
            businessCategories.map((item, index) => (
              <div className="item" key={index + 1}>
                <ProductBox
                  boxClass="osahan-category-item"
                  title={item.name}
                  // counting={index + 1}
                  image={getImageUrl(item.image)}
                  imageClass="img-fluid"
                  imageAlt="carousel"
                  linkUrl="#"
                />
              </div>
            ))}
        </OwlCarousel>
      ) : (
        ""
      )}
    </>
  );
};

const options = {
	loop: true,
	autoWidth:false,
	lazyLoad: true,
	autoplay: true,
	dots: false,
	autoplaySpeed: 1000,
	autoplayTimeout: 2000,
	autoplayHoverPause: true,
    responsiveClass:true,
	nav: true,
  responsive: {
    0: {
      items: 3,
    },
    600: {
      items: 4,
    },
    1000: {
      items: 6,
    },
    1200: {
      items: 8,
    },
  },
  
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
};

export default CategoriesCarousel;
