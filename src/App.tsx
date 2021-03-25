import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listTickets, listColumns } from './graphql/queries';
import {
  createTicket as createTicketMutation,
  deleteTicket as deleteTicketMutation,
  createColumn as createColumnMutation,
  deleteColumn as deleteColumnMutation,
} from './graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { ListTicketsQuery, Ticket, Column, ListColumnsQuery } from './API';
import { ListColumn } from './component/ListColumn';
import styled from 'styled-components';

const initialFormState = { name: '', description: '' } as Ticket;

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [formData, setFormData] = useState(initialFormState);
  const [columns, setColumns] = useState<Column[]>([]);
  const [columnId, setColumnId] = useState<string>('');

  useEffect(() => {
    fetchTickets();
    fetchColumns();
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
    await API.graphql({ query: createTicketMutation, variables: { input: { ...formData, ticketColumnId: columnId }}});
    if (formData.image) {
      const image = await Storage.get(formData.image) as string;
      formData.image = image;
    }
    setTickets([ ...tickets, formData ]);
    setFormData(initialFormState);
    setColumnId('');
    fetchTickets();
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

  const fetchColumns = async () => {
    const apiData = await API.graphql({ query: listColumns }) as GraphQLResult<ListColumnsQuery>;
    const columnsFromAPI = apiData.data?.listColumns?.items?.filter(item => item !== null) as Column[] | undefined;
    if (!columnsFromAPI) return;
    setColumns(columnsFromAPI);
  }

  const deleteColumn = async ({ id }: Column) => {
    const newColumnsArray = columns.filter(column => column.id !== id);
    setColumns(newColumnsArray);
    await API.graphql({ query: deleteColumnMutation, variables: { input: { id } }});
  }

  return (
    <StyledContainer>
      <h1>KANBAN</h1>
      <div>
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
      </div>
      <ListColumn columns={columns} deleteTicket={deleteTicket} deleteColumn={deleteColumn} />
      <AmplifySignOut />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 15px;
`;

export default withAuthenticator(App);
