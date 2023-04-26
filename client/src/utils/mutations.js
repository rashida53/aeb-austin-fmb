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
    mutation createMenu($dish: String $cook: String ) {
        createMenu(dish: $dish cook: $cook) {
            dish {
                _id
            }
            cook {
                _id
            }
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