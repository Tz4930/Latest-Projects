import React from 'react';
import PropTypes from 'prop-types'; 

class PageTitle extends React.Component {

	render() {
    	return (
	      <section className="breadcrumb-osahan pt-5 pb-5 position-relative text-center pageTitle">
			   <h1 className="textStart" >{this.props.titleStart} </h1>
			   <h1 className="textmiddle" >{this.props.titleMiddle1} </h1>
			 <h1 className="textStart" >{this.props.titleMiddle2} </h1>
			 <h1 className="textmiddle ">{this.props.titleEnd}</h1>
			 
	         {this.props.subTitle?
	         	<h6 className="text-black font-weight-bold h5">{this.props.subTitle}</h6>
	         	:""
	         }
			 
	      </section>
    	);
    }
}

PageTitle.propTypes = {
	titleStart: PropTypes.string.isRequired,
	titleMiddle1: PropTypes.string.isRequired,
	titleMiddle2: PropTypes.string.isRequired,
	titleEnd: PropTypes.string.isRequired,
  subTitle: PropTypes.string
};
PageTitle.defaultProps = {
  subTitle: ''
}

export default PageTitle;