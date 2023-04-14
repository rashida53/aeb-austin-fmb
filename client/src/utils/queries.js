import { gql } from '@apollo/client'

export const GET_ALL_COOKS = gql `
    query getAllCooks {
       cooks {
        _id
        fullName
       }
    }
`