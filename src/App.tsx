import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { ListColumn } from './component/ListColumn';
import styled from 'styled-components';


function App() {
  return (
    <StyledContainer>
      <h1>KANBAN</h1>
      {/* <div>
        <input
          onChange={e => setFormData({ ...formData, 'name': e.target.value })}
          placeholder="Ticket name"
          value={formData.name}
        />
        <input
          onChange={e => setFormData({ ...formData, 'description': e.target.value })}
          placeholder="Ticket description"
          value={formData.description ?? ''}
        />
        <input
          type="file"
          onChange={handleChangeFile}
        />
        <input
          onChange={e => setColumnId(e.target.value)}
          placeholder="Belonging Column ID"
          value={columnId}
        />
        <button onClick={createTicket}>Create Ticket</button>
      </div> */}
      <ListColumn />
      <AmplifySignOut />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 15px;
`;

export default withAuthenticator(App);
