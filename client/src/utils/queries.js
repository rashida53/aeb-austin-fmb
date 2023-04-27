import { gql } from '@apollo/client'

export const GET_ALL_COOKS = gql`
    query getAllCooks {
       cooks {
        _id
        fullName
       }
    }
`

export const GET_SINGLE_COOK = gql`
    query getSingleCook($cookId: ID!) {
        cook(cookId: $cookId) {
            _id
            fullName
        }
    }
`

export const GET_ALL_DISHES = gql`
    query getAllDishes {
        dishes {
            _id
            dishName
            category
        }
    }
`

export const GET_ALL_MENUS = gql`
    query getAllMenus {
        menus {
            _id
            cook {
                _id
                fullName
            }
            dish {
                _id
                dishName
            }
        }
    }
`

export const GET_ALL_SIGNUPS = gql`
    query getAllSignups {
        signups {
            user {
                _id
                fullName
            }
            menuItem {
                _id
                dish {
                    dishName
                }
            }
            size            
        }
        
    }    
`