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