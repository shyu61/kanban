import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import React, { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { API } from 'aws-amplify';
import { createTicket as createTicketMutation } from '../graphql/mutations';
import { Ticket } from '../API';

type Props = {
  tickets: (Ticket)[];
  setTickets: React.Dispatch<SetStateAction<Ticket[]>>;
  columnId: string;
}

export const AddTicketArea = ({ tickets, setTickets, columnId }: Props) => {
  const initialFormState = { name: '', description: '' } as Ticket;

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const createTicket = async () => {
    if (!formData.name) return;
    await API.graphql({ query: createTicketMutation, variables: { input: { ...formData, ticketColumnId: columnId }}});
    // if (formData.image) {
    //   const image = await Storage.get(formData.image) as string;
    //   formData.image = image;
    // }
    const newTicket = { ...formData, column: { id: columnId }} as Ticket;
    setTickets([ ...tickets, newTicket ]);
    setFormData(initialFormState);
    setIsOpen(false);
  }

  // const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return;
  //   const file = e.target.files[0];
  //   setFormData({ ...formData, image: file.name });
  //   await Storage.put(file.name, file);
  //   fetchTickets()
  // }

  const handleCancel = () => {
    setFormData(initialFormState);
    setIsOpen(false);
  }

  return (
    isOpen ? (
      <>
      <StyledContainer>
        <StyledInput
          onChange={e => setFormData({ ...formData, 'name': e.target.value })}
          placeholder="タイトルを入力..."
          value={formData.name}
        />
      </StyledContainer>
        <StyledButtonContainer>
          <StyledButton onClick={createTicket} primary>Create</StyledButton>
          <StyledButton onClick={handleCancel}>Cancel</StyledButton>
        </StyledButtonContainer>
      </>
    ) : (
      <StyledIcon onClick={() => setIsOpen(true)}><AddCircleOutlineOutlinedIcon />Add New Ticket</StyledIcon>
    )
  )
}

const StyledContainer = styled.div`
  min-height: 40px;
  margin: 12px 12px 0;
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
