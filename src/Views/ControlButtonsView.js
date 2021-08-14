import React from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import ACTION_TYPES from '../ReduxStore/Actions/actions';
import '../Styles/ControlButtonsStyle.css';

const ControlButtons = ({ updateAddNewItem, clearSelectedItem, setSortBy, setSearchField, searchField }) => {
    return (
        <div className="section-2">
            <div className="button-1">
                <Button style={{ width: "100px" }} variant="outline-success" onClick={() => {
                    updateAddNewItem(true);
                    clearSelectedItem();
                }}>Add</Button>{' '}
            </div>

            <div className="button-2">
                <Form className="d-flex">
                    <FormControl
                        onChange={(event) => setSearchField(event.target.value)}
                        value={searchField}
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                    />
                </Form>
            </div>

            <span className="sort-by">Sort By: </span>
            <div className="button-3">
                <Form.Select onClick={(event) => setSortBy(event.target.value)} aria-label="Default select example">
                    <option value="name">Name</option>
                    <option value="creationDate">Recently Added</option>
                </Form.Select>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        searchField: state.searchField
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        clearSelectedItem: () => dispatch({ type: ACTION_TYPES.CLEAR_SELECTED_ITEM }),

        updateAddNewItem: (val) => dispatch({ type: ACTION_TYPES.UPDATE_ADD_NEW_ITEM_FLAG, payload: { isAddNewItem: val } }),

        setSortBy: (sortBy) => dispatch({ type: ACTION_TYPES.SET_SORT_BY_VALUE, payload: sortBy }),

        setSearchField: (searchField) => dispatch({ type: ACTION_TYPES.SET_SEARCH_FIELD, payload: searchField })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ControlButtons);
