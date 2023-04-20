import { gql } from '@apollo/client'

export const GET_ALL_COOKS = gql`
    query getAllCooks {
       cooks {
        _id
        fullName
       }
    }
`

export const GET_ALL_MENUS = gql`
    query getAllMenus {
        menus {
            _id
            cook {
                fullName
            }
            dish {
                dishName
            }
        }
    }
`

export const GET_SINGLE_SIGNUP = gql`
    query getSingleSignup {
        user
        menuItem
        size
    }    
`