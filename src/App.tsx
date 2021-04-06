import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { ListColumn } from './component/ListColumn';
import styled from 'styled-components';


function App() {
  return (
    <StyledContainer>
      <h1>KANBAN</h1>
      <ListColumn />
      <AmplifySignOut />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 15px;
`;

export default withAuthenticator(App);
