import React, { useEffect, useState } from "react";
import { Link, history } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Form,
  InputGroup,
  
  Tab,
  Nav,
  Image,
  Badge,
  Card
} from "react-bootstrap";
import { PageHeader, Space, Drawer,Button } from 'antd';
import {
	MenuOutlined,
  } from '@ant-design/icons';
import Accordion from 'react-bootstrap/Accordion';
import ItemsCarousel from './common/ItemsCarousel';
// import GalleryCarousel from './common/GalleryCarousel';
import CheckoutItem from './common/CheckoutItem';
// import BestSeller from './common/BestSeller';
import QuickBite from "./common/QuickBite";
import StarRating from "./common/StarRating";
import RatingBar from "./common/RatingBar";
import Review from "./common/Review";
import Icofont from "react-icofont";
import { useHistory, withRouter } from "react-router";
import { useLocation } from "react-router-dom";
import { getBusinessesById } from "./services/Api/Business/index";
import { getBusinessesByUrlKey } from "./services/Api/Business/index";
import { createOrder } from './services/Api/SignUp';
import apiConstant from "../constant/appConstant";
import { getMenuItemCategories } from "../components/services/Api/MenuItem";

const Detail = (props) => {
	const user = JSON.parse(localStorage.getItem('user'));

	const history = useHistory()
  const location = useLocation();
  const {
	match: { params },
	urlKey
  } = props;
  var { id } = params;
  const [state, setState] = useState({
	showAddressModal: false,
	orderItems: [],
	itemsList: [],
	orderPrice: 0,
	discountAmount: 0,
	users: [
	],
	businessList: {},
	categoriesList: [],
	filteredCategoriesList: [],
	checkoutUrl: ''
  });
  useEffect(() => {
	  if(user && user.id) {
		  history.push("/dashboard")
	  }
  }, [user, history])
  useEffect(() => {
	getBusinessById();
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
	if(!state.orderItems.length) {
		return;
	}
	updatePrice();
	updateCheckoutUrl();
}, [state.orderItems])

  // const  hideAddressModal = () => setState({ showAddressModal: false });
  let getQty = ({id, variantId, quantity, price}) => {
	let items = [...state.orderItems];
	let itemIndex = !variantId ? items.findIndex(item => item.id === id)
	: items.findIndex(item => item.id === id && item.variantId === variantId);
	if(itemIndex === -1) {
		let itemOrig = state.itemsList.find(item => item._id === id);
		if(!variantId) {
			items.push({
				id: itemOrig._id,
				quantity: quantity,
				price: price,
				name: itemOrig.name
			});
		} else {
			items.push({
				id: itemOrig._id,
				quantity: quantity,
				price: price,
				variantId: variantId,
				name: itemOrig.name
			});
		}
	} else {
		if(quantity === 0) {
			items.splice(itemIndex, 1);
		} else {
			items[itemIndex].quantity = quantity;
		}
	}
	setState((preState) => ({
		...preState,
		orderItems: items,
	  }));
  }

  let showVariants = ({id}) => {
	let items = [...state.orderItems];
  }

  const placeOrder = () => {
	  let orderData = {
		  orderItems: state.orderItems,
		  businessId: state.businessList.id,
		  urlKey: state.businessList.urlKey,
		  totalPrice: state.orderPrice,
		  discount: state.discountAmount
	  };
	createOrder(orderData);
	window.open(state.checkoutUrl, "_blank");
  }

  const updatePrice = () => {
	  let items = [...state.orderItems];
	  let price = 0;
	  items.forEach(item => {
		price += item.price * item.quantity;
	  });
	  let discount = (state.businessList.appuDiscount/100*price).toFixed(0);
	  price = price - discount;
	  price = price.toFixed(0);
	  setState((preState) => ({
		...preState,
		orderPrice: price,
		discountAmount: discount,
	  }));
  }

  const updateCheckoutUrl = () => {
	let items = [...state.orderItems];
	let whatsappurl = 'https://wa.me/'+state.businessList.whatsAppNumber+'?text=';
	let textmsg = `New Order from AppU! \n
Order Items: \n
`;
	let price = 0;
	state.orderItems.forEach(item=> {
		textmsg = textmsg + item.name + (item.variantId?(' - ' + item.variantId): '') + ' x ' + item.quantity + ' - ' + item.price + ' \n';
		price += item.price * item.quantity;
	});
	let discount = state.businessList.appuDiscount/100*price;
	  price = price - discount;
	  price = price.toFixed(0);
	textmsg = textmsg + 'Total Price: ' + price;
	textmsg = encodeURIComponent(textmsg);
	whatsappurl +=textmsg;
	setState((preState) => ({
		...preState,
		checkoutUrl: whatsappurl
	  }));
  };

  const getImageUrl = (img) => {
	if(img === "N/A") {
	  return "/img/2.jpg";
	} else if (img && img.indexOf('http') === -1) {
	  return `${apiConstant.BACKEND_BASE_URL}/public/images/uploads/${img}`;
	} else {
	  return img;
	}
  }

  const getStarValue = ({ value }) => {
	console.log(value);
	//console.log(quantity);
  };

  const getBusinessById = async () => {
	let results;
	if(!id){
		results = await getBusinessesByUrlKey(urlKey);
	} else {
		results = await getBusinessesById(id);
	}
	if (results.data.status === 200) {
	  console.log(results);
	  id = results.data.business.id;
	  setState((preState) => ({
		...preState,
		businessList: results.data.business,
	  }));
	}
	getMenuItemCategory(results.data.business.id);
  };

	const getMenuItemCategory = async (id) => {
		const results = await getMenuItemCategories(id);
		console.log('Menu: ');
		console.log(results);
		if (results.data.status === 200) {
			setState((prevState) => ({
			...prevState,
			categoriesList: results.data.result,
			filteredCategoriesList: results.data.result,
			itemsList: [].concat.apply([], results.data.result.map(resItem => resItem.menuitems)),
			showButton: true,
			}));
		}
	};

	const filterItems = (value) => {
		const categories = [...state.categoriesList];
		let filteredCats = [];
		categories.forEach(category => {
			var filteredMeunItems = [];
			category.menuitems.forEach((item) => {
				let str = item.name.toLowerCase();
				if(str.indexOf(value.val) > -1) {
					filteredMeunItems.push(item);
				};
			});
			if(filteredMeunItems.length) {
				filteredCats.push({
					...category,
					menuitems: filteredMeunItems
				})
			}
		});
		setState((prevState) => ({
			...prevState,
			filteredCategoriesList: filteredCats,
		}));
	};

	const getSrcImage = (img) => {
		if(img && img.indexOf('http') === -1) {
			return `${apiConstant.BACKEND_BASE_URL}/public/images/uploads/` + img;
		} else {
			return img;
		}
	}
	const [visible, setVisible] = useState(false);
	
	const openDrawer = () => {
		setVisible(true);
	  };
	  const onClose = () => {
		setVisible(false);
	  };


  return (
	<>
	<div className="appu-home"></div>
	<div className="home-header">
					<PageHeader
						ghost={false}
						title={<a
							href="http://appu.pk"
						><Image
							width={100}
							height={56}
							src="./img/Logo.png"
							preview={false}
						
						/></a>}
						extra={(
							<div>
								<Space size="large" className="hide-below-md">
									<a href="http://appu.pk/list"><Button type="Ghost" className="header-view-button" size="large">View all Restaurants</Button></a>
									<a href="http://appu.pk/register"><Button type="primary" className="header-list-button" size="large">List your Business</Button></a>
									<a href="http://appu.pk/login"><Button type="primary" className="header-login-button" size="large">Login</Button></a>
								</Space>
								<MenuOutlined className="show-below-md menu-icon" onClick={openDrawer}/>
							</div>
						)}
					/>
				</div>
				<Drawer title="AppU" placement="right" onClose={onClose} visible={visible}>
					<div><a href="http://appu.pk/list"><Button type="Ghost" className="header-view-button" size="large">View all Restaurants</Button></a></div>
					<div><a href="http://appu.pk/register"><Button type="Ghost" className="header-view-button" size="large">List your Business</Button></a></div>
					<div><a href="http://appu.pk/login"><Button type="Ghost" className="header-view-button" size="large">Login</Button></a></div>
				</Drawer>
	 <section className="restaurant-detailed-banner">
		<div className="text-center">
		  {state && state.businessList ? (
			<Image
			  fluid
			  className="cover"
			  alt="osahan"
			  src={
				state &&
				state.businessList &&
				state.businessList.image !== "N/A"
				  ? getSrcImage(state.businessList.image)
				  : "/img/2.jpg"
			  }
			/>
		  ) : (
			"/img/mall-dedicated-banner.png"
		  )}
		</div>
		<div className="restaurant-detailed-header">
		  <Container>
			<Row className="d-flex align-items-end">
			  <Col md={8}>
				<div className="restaurant-detailed-header-left">
				  {state && state.businessList ? (
					<Image
					  fluid
					  className="mr-3 float-left"
					  alt="appu"
					  src={
						state &&
						state.businessList &&
						state.businessList.image !== "N/A"
						  ? getImageUrl(state.businessList.image)
						  : "/img/2.jpg"
					  }
					/>
				  ) : (
					"/img/mall-dedicated-banner.png"
				  )}
				  <h2 className="text-white">
					{state && state.businessList && state.businessList.name
					  ? state.businessList.name
					  : ""}
				  </h2>
				  <p className="text-white mb-1"><Icofont icon="location-pin" /> {state && state.businessList && state.businessList.address
					  ? state.businessList.address
					  : ""} <Badge  variant="success">OPEN</Badge>
							</p>
				  <p className="text-white mb-0">
					<Icofont icon="food-cart" />{" "}
					{state && state.businessList && state.businessList.categories
					  ? state.businessList.categories.map(category => category + ", ")
					  : ""}
				  </p>
				  {/* <p className="text-white mb-0"><Icofont icon="food-cart" /> North Indian, Chinese, Fast Food, South Indian
							</p> */}
				</div>
			  </Col>
			  <Col md={4}>
				<div className="restaurant-detailed-header-right text-right">
							<Button style={{ background: "#02b44f",borderColor:"#02b44f",borderRadius:"3px", height:"45px", margin:"-18px 0 18px",minWidth:"130px",padding:"7px"}} variant='success' type="button"><Icofont icon="clock-time" />&nbsp;
						 { state && state.businessList && state.businessList.startTime
					  ? state.businessList.startTime
					  : ""} - {state && state.businessList && state.businessList.endTime
					  ? state.businessList.endTime
					  : ""}
							</Button>
							<h6 className="text-white mb-0 restaurant-detailed-ratings">
							   {/* <span className="generator-bg rounded text-white">
								  <Icofont icon="star" /> 3.1
							   </span> 23 Ratings   */}
							   <Icofont icon="motor-biker" className="ml-3" /> 
							   {
							 state && state.businessList && state.businessList.deliveryOrPickup && state.businessList.deliveryOrPickup.delivery==true&& state.businessList.deliveryOrPickup.pickUp==false? "Delivery Available"
							 :state && state.businessList && state.businessList.deliveryOrPickup && state.businessList.deliveryOrPickup.delivery==true && state.businessList.deliveryOrPickup.pickUp==true ? "Both Delivery & Pickup Available" :
							 "Only Pickup"}
							</h6>
						 </div>
			  </Col>
			</Row>
		  </Container>
		</div>
	  </section>

	  <Tab.Container defaultActiveKey="first">
		<section className="offer-dedicated-nav bg-white border-top-0 shadow-sm">
		  <Container>
			<Row>
			  <Col md={12}>
				{/* <span className="restaurant-detailed-action-btn float-right">
							 <Button variant='light' size='sm' className="border-light-btn mr-1" type="button"><Icofont icon="heart" className='text-danger' /> Mark as Favourite</Button>
							 <Button variant='light' size='sm' className="border-light-btn mr-1" type="button"><Icofont icon="cauli-flower" className='text-success' />  Pure Veg</Button>
							 <Button variant='outline-danger' size='sm' type="button"><Icofont icon="sale-discount" />  OFFERS</Button>
						  </span> */}
				<Nav id="pills-tab">
				  <Nav.Item>
					<Nav.Link eventKey="first">Menu</Nav.Link>
				  </Nav.Item>
				  {/* <Nav.Item>
								<Nav.Link eventKey="second">Gallery</Nav.Link>
							 </Nav.Item>
							 <Nav.Item>
								<Nav.Link eventKey="third">Restaurant Info</Nav.Link>
							 </Nav.Item>
							 <Nav.Item>
								<Nav.Link eventKey="fourth">Book A Table</Nav.Link>
							 </Nav.Item>
							 <Nav.Item>
								<Nav.Link eventKey="fifth">Ratings & Reviews</Nav.Link>
							 </Nav.Item> */}
				</Nav>
			  </Col>
			</Row>
		  </Container>
		</section>
		<section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4">
		  <Container>
			<Row>
			  <Col md={8}>
				<div className="offer-dedicated-body-left">
				  <Tab.Content className="h-100">
					<Tab.Pane eventKey="first">
					<div id="#menu" class="bg-white rounded shadow-sm p-4 mb-4 explore-outlets">
					  {/* <h5 className="mb-4">Recommended</h5> */}
						  <Form className="explore-outlets-search mb-4">
							  <InputGroup>
								<Form.Control
									type="text"
									placeholder="Search your favorite dish..."
									onChange={e => filterItems({ val: e.target.value })}
								/>
								<InputGroup.Append>
									<Button style={{height:"50px"}} type="button" variant="link">
									<Icofont icon="search" />
									</Button>
								</InputGroup.Append>
							  </InputGroup>
						  </Form>
						  
							<h6 className="mb-3">Most Popular { state && state.businessList && state.businessList.appuDiscount ? <Badge variant="success"> <Icofont icon="tags" /> {state.businessList.appuDiscount}% Off on appU order </Badge>: ""}</h6>
						
						<div className="ItemsCarousel"><ItemsCarousel itemsList={state.categoriesList}/></div>
					  </div>

					  {/* <Row>
										  <h5 className="mb-4 mt-3 col-md-12">Best Sellers</h5>
										  <Col md={4} sm={6} className="mb-4">
											 <BestSeller 
												id={1}
										   		title='World Famous'
												subTitle='North Indian • American • Pure veg'
											  	imageAlt='Product'
												image='img/list/1.png'
												imageClass='img-fluid item-img'
												price={250}
												priceUnit='$'
												isNew={true}
												showPromoted={true}
												promotedVariant='dark'
												favIcoIconColor='text-danger'
												rating='3.1 (300+)'
												// getValue={getQty}
										   	/>
										  </Col>

										  <Col md={4} sm={6} className="mb-4">
											 <BestSeller 
												id={2}
										   		title='The osahan Restaurant'
												subTitle='North Indian • American • Pure veg'
											  	imageAlt='Product'
												image='img/list/6.png'
												imageClass='img-fluid item-img'
												price={250}
												priceUnit='$'
												qty={1}
												showPromoted={true}
												promotedVariant='dark'
												favIcoIconColor='text-danger'
												rating='3.1 (300+)'
												// getValue={getQty}
										   	/>
										  </Col>

										  <Col md={4} sm={6} className="mb-4">
											 <BestSeller 
												id={3}
										   		title='Bite Me Sandwiches'
												subTitle='North Indian • American • Pure veg'
											  	imageAlt='Product'
												image='img/list/3.png'
												imageClass='img-fluid item-img'
												price={250}
												priceUnit='$'
												showPromoted={true}
												promotedVariant='dark'
												favIcoIconColor='text-danger'
												rating='3.1 (300+)'
												// getValue={getQty}
										   	/>
										  </Col>
									   </Row>  */}
					  <Row>
						{state &&
						  state.filteredCategoriesList &&
						  state.filteredCategoriesList.map((category, index) => (
							<>
							<div class="detail-cat-header">
								{category.image && category.image!== "N/A"
								 &&
								 	<div class="detail-cat-image">
										<Image className={"mr-4 rounded-pill"}
										// fluid
										width="70"
										height="70"
										src={category.image.indexOf('http') === -1
										? `${apiConstant.BACKEND_BASE_URL}/public/images/uploads/${category.image}`: category.image} alt={category.name} />
									</div>
								}
								<div class="detail-cat-name">
									<h3 id={category.name} className="col-md-12">
										{category.name}{" "}
										<small className="h6 text-black-50">{`${category && category.menuitems && category.menuitems.length ? category.menuitems.length : 0 } items`}</small>
									</h3>
								</div>
							  </div>
							  <Col md={12}>
									<div className="bg-white rounded border shadow-sm mb-4">
							  {category.menuitems &&
								category.menuitems.map((menuItem, index) => (
									<div>
									{ !menuItem.variations.length &&
									  <QuickBite
										id={menuItem._id}
										title={menuItem.name}
										description={menuItem.description}
										price={menuItem.price}
										image={menuItem.image}
										priceUnit="Rs "
										getValue={getQty}
										hasVariants={menuItem.variations.length ? true: false}
									  />
									}
									{
										menuItem.variations.length ?
										<Accordion>
  											<Card>
											  <Accordion.Toggle as={Card.Header} eventKey="0">
											  	<QuickBite
														id={menuItem._id}
														title={menuItem.name}
														description={menuItem.description}
														price={menuItem.price}
														image={menuItem.image}
														priceUnit="Rs "
														getValue={getQty}
														hasVariants={menuItem.variations.length ? true: false}
													/>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey="0">
												<Card.Body>
											{menuItem.variations.map((variationItem, index) => (
												<QuickBite
												id={menuItem._id}
												title={variationItem.name}
												description={menuItem.description}
												price={variationItem.price}
												image={menuItem.image}
												priceUnit="Rs "
												getValue={getQty}
												hasVariants={false}
												isVariant={true}
											/>))}
											</Card.Body>
											</Accordion.Collapse>
											</Card>
										</Accordion> : ""
									}
										
									</div>
								))}
								 </div>
								  </Col>
							</>
						  ))}
					  </Row>
					</Tab.Pane>
				  </Tab.Content>
				</div>
			  </Col>
			  <Col md={4}>
					   {state && state.businessList && state.businessList.appuDiscount ?  
				   <div className="bg-white rounded shadow-sm text-white mb-4 p-4 clearfix restaurant-detailed-earn-pts card-icon-overlap">
							 <Image fluid className="float-left mr-3" src="/img/earn-score-icon.png" />
							 <h6 className="pt-0 text-primary mb-1 font-weight-bold">AppU DISCOUNT OFFER</h6>
							 <p className="mb-0">{state.businessList.appuDiscount}% off on all orders from <span className="text-danger font-weight-bold">AppU</span></p>
							 <div className="icon-overlap">
								<Icofont icon="sale-discount" />
							 </div>
						</div> : ""}
					   	<div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
						   <h5 className="mb-1 text-white">Your Order
						   </h5>
						   <p className="mb-4 text-white">{state.orderItems.length} items</p>
						 <div className="bg-white rounded shadow-sm mb-2">
						 	{ state.orderItems.map((orderItem) =>
							 <CheckoutItem 
						 		itemName={orderItem.name}
								price={orderItem.price}
								priceUnit="Rs"
								id={orderItem.id}
								qty={orderItem.quantity}
								show={true}
								variantId={orderItem.variantId}
								minValue={0}
								maxValue={7}
								getValue={getQty}
						 	 />)
							 }
				  		 </div>
						 <div className="mb-2 bg-white rounded p-2 clearfix">
							<Image fluid className="float-left" src="/img/wallet-icon.png" />
							<h6 className="font-weight-bold text-right mb-2">Subtotal : <span className="text-danger">Rs. {(state.orderItems.length) > 0  ? state.orderPrice : 0}</span></h6>
							{/* <p className="seven-color mb-1 text-right">*Extra charges may apply</p> */}
							<p className="text-black mb-0 text-right">You have saved Rs. {state.discountAmount} on this bill</p>
						 </div>
					 	<button onClick={placeOrder} className="btn btn-checkout btn-block btn-lg" disabled= {(state.orderItems.length) > 0 ? false :true} >Place Order
										<Icofont icon="long-arrow-right" /></button>
						  <div className="pt-2"></div>
						  <div className="alert alert-success" role="alert">
							 You have saved <strong>Rs. {state.discountAmount}</strong> on the bill
						  </div>
		   				  <div className="pt-2"></div>
		   				</div>
					   </Col>
			</Row>
		  </Container>
		</section>
	  </Tab.Container>
	</>
  );
};

export default withRouter(Detail);
