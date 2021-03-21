/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTicketInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  image?: string | null,
  ticketColumnId?: string | null,
};

export type ModelTicketConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelTicketConditionInput | null > | null,
  or?: Array< ModelTicketConditionInput | null > | null,
  not?: ModelTicketConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Ticket = {
  __typename: "Ticket",
  id?: string,
  name?: string,
  description?: string | null,
  image?: string | null,
  column?: Column,
  createdAt?: string,
  updatedAt?: string,
};

export type Column = {
  __typename: "Column",
  id?: string,
  name?: string,
  tickets?: ModelTicketConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelTicketConnection = {
  __typename: "ModelTicketConnection",
  items?:  Array<Ticket | null > | null,
  nextToken?: string | null,
};

export type UpdateTicketInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  image?: string | null,
  ticketColumnId?: string | null,
};

export type DeleteTicketInput = {
  id?: string | null,
};

export type CreateColumnInput = {
  id?: string | null,
  name: string,
};

export type ModelColumnConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelColumnConditionInput | null > | null,
  or?: Array< ModelColumnConditionInput | null > | null,
  not?: ModelColumnConditionInput | null,
};

export type UpdateColumnInput = {
  id: string,
  name?: string | null,
};

export type DeleteColumnInput = {
  id?: string | null,
};

export type ModelTicketFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelTicketFilterInput | null > | null,
  or?: Array< ModelTicketFilterInput | null > | null,
  not?: ModelTicketFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelColumnFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelColumnFilterInput | null > | null,
  or?: Array< ModelColumnFilterInput | null > | null,
  not?: ModelColumnFilterInput | null,
};

export type ModelColumnConnection = {
  __typename: "ModelColumnConnection",
  items?:  Array<Column | null > | null,
  nextToken?: string | null,
};

export type CreateTicketMutationVariables = {
  input?: CreateTicketInput,
  condition?: ModelTicketConditionInput | null,
};

export type CreateTicketMutation = {
  createTicket?:  {
    __typename: "Ticket",
    id: string,
    name: string,
    description?: string | null,
    image?: string | null,
    column?:  {
      __typename: "Column",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTicketMutationVariables = {
  input?: UpdateTicketInput,
  condition?: ModelTicketConditionInput | null,
};

export type UpdateTicketMutation = {
  updateTicket?:  {
    __typename: "Ticket",
    id: string,
    name: string,
    description?: string | null,
    image?: string | null,
    column?:  {
      __typename: "Column",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTicketMutationVariables = {
  input?: DeleteTicketInput,
  condition?: ModelTicketConditionInput | null,
};

export type DeleteTicketMutation = {
  deleteTicket?:  {
    __typename: "Ticket",
    id: string,
    name: string,
    description?: string | null,
    image?: string | null,
    column?:  {
      __typename: "Column",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateColumnMutationVariables = {
  input?: CreateColumnInput,
  condition?: ModelColumnConditionInput | null,
};

export type CreateColumnMutation = {
  createColumn?:  {
    __typename: "Column",
    id: string,
    name: string,
    tickets?:  {
      __typename: "ModelTicketConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateColumnMutationVariables = {
  input?: UpdateColumnInput,
  condition?: ModelColumnConditionInput | null,
};

export type UpdateColumnMutation = {
  updateColumn?:  {
    __typename: "Column",
    id: string,
    name: string,
    tickets?:  {
      __typename: "ModelTicketConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteColumnMutationVariables = {
  input?: DeleteColumnInput,
  condition?: ModelColumnConditionInput | null,
};

export type DeleteColumnMutation = {
  deleteColumn?:  {
    __typename: "Column",
    id: string,
    name: string,
    tickets?:  {
      __typename: "ModelTicketConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTicketQueryVariables = {
  id?: string,
};

export type GetTicketQuery = {
  getTicket?:  {
    __typename: "Ticket",
    id: string,
    name: string,
    description?: string | null,
    image?: string | null,
    column?:  {
      __typename: "Column",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTicketsQueryVariables = {
  filter?: ModelTicketFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTicketsQuery = {
  listTickets?:  {
    __typename: "ModelTicketConnection",
    items?:  Array< {
      __typename: "Ticket",
      id: string,
      name: string,
      description?: string | null,
      image?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetColumnQueryVariables = {
  id?: string,
};

export type GetColumnQuery = {
  getColumn?:  {
    __typename: "Column",
    id: string,
    name: string,
    tickets?:  {
      __typename: "ModelTicketConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListColumnsQueryVariables = {
  filter?: ModelColumnFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListColumnsQuery = {
  listColumns?:  {
    __typename: "ModelColumnConnection",
    items?:  Array< {
      __typename: "Column",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTicketSubscription = {
  onCreateTicket?:  {
    __typename: "Ticket",
    id: string,
    name: string,
    description?: string | null,
    image?: string | null,
    column?:  {
      __typename: "Column",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTicketSubscription = {
  onUpdateTicket?:  {
    __typename: "Ticket",
    id: string,
    name: string,
    description?: string | null,
    image?: string | null,
    column?:  {
      __typename: "Column",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTicketSubscription = {
  onDeleteTicket?:  {
    __typename: "Ticket",
    id: string,
    name: string,
    description?: string | null,
    image?: string | null,
    column?:  {
      __typename: "Column",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateColumnSubscription = {
  onCreateColumn?:  {
    __typename: "Column",
    id: string,
    name: string,
    tickets?:  {
      __typename: "ModelTicketConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateColumnSubscription = {
  onUpdateColumn?:  {
    __typename: "Column",
    id: string,
    name: string,
    tickets?:  {
      __typename: "ModelTicketConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteColumnSubscription = {
  onDeleteColumn?:  {
    __typename: "Column",
    id: string,
    name: string,
    tickets?:  {
      __typename: "ModelTicketConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
