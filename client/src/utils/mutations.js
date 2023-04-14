import { gql } from '@apollo/client';

export const ADD_COOK = gql `
    mutation addCook($fullName: String!) {
        addCook(fullName: $fullName) {
            fullName
        }
    }
`