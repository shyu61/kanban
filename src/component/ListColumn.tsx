import React from 'react';
import styled from 'styled-components';
import { AddColumnArea } from './AddColumnArea';
import { ColumnTicket } from './ColumnTicket';
import { Ticket, Column } from '../API';
import { XButtonIcon } from './XButtonIcon';

type Props = {
  tickets?: Ticket[];
  columns: Column[];
  deleteTicket: (ticket: Ticket) => void;
  deleteColumn: (column: Column) => void;
}

export const ListColumn = ({ tickets = [], columns, deleteTicket, deleteColumn }: Props) => {
  return (
    <StyledContainer>
      {columns.map((column: Column) => {
        if (column === null) return <></>;
        return (
          <StyledListColumnArea key={column.id}>
            <StyledColumnTitle>
              <span>{column.name}</span>
              <XButtonIcon onClick={() => deleteColumn(column)} />
            </StyledColumnTitle>
            <StyledColumn>
              {tickets.map(ticket => (
                <ColumnTicket ticket={ticket} deleteTicket={deleteTicket} />
              ))}
              {column.tickets?.items?.map(ticket => (
                ticket && (
                <ColumnTicket ticket={ticket} deleteTicket={deleteTicket} />
              )))}
            </StyledColumn>
          </StyledListColumnArea>
        )
      })}
      <AddColumnArea />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  overflow-x: scroll;
`;

const StyledListColumnArea = styled.div`
  min-width: 450px;
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
