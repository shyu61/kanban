import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listTickets } from './graphql/queries';
import { createTicket as createTicketMutation, deleteTicket as deleteTicketMutation } from './graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { ListTicketsQuery, Ticket } from './API';
import { ListColumn } from './component/ListColumn';
import styled from 'styled-components';

const initialFormState = { name: '', description: '' } as Ticket;

function App() {
  const [tickets, setTickets] = useState<(Ticket)[]>([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const apiData = await API.graphql({ query: listTickets }) as GraphQLResult<ListTicketsQuery>;
    const ticketsFromAPI = apiData.data?.listTickets?.items?.filter(item => item != null) as Ticket[] | undefined;
    if (!ticketsFromAPI) return;
    await Promise.all(ticketsFromAPI.map(async ticket => {
      if (!ticket)　return;
      if (ticket.image) {
        const image = await Storage.get(ticket.image) as string;
        ticket.image = image;
      }
      return ticket;
    }));
    setTickets(ticketsFromAPI);
  }

  const createTicket = async () => {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createTicketMutation, variables: { input: formData }});
    if (formData.image) {
      const image = await Storage.get(formData.image) as string;
      formData.image = image;
    }
    setTickets([ ...tickets, formData ]);
    setFormData(initialFormState);
  }

  const deleteTicket = async ({ id }: Ticket) => {
    const newTicketsArray = tickets.filter(ticket => ticket.id !== id);
    setTickets(newTicketsArray);
    await API.graphql({ query: deleteTicketMutation, variables: { input: { id } }});
  }

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchTickets()
  }

  return (
    <StyledContainer>
      <h1>KANBAN</h1>
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
      <button onClick={createTicket}>Create Ticket</button>
      <StyledListColumnArea>
        <ListColumn tickets={tickets} deleteTicket={deleteTicket} />
        {[...Array(8)].map((_, i) => (
          <ListColumn index={i} deleteTicket={deleteTicket} />
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
