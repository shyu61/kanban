import React from 'react';
import styled from 'styled-components';
import { Ticket } from './Ticket';
import { Note } from '../API';

type Props = {
  index?: number;
  notes?: Note[];
  deleteNote: (note: Note) => void;
}

export const ListColumn = ({ index, notes = [], deleteNote }: Props) => {
  return (
    <StyledContainer>
      <StyledColumnTitle>This is Title Area {index}</StyledColumnTitle>
      <StyledColumn>
        {notes.map(note => (
          <Ticket note={note} deleteNote={deleteNote} />
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
