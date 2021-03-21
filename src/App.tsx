import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { ListNotesQuery, Note } from './API';
import { ListColumn } from './component/ListColumn';
import styled from 'styled-components';

const initialFormState = { name: '', description: '' } as Note;

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const apiData = await API.graphql({ query: listNotes }) as GraphQLResult<ListNotesQuery>;
    const notesFromAPI = apiData.data?.listNotes?.items;
    if (!notesFromAPI) return;
    await Promise.all(notesFromAPI.map(async note => {
      if (!note)　return;
      if (note.image) {
        const image = await Storage.get(note.image) as string;
        note.image = image;
      }
      return note;
    }));
    setNotes(notesFromAPI);
  }

  const createNote = async () => {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData }});
    if (formData.image) {
      const image = await Storage.get(formData.image) as string;
      formData.image = image;
    }
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  const deleteNote = async ({ id }: Note) => {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes()
  }

  return (
    <StyledContainer>
      <h1>KANBAN</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value })}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value })}
        placeholder="Note description"
        value={formData.description ?? ''}
      />
      <input
        type="file"
        onChange={handleChange}
      />
      <button onClick={createNote}>Create Note</button>
      <StyledListColumnArea>
        <ListColumn notes={notes} deleteNote={deleteNote} />
        {[...Array(8)].map((_, i) => (
          <ListColumn index={i} deleteNote={deleteNote} />
        ))}
      </StyledListColumnArea>
      <AmplifySignOut />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  text-align: center;
`;

const StyledListColumnArea = styled.div`
  display: flex;
  overflow-x: scroll;
`;

export default withAuthenticator(App);
