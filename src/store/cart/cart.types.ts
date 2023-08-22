import {CategoryItemType} from "../categories/categories.types";

export enum CART_ACTION_TYPES {
    SET_CART_ITEMS = "cart/SET_CART_ITEMS",
    SET_IS_CART_OPEN = "cart/SET_IS_CART_OPEN"
}

export type CartItemType = CategoryItemType & {
    quantity: number
}