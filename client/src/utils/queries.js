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
            menuDate
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
                menuDate
            }
            size            
        }
        
    }    
`

export const GET_OPEN_MENUS = gql`
    query getOpenMenus {
        openMenus {
             _id
            cook {
                _id
                fullName
            }
            dish {
                _id
                dishName
            }
            menuDate
            amount
        }
    }
`

export const GET_THIS_WEEKS_DISHES = gql`
    query getThisWeeksDishes {
        thisWeeksDishes {
             _id
            cook {
                _id
                fullName
            }
            dish {
                _id
                dishName
            }
            menuDate
            amount
        }
    }
`

export const GET_COOKS_MENU_ITEMS = gql`
    query getCooksMenuItems($cookId: ID!) {
        cookMenuItems(cookId: $cookId) {
            _id
            cook {
                _id
                fullName
            }
            dish {
                _id
                dishName
            }
            menuDate
            amount
        }
    }
`

export const GET_COOKS_MENU_ITEMS_BY_DATE = gql`
    query getCooksMenuItemsByDate($cookId: ID!) {
        cookMenuItemsByDate(cookId: $cookId) {
             _id
            cook {
                _id
                fullName
            }
            dish {
                _id
                dishName
            }
            menuDate
            amount
        }
    }
`