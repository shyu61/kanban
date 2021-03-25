import React from 'react';
import styled from 'styled-components';
import { AddColumnArea } from './AddColumnArea';
import { ColumnTicket } from './ColumnTicket';
import { Ticket, Column } from '../API';

type Props = {
  tickets?: Ticket[];
  columns: Column[];
  deleteTicket: (ticket: Ticket) => void;
  deleteColumn: (column: Column) => void;
}

export const ListColumn = ({ tickets = [], columns, deleteTicket, deleteColumn }: Props) => {
  return (
    <StyledListColumnArea>
      {columns.map(column => (
        <StyledContainer key={column?.id}>
          <StyledColumnTitle>name: {column?.name}, id: {column?.id}</StyledColumnTitle>
          {column && (
            <button onClick={() => deleteColumn(column)}>x</button>
          )}
          <StyledColumn>
            {tickets.map(ticket => (
              <ColumnTicket ticket={ticket} deleteTicket={deleteTicket} />
            ))}
            {column && column.tickets?.items?.map(ticket => (
              ticket && (
              <ColumnTicket ticket={ticket} deleteTicket={deleteTicket} />
            )))}
          </StyledColumn>
        </StyledContainer>
      ))}
      <AddColumnArea />
    </StyledListColumnArea>
  )
}

const StyledListColumnArea = styled.div`
  display: flex;
  overflow-x: scroll;
`;

const StyledContainer = styled.div`
  min-width: 450px;
  margin-left: 12px;
  background: silver;
  border-radius: 6px;
`;

const StyledColumnTitle = styled.div`
  padding: 6px;
  border-bottom: 1px solid black;
`;

const StyledColumn = styled.div`
  height: 700px;
  overflow-y: scroll;
`
