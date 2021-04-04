import { API, Storage } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AddColumnArea } from './AddColumnArea';
import { AddTicketArea } from './AddTicketArea';
import { Column, ListColumnsQuery, ListTicketsQuery, Ticket,  } from '../API';
import { ColumnTicket } from './ColumnTicket';
import { XButtonIcon } from './XButtonIcon';
import {
  deleteTicket as deleteTicketMutation,
  deleteColumn as deleteColumnMutation,
} from '../graphql/mutations';
import { listTickets, listColumns } from '../graphql/queries';

export const ListColumn = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
    fetchColumns();
  }, []);

  const fetchColumns = async () => {
    const apiData = await API.graphql({ query: listColumns }) as GraphQLResult<ListColumnsQuery>;
    const columnsFromAPI = apiData.data?.listColumns?.items?.filter(item => item !== null) as Column[] | undefined;
    if (!columnsFromAPI) return;
    setColumns(columnsFromAPI);
  }

  const fetchTickets = async () => {
    const apiData = await API.graphql({ query: listTickets }) as GraphQLResult<ListTicketsQuery>;
    const ticketsFromAPI = apiData.data?.listTickets?.items?.filter(item => item != null) as Ticket[] | undefined;
    if (!ticketsFromAPI) return;
    await Promise.all(ticketsFromAPI.map(async ticket => {
      if (!ticket)　return;
      if (ticket.image) {
        const image = await Storage.get(ticket.image) as string;
        ticket.image = image;
      }
      return ticket;
    }));
    setTickets(ticketsFromAPI);
  }

  const deleteTicket = async ({ id }: Ticket) => {
    const newTicketsArray = tickets.filter(ticket => ticket.id !== id);
    setTickets(newTicketsArray);
    await API.graphql({ query: deleteTicketMutation, variables: { input: { id } }});
  }

  const deleteColumn = async ({ id }: Column) => {
    const newColumnsArray = columns.filter(column => column.id !== id);
    setColumns(newColumnsArray);
    await API.graphql({ query: deleteColumnMutation, variables: { input: { id } }});
  }

  return (
    <StyledContainer>
      {columns.map((column: Column) => {
        if (column === null) return <></>;
        return (
          <StyledListColumnArea key={column.id}>
            <StyledColumnTitle>
              <span>{column.name}{column.id}</span>
              <XButtonIcon onClick={() => deleteColumn(column)} />
            </StyledColumnTitle>
            <StyledColumn>
              {tickets.filter(ticket => ticket?.column?.id === column.id).map(ticket => {
                if (ticket === null) return <></>;
                return <ColumnTicket ticket={ticket} deleteTicket={deleteTicket} />;
              })}
              {isOpen ? <AddTicketArea key={column.id} setIsOpen={setIsOpen} tickets={tickets} setTickets={setTickets} /> : (
                <StyledIcon onClick={() => setIsOpen(true)}><AddCircleOutlineOutlinedIcon />Add New Ticket</StyledIcon>
              )}
            </StyledColumn>
          </StyledListColumnArea>
        )
      })}
      <AddColumnArea columns={columns} setColumns={setColumns} />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  overflow-x: scroll;
`;

const StyledListColumnArea = styled.div`
  min-width: 400px;
  margin-left: 12px;
  background: silver;
  border-radius: 6px;
`;

const StyledColumnTitle = styled.div`
  display: flex;
  padding: 15px;
  position: relative;
  font-size: 20px;
  font-weight: bold;
`;

const StyledColumn = styled.div`
  height: 700px;
  overflow-y: scroll;
`

const StyledIcon = styled.div`
  margin: 8px 12px;
  padding: 8px;
  text-align: center;

  &:hover {
    background: darkgray;
    border-radius: 4px;
    cursor: pointer;
  }
`;
