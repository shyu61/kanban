import React from 'react';
import styled from 'styled-components';
import { Note } from '../API';

type Props = {
  note: Note;
  deleteNote: (note: Note) => void;
}

export const Ticket = ({ note, deleteNote }: Props) => {
  return (
    <>
      <StyledContainer key={note.id || note.name}>
        <StyledXButton onClick={() => deleteNote(note)}>x</StyledXButton>
        <p style={{color: '#0000cd'}}>{note.name}</p>
        <p>{note.description}</p>
        {note.image && (
          <img src={note.image} alt="imagestorage" style={{width: 400}} />
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
