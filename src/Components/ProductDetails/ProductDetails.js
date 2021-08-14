import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import ACTION_TYPES from '../../ReduxStore/Actions/actions';
import Utils from '../../Utils/utils';
import GenericField from './GenericField';
import '../../Styles/ProductDetailsStyle.css'
const uuidv4 = require("uuid/v4");

class ProductDetails extends Component {

    state = {
        name: '',
        description: '',
        price: null
    }

    componentDidMount() {
        const { isOpenFromUrl, productItems, selectedItemNum, setSelectedItem } = this.props;
        if (isOpenFromUrl) {
            setSelectedItem(productItems[selectedItemNum - 1]);
        }
    }

    setInputValue = (event, dynamicKey) => {
        this.setState({ [`${dynamicKey}`]: event.target.value });
    }

    onSaveHandler = () => {
        const { isAddNewItem, addNewItem, updateAddNewItem, selectedItem, editNewItem, clearSelectedItem, isOpenFromUrl } = this.props;
        if (isAddNewItem) {
            addNewItem({ ...this.state, id: uuidv4(), creationDate: new Date().toLocaleString() });
            updateAddNewItem(false);
        } else if (selectedItem) {
            editNewItem({ ...this.state, id: selectedItem.id, creationDate: new Date().toLocaleString() });
            clearSelectedItem();
            if (isOpenFromUrl) {
                window.location.href = `http://${window.location.host}`;
            }
        }
    }

    isFormValid = () => {
        const { name, description, price } = this.state;
        return Utils.isNameFieldValid(name) && Utils.isDescFieldValid(description) && Utils.isPriceFieldValid(price)
    }

    getButtonStyle = () => ({ width: "5rem", float: "right", marginTop: "-2rem" });


    render() {
        const { selectedItem } = this.props;
        const { name, description, price } = this.state;
        return (
            <div className="product-details">
                <div className="product-details-item">
                    <header className="product-details-header">Product Details</header>
                    <Form style={{ padding: "10px" }}>
                        <GenericField
                            controlId="exampleForm.ControlInput1"
                            isInput
                            placeHolder={selectedItem && selectedItem.name}
                            isInvalidAction={!Utils.isNameFieldValid(name)}
                            onChaneHandler={(event) => this.setInputValue(event, 'name')}
                            fieldLabel="Name"
                            feedBackText="Name required, up to 30 characters."
                        />
                        <GenericField
                            controlId="exampleForm.ControlTextarea1"
                            isTextArea
                            placeHolder={selectedItem && selectedItem.description}
                            isInvalidAction={!Utils.isDescFieldValid(description)}
                            onChaneHandler={(event) => this.setInputValue(event, 'description')}
                            fieldLabel="Description"
                            feedBackText=" Description must be up to 200 characters."
                        />
                        <GenericField
                            controlId="exampleForm.ControlInput1"
                            isInput
                            placeHolder={selectedItem && selectedItem.price}
                            isInvalidAction={!Utils.isPriceFieldValid(price)}
                            onChaneHandler={(event) => this.setInputValue(event, 'price')}
                            fieldLabel="Price"
                            feedBackText="Price must be a number larger than 0."
                            controlStyleClass={{ width: "5rem" }}
                        />
                        <Button style={this.getButtonStyle()} variant="outline-success" disabled={!this.isFormValid()} onClick={this.onSaveHandler}>
                            SAVE
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        selectedItem: state.selectedItem,
        isAddNewItem: state.isAddNewItem,
        productItems: state.productItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewItem: (newItem) => dispatch({ type: ACTION_TYPES.ADD_NEW_ITEM, payload: newItem }),
        editNewItem: (updatedItem) => dispatch({ type: ACTION_TYPES.EDIT_NEW_ITEM, payload: updatedItem }),
        clearSelectedItem: () => dispatch({ type: ACTION_TYPES.CLEAR_SELECTED_ITEM }),
        setSelectedItem: (selectedItem) => dispatch({ type: ACTION_TYPES.SET_SELECTED_ITEM, payload: selectedItem }),
        updateAddNewItem: (val) => dispatch({ type: ACTION_TYPES.UPDATE_ADD_NEW_ITEM_FLAG, payload: { isAddNewItem: val } }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
