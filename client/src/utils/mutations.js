import { gql } from '@apollo/client';

export const ADD_COOK = gql`
    mutation addCook($fullName: String!) {
        addCook(fullName: $fullName) {
            fullName
        }
    }
    `

export const CREATE_SIGNUP = gql`
    mutation createSignup($user: String $menuItem: String $size: String) {
        createSignup(user: $user menuItem: $menuItem size: $size) {
            user {
                _id
            }
            menuItem {
                _id
            }
            size
        }
    }
`

export const CREATE_MENU = gql`
    mutation createMenu($dish: String $cook: String $amount: Int $isPaid: Boolean $menuDate: String) {
        createMenu(dish: $dish cook: $cook amount: $amount isPaid: $isPaid menuDate: $menuDate)  {
            dish {
                _id
            }
            cook {
                _id
            }
            amount
            isPaid
        }
    }
`

export const ADD_DISH = gql`
    mutation addDish($dishName: String! $category: String) {
        addDish(dishName: $dishName category: $category) {
            dishName
            category
        }
    }
`

export const ADD_COST = gql`
    mutation addCost($menuId: ID $amount: Int) {
        addCost(menuId: $menuId amount: $amount) {
            _id
            amount
        }
    }
`

export const MENU_PAID = gql`
    mutation menuPaid($menuId: ID $isPaid: Boolean) {
        menuPaid(menuId: $menuId isPaid: $isPaid) {
            _id
            isPaid
        }
    }
`