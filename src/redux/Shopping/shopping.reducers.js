import { Categories } from "../../api/Categories";
import { Products } from "../../api/Products";
import { actionsTypes } from "./shopping.action-types";

const initialState = {
  cart: [],
  currentItem: {},
  categories: Categories,
  products: Products,
  category: {},
  shopName: "Mohsin Books",
};

const shoppingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.ADD_TO_CART:
      let prod;
      state.categories.forEach((category) => {
        category.products.forEach((product) => {
          if (
            product.id === action.payload.item_id &&
            product.category_id === action.payload.category_id
          ) {
            prod = product;
          }
        });
      });

      const inCart = state.cart.find((item) =>
        item.id === action.payload.item_id ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.item_id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cart, { ...prod, quantity: 1 }],
      };
    case actionsTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.item_id),
      };
    case actionsTypes.ADJUST_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case actionsTypes.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    case actionsTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    case actionsTypes.GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default shoppingReducer;
