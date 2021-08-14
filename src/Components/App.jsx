import React, { Component } from 'react';
import { connect } from 'react-redux';
import Utils from '../Utils/utils';
import '../Styles/App.css';
import HeaderView from '../Views/HeaderView';
import ControlButtonsView from '../Views/ControlButtonsView';
import ProductList from '../Views/ProductList';
import ProductDetails from './ProductDetails/ProductDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  
  state = {
    selectedPage: 1
  }

  setSelectedPage = (operation) => this.setState(prevState => ({selectedPage: (operation === '+' ? prevState.selectedPage + 1: prevState.selectedPage - 1)}));
  isShowProductDetails = () => (this.props.selectedItem || this.props.isAddNewItem) && !window.location.pathname.split("/").pop();

  render() {
    const newArr = Utils.chunckedArray([...this.props.productItems], 5)
   return (
     <Router>
       <HeaderView />
       <ControlButtonsView />
       <div className="section-3">
         <ProductList productItems={newArr[this.state.selectedPage - 1]} selectedPage={this.state.selectedPage} setSelectedPage={this.setSelectedPage} disabledLast={this.state.selectedPage === newArr.length} />
         {this.isShowProductDetails() && <ProductDetails />}
         <Switch>
           <Route exact path="/product/:selectedItem">
             {<ProductDetails isOpenFromUrl selectedItemNum={window.location.pathname.split("/").pop()} />}
           </Route>
         </Switch>
       </div>
     </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedItem: state.selectedItem,
    isAddNewItem: state.isAddNewItem,
    productItems: state.productItems
  }
}

export default connect(mapStateToProps)(App);
