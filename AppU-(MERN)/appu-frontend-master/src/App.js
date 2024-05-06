import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
// import Index from './components/Index';
// import Offers from './components/Offers';
import MyAccount from './components/MyAccount';
import List from './components/List';
import Home from './components/home';
import NotFound from './components/NotFound';
// import Thanks from './components/Thanks';
// import Extra from './components/Extra';
import Login from './components/Login';
import Register from './components/Register';
// import TrackOrder from './components/TrackOrder';
// import Invoice from './components/Invoice';
// import Checkout from './components/Checkout';
import Detail from './components/Detail';
import Business from './components/views/business/businessSteps/Register'
import MenuItem from './pages/menuItem'
import Dashboard from './pages/Dashboard'
import MenuItemCategory from './pages/MenuItemCategories';
import BusinessCategory from './pages/businessCategories';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-select2-wrapper/css/select2.css';
import './App.css';
import BusinessProfile from './pages/businessProfile';

class App extends React.Component  {
  render() {
    
    return (
      <>
          {
            (this.props.location.pathname!=='/login' &&
            this.props.location.pathname!=='/register' &&
            this.props.location.pathname!=='/register/business' &&
            this.props.location.pathname!=='/dashboard' &&
            this.props.location.pathname!=='/menuItem' &&
            this.props.location.pathname!=='/menuItemCategories' &&
            this.props.location.pathname =='/Detail' &&
            this.props.location.pathname!=='/businessCategories') &&
            this.props.location.pathname!=='/' ? <Header/> :''
          }
          {
            (this.props.location.pathname==='/menuItem' ||
            this.props.location.pathname==='/menuItemCategories' ||
            this.props.location.pathname==='/businessProfile' ||
            this.props.location.pathname==='/businessCategories') ? <Dashboard /> : ''
          }
          {
            window.location.host.split(".")[0] !== "appu" ? <Detail urlKey={window.location.host.split(".")[0]}/> :
          <Switch>
            {/* <Route path="/" exact component={Index} /> */}
            {/* <Route path="/offers" exact component={Offers} /> */}
            <Route path="/" exact component={Home} />
            <Route path="/list" exact component={List} />
            <Route path="/myaccount" component={MyAccount} />
            <Route path="/404" exact component={NotFound} />
            {/* <Route path="/extra" exact component={Extra} /> */}
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            {/* <Route path="/track-order" exact component={TrackOrder} /> */}
            {/* <Route path="/invoice" exact component={Invoice} /> */}
            {/* <Route path="/checkout" exact component={Checkout} /> */}
            {/* <Route path="/thanks" exact component={Thanks} /> */}
            <Route path="/detail/:id" exact component={Detail} />
            <Route path="/register/business" exact component={Business} />
            <Route path="/menuItem" exact component={MenuItem} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/menuItemCategories" exact component={MenuItemCategory} />
            <Route path="/businessCategories" exact component={BusinessCategory} />
            <Route path="/businessProfile" exact component={BusinessProfile} />
            <Route exact component={NotFound} />
          </Switch>
    }
          {
            (this.props.location.pathname!=='/login' && this.props.location.pathname!=='/register' && this.props.location.pathname!=='/register/business' && this.props.location.pathname!=='/' && this.props.location.pathname==='/detail/:id') ? <Footer/>:''
          }
      </>
    );
  }
}

export default App;
