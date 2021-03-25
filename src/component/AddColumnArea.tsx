import React, { useState } from 'react';
import styled from 'styled-components';
import { API } from 'aws-amplify';
import { createColumn as createColumnMutation } from '../graphql/mutations';
import { Column } from '../API';

export const AddColumnArea = () => {
  const initialFormColumnState = { name: '' } as Column;

  const [isOpen, setIsOpen] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);
  const [formColumnData, setFormColumnData] = useState(initialFormColumnState);

  const createColumn = async () => {
    if (!formColumnData.name) return;
    await API.graphql({ query: createColumnMutation, variables: { input: formColumnData } });
    setColumns([ ...columns, formColumnData ]);
    setFormColumnData(initialFormColumnState);
    setIsOpen(false);
  }

  const handleCancel = () => {
    setFormColumnData(initialFormColumnState);
    setIsOpen(false);
  }

  return (
    <StyledContainer onClick={() => isOpen === false && setIsOpen(true)}>
      {isOpen ? (
        <StyledInputContainer>
          <StyledInputArea
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormColumnData({ ...formColumnData, 'name': e.target.value })}
            placeholder="Column Name"
            value={formColumnData.name}
          />
          <StyledButtonContainer>
            <StyledButton onClick={createColumn} primary>Create</StyledButton>
            <StyledButton onClick={handleCancel}>Cancel</StyledButton>
          </StyledButtonContainer>
        </StyledInputContainer>
      ) : (
        <p>Add New Column</p>
      )}
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  min-width: 450px;
  margin-left: 12px;
  border: 2px dashed silver;
  border-radius: 6px;

  &:hover {
    background: whitesmoke;
    cursor: pointer;
  }
`;

const StyledInputContainer = styled.div`
  margin: 12px 18px;
`;

const StyledInputArea = styled.input`
  width: 100%;
  padding: 4px 0 4px 6px;
  font-size: 18px;
  border: 1px solid silver;
  border-radius: 6px;
`;

const StyledButtonContainer = styled.div`
  margin-top: 8px;
  text-align: left;
`;

const StyledButton = styled.button`
  width: 20%; 
  margin: 4px 8px 4px 0;
  padding: 6px 1px;
  background: ${({ primary }: { primary?: boolean }) => primary ? 'royalblue': 'silver'};
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 6px;

  &:hover {
    cursor: pointer;
  }
`;
