import React, { useEffect, useState } from 'react';
import { PageHeader, Button, Image, Row, Col, Space, Input, AutoComplete, Drawer } from 'antd';
import {
	FacebookFilled,
	TwitterSquareFilled,
	InstagramFilled,
	HeartFilled,
	MenuOutlined,
  } from '@ant-design/icons';
import { SelectProps } from 'antd/es/select';
import {Link} from 'react-router-dom';
import apiConstant from "../constant/appConstant"
import {
	getCategoriesList,
	searchBusiness,
  } from "./services/Api/Business/index"

const Home = () => {

	const [visible, setVisible] = useState(false);
	const [val, setVal] = useState([]);
	const [url, setUrl] = useState('');

	const searchResult = () =>{
	
		return val.map((curElm) =>
				 {
					return {
						value: curElm.urlKey,
						label:curElm.name
					};
				}
				);}
	
				const handleSearch = async (value) => {
					const result = await searchBusiness(value);
					console.log(result.data.searchResult)
					 setVal(result.data.searchResult);
					setOptions(value ? searchResult(value) : []);	
				  };
	
		const [options, setOptions] = useState([]);	
		const onSelect = (value)=>{
			window.open(`http://${value}.appu.pk`)
			return val.map((curElm) =>
			{
				return{
					value: curElm.name,
					label: curElm.urlKey
				}
			}
	
		)};
	
	
	
		//=====================================My Work======================

	const openDrawer = () => {
	  setVisible(true);
	};
	const onClose = () => {
	  setVisible(false);
	};

    return (
		<>
			<div className="appu-home">
				<div className="home-header">
					<PageHeader
						ghost={false}
						title={<Image
							width={100}
							height={56}
							src="./img/Logo.png"
							preview={false}
						/>}
						extra={(
							<div>
								<Space size="large" className="hide-below-md">
									<Link to="/list"><Button type="Ghost" className="header-view-button" size="large">View all Restaurants</Button></Link>
									<Link to="/register"><Button type="primary" className="header-list-button" size="large">List your Business</Button></Link>
									<Link to="/login"><Button type="primary" className="header-login-button" size="large">Login</Button></Link>
								</Space>
								<MenuOutlined className="show-below-md menu-icon" onClick={openDrawer}/>
							</div>
						)}
					/>
				</div>
				<Drawer title="AppU" placement="right" onClose={onClose} visible={visible}>
					<div><Link to="/list"><Button type="Ghost" className="header-view-button" size="large">View all Restaurants</Button></Link></div>
					<div><Link to="/register"><Button type="Ghost" className="header-view-button" size="large">List your Business</Button></Link></div>
					<div><Link to="/login"><Button type="Ghost" className="header-view-button" size="large">Login</Button></Link></div>
				</Drawer>
				<div className="home-content">
					<Row>
						<Col xs={24} sm={24} md={12}>
							<div className="home-main-text">
								Instantly
								<span class="home-text-green"> connect </span>
								with any business in
								<span class="home-text-green"> Pakistan</span>
							</div>
							<div className="home-banner-secondary-text">
								Get direct access to every menu, eatery, and service provider... no middlemen!
							</div>
							<div className="home-search-container">
							<AutoComplete
									className="appu-search-dropdown"
									dropdownMatchSelectWidth={252}
									options={options}
									onSelect={onSelect}
									onSearch={handleSearch}
								>
									<Input.Search size="large" placeholder="Search for a business" enterButton
									/>
								</AutoComplete>
							</div>
						</Col>
						<Col xs={24} sm={24} md={12} className="home-banner-container">
							<Image
								src="./img/landing-main-image.png"
								preview={false}
							/>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<div className="home-how-section">
								<div className="how-secondary">
									DIRECT AND EASY
								</div>
								<div className="how-primary">
									Browse the menu and order directly through <span className="home-text-green">Whatsapp!</span>
								</div>
							</div>
						</Col>
					</Row>
					<Row>
						<Col xs={24} sm={24} md={8}>
							<div className="how-col-container">
								<div className="home-grey-dot"></div>
								<div className="how-col-header">Easy to Order</div>
								<div className="how-col-exp">You only need a few steps in ordering food.</div>
							</div>
						</Col>
						<Col xs={24} sm={24} md={8}>
							<div className="how-col-container">
								<div className="home-grey-dot"></div>
								<div className="how-col-header">Updated Menus</div>
								<div className="how-col-exp">No more fumbling around with outdated prices.</div>
							</div>
						</Col>
						<Col xs={24} sm={24} md={8}>
							<div className="how-col-container">
								<div className="home-grey-dot"></div>
								<div className="how-col-header">Quicker Connect</div>
								<div className="how-col-exp">One-to-one connect with the outlet means no misunderstanding</div>
							</div>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<div className="home-how-section home-align-left home-full-width-bg">
								<div className="how-secondary">
									TOP RATED BUSINESSES ON AppU
								</div>
								<div className="how-primary home-align-left home-no-horizontal-margin">
									Find the best businesses on <span className="home-text-green">AppU!</span>
								</div>
							</div>
						</Col>
					</Row>
					<Row className="home-how-section home-align-left home-bg-section">
						<Col xs={24} sm={24} md={24} lg={12}>
							<div>
								<div className="how-secondary">
									WE ARE ALL AROUND PAKISTAN
								</div>
								<div className="how-primary home-align-left home-no-horizontal-margin">
									Get your <span className="home-text-green">Business</span> Listed with Us.
								</div>
							</div>
							<div className="how-col-exp home-align-left home-getlisted">
								Our listing process is super simple. 
								Just whatsapp us a copy of your menu and we'll input the details for you. 
								Our onboarding team will also give you a quick tour of the process and explain why it makes to go online via appu! 
							</div>
							<Button type="primary" className="header-list-button home-spacing-top" size="large">Get Listed Today!</Button>
						</Col>
					</Row>
				</div>
			</div>
			<div class="appu-footer">
				<Row>
					<Col xs={24} sm={24} md={10}>
						<Image
							width={100}
							height={56}
							src="./img/Logo.png"
							preview={false}
						/>
						<div className="how-col-exp home-align-left home-getlisted home-spacing-top">
						We believe in a future where access to commerce, from the biggest chains to smallest shops, 
						to home chefs, service providers, and everything in between, is democratized digitally. 
						</div>
						<div class="footer-icons">
							<Space size="large">
								<FacebookFilled />
								<TwitterSquareFilled />
								<InstagramFilled />
							</Space>
						</div>
					</Col>
					<Col xs={0} sm={0} md={2}></Col>
					<Col xs={8} sm={8} md={4}>
						<div className="footer-col">
							<div className="footer-cat">Company</div>
							<div className="footer-item">Why AppU</div>
							<div className="footer-item">List your Business</div>
						</div>
					</Col>
					<Col xs={8} sm={8} md={4}>
						<div className="footer-col">
							<div className="footer-cat">About Us</div>
							<div className="footer-item">About Us</div>
							<div className="footer-item">Features</div>
						</div>
					</Col>
					<Col xs={8} sm={8} md={4}>
						<div className="footer-col">
							<div className="footer-cat">Support</div>
							<div className="footer-item">Feedback</div>
							<div className="footer-item">Contact Us</div>
						</div>
					</Col>
				</Row>
				<Row className="footer-copyright">
					All rights reserved. AppU, Made with&nbsp;<span className="home-text-green heart-icon"><HeartFilled /></span>&nbsp;in Pakistan © 2022
				</Row>
			</div>
		</>
	)
}


export default Home;