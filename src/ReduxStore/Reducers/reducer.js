const setSessionStorage = (state) => {
    sessionStorage.setItem('product-items', JSON.stringify(state));
}

const getSessionStorage = () => {
    const state = sessionStorage.getItem('product-items');
    return state ? { sortBy: 'name', searchField: '', productItems: [...JSON.parse(state).productItems] } : { productItems: [], sortBy: 'name', searchField: '' }
}

const AppReducer = (state = getSessionStorage(), action) => {
    switch (action.type) {
        case "SET_SELECTED_ITEM":
            return { ...state, selectedItem: action.payload };
        case "ADD_NEW_ITEM":
            const productItems = state.productItems ? [...state.productItems, action.payload] : [{ ...action.payload }];
            setSessionStorage({ productItems })
            return { ...state, productItems };
        case "EDIT_NEW_ITEM":
            const updatedItems = [...state.productItems.map((item => item.id === action.payload.id ? action.payload : item))]
            setSessionStorage({ productItems: updatedItems })
            return { ...state, productItems: updatedItems };
        case "DELTE_ITEM":
            const newItems = [...state.productItems.filter(item => item.id !== action.payload.id)]
            setSessionStorage({ productItems: newItems })
            return { ...state, productItems: newItems };
        case "CLEAR_SELECTED_ITEM":
            return { ...state, selectedItem: null };
        case "UPDATE_ADD_NEW_ITEM_FLAG":
            return { ...state, isAddNewItem: action.payload.isAddNewItem }
        case "SET_SORT_BY_VALUE":
            return { ...state, sortBy: action.payload };
        case "SET_SEARCH_FIELD":
            return { ...state, searchField: action.payload };
        default: return state;
    }
};

export default AppReducer;
