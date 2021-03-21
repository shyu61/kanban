import React from 'react';
import styled from 'styled-components';
import { ColumnTicket } from './ColumnTicket';
import { Ticket } from '../API';

type Props = {
  index?: number;
  tickets?: Ticket[];
  deleteTicket: (ticket: Ticket) => void;
}

export const ListColumn = ({ index, tickets = [], deleteTicket }: Props) => {
  return (
    <StyledContainer>
      <StyledColumnTitle>This is Title Area {index}</StyledColumnTitle>
      <StyledColumn>
        {tickets.map(ticket => (
          <ColumnTicket ticket={ticket} deleteTicket={deleteTicket} />
        ))}
      </StyledColumn>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  min-width: 450px;
  margin-left: 12px;
  background: gray;
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
