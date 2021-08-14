import React from 'react';
import { Button, Card, Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import ACTION_TYPES from '../ReduxStore/Actions/actions';

import '../Styles/ProductListStyle.css';
import imfPath from '../Images/favicon.ico';

const ProductList = ({
    productItems,
    setSelectedItem,
    deleteItem,
    updateAddNewItem,
    searchField,
    sortBy,
    selectedPage,
    setSelectedPage,
    disabledLast }) => {

    const sortProductItems = () => {
        if (sortBy === 'name') {
            return productItems && [...productItems].sort((a, b) => a.name.localeCompare(b.name));
        }
        if (sortBy === 'creationDate') {
            return productItems && [...productItems].sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
        }
    }

    const getProductsList = () => {
        if (productItems) {
            const sortedProducts = sortProductItems();
            const checkResult = (item) => item.name.includes(searchField) || item.description.includes(searchField);
            return (searchField !== undefined && searchField !== '') ? sortedProducts.filter(item => checkResult(item)) : sortedProducts;
        }
    }

    return (
        <div className="product-list">
            {getProductsList() && getProductsList().map((item, ind) => (
                <div key={ind} className="product-item">
                    <Card style={{ border: "solid 2px black" }}>
                        <Card.Body>
                            <Card.Img onClick={() => {
                                setSelectedItem(item);
                                updateAddNewItem(false);
                            }} style={{ width: "10%", height: "70%", position: "absolute", cursor: "pointer" }} variant="top" src={imfPath} />
                            <Card.Title style={{ marginLeft: "11%" }}>{item.name}</Card.Title>
                            <Card.Text style={{ marginLeft: "11%" }}>{item.description}</Card.Text>
                            <div className="delete-button">
                                <Button variant="danger" onClick={() => deleteItem(item)}>Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>

                </div>
            ))}
            <Pagination>
                <Pagination.Prev disabled={selectedPage === 1} onClick={() => setSelectedPage('-')} />
                <Pagination.Item>{selectedPage}</Pagination.Item>
                <Pagination.Next disabled={disabledLast} onClick={() => setSelectedPage('+')} />
            </Pagination>
        </div >
    )
}


const mapStateToProps = (state) => {
    return {
        selectedItem: state.selectedItem,
        isAddNewItem: state.isAddNewItem,
        searchField: state.searchField,
        sortBy: state.sortBy
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedItem: (selectedItem) => dispatch({ type: ACTION_TYPES.SET_SELECTED_ITEM, payload: selectedItem }),
        deleteItem: (deletedItem) => dispatch({ type: ACTION_TYPES.DELTE_ITEM, payload: deletedItem }),
        updateAddNewItem: (val) => dispatch({ type: ACTION_TYPES.UPDATE_ADD_NEW_ITEM_FLAG, payload: { isAddNewItem: val } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
