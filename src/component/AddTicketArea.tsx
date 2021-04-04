import React, { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { API } from 'aws-amplify';
import { createTicket as createTicketMutation } from '../graphql/mutations';
import { Ticket } from '../API';

type Props = {
  key?: string;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  tickets: (Ticket)[];
  setTickets: React.Dispatch<SetStateAction<Ticket[]>>;
}

export const AddTicketArea = ({ key, setIsOpen, tickets, setTickets }: Props) => {
  const initialFormState = { name: '', description: '' } as Ticket;

  const [formData, setFormData] = useState(initialFormState);
  const [columnId, setColumnId] = useState<string>('');

  const createTicket = async () => {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createTicketMutation, variables: { input: { ...formData, ticketColumnId: columnId }}});
    // if (formData.image) {
    //   const image = await Storage.get(formData.image) as string;
    //   formData.image = image;
    // }
    setTickets([ ...tickets, formData ]);
    setFormData(initialFormState);
    setColumnId('');
  }

  // const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return;
  //   const file = e.target.files[0];
  //   setFormData({ ...formData, image: file.name });
  //   await Storage.put(file.name, file);
  //   fetchTickets()
  // }

  const handleCancel = () => {
    setIsOpen(false);
  }

  return (
    <>
    <StyledContainer key={key}>
      <StyledInput placeholder="タイトルを入力..." />
    </StyledContainer>
      <StyledButtonContainer>
        <StyledButton onClick={() => null} primary>Create</StyledButton>
        <StyledButton onClick={handleCancel}>Cancel</StyledButton>
      </StyledButtonContainer>
    </>
  )
}

const StyledContainer = styled.div`
  min-height: 40px;
  margin: 0 12px;
  background: white;
  border-radius: 6px;
`;

const StyledInput = styled.input`
  border: none;
  margin: 6px 12px;
  width: 90%;

  &:focus {
    outline: none;
  }
`;

const StyledButtonContainer = styled.div`
  margin: 1px 0 0 12px;
  text-align: left;
`;

const StyledButton = styled.button`
  width: 20%; 
  margin: 4px 8px 4px 0;
  padding: 3px 1px;
  background: ${({ primary }: { primary?: boolean }) => primary ? 'royalblue': 'silver'};
  font-size: 16px;
  font-weight: bold;
  color: white;
  box-sizing: border-box;
  border: ${({ primary }: { primary?: boolean }) => primary ? '2px solid royalblue': '2px solid white'};
  border-radius: 6px;

  &:hover {
    cursor: pointer;
  }
`;
