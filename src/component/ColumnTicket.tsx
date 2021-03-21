import React from 'react';
import styled from 'styled-components';
import { Ticket } from '../API';

type Props = {
  ticket: Ticket;
  deleteTicket: (ticket: Ticket) => void;
}

export const ColumnTicket = ({ ticket, deleteTicket }: Props) => {
  return (
    <>
      <StyledContainer key={ticket.id || ticket.name}>
        <StyledXButton onClick={() => deleteTicket(ticket)}>x</StyledXButton>
        <p style={{color: '#0000cd'}}>{ticket.name}</p>
        <p>{ticket.description}</p>
        {ticket.image && (
          <img src={ticket.image} alt="imagestorage" style={{width: 400}} />
        )}
      </StyledContainer>
    </>
  )
}

const StyledContainer = styled.div`
  min-height: 40px;
  margin: 0 8px;
  background: white;
`;

const StyledXButton = styled.button`
`;
