/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTicket = /* GraphQL */ `
  subscription OnCreateTicket {
    onCreateTicket {
      id
      name
      description
      image
      column {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTicket = /* GraphQL */ `
  subscription OnUpdateTicket {
    onUpdateTicket {
      id
      name
      description
      image
      column {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTicket = /* GraphQL */ `
  subscription OnDeleteTicket {
    onDeleteTicket {
      id
      name
      description
      image
      column {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateColumn = /* GraphQL */ `
  subscription OnCreateColumn {
    onCreateColumn {
      id
      name
      tickets {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateColumn = /* GraphQL */ `
  subscription OnUpdateColumn {
    onUpdateColumn {
      id
      name
      tickets {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteColumn = /* GraphQL */ `
  subscription OnDeleteColumn {
    onDeleteColumn {
      id
      name
      tickets {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
