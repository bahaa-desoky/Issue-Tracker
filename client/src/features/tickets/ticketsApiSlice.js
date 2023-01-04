import { apiSlice } from "../api/apiSlice";

export const ticketsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => "/tickets",
      providesTags: ["Tickets"],
    }),
    addTicket: builder.mutation({
      query: (ticket) => ({
        url: "/tickets",
        method: "POST",
        body: ticket,
      }),
      invalidatesTags: ["Tickets"],
    }),
    updateTicket: builder.mutation({
      query: (ticket) => ({
        url: `/tickets/${ticket._id}`,
        method: "PATCH",
        body: ticket,
      }),
      invalidatesTags: ["Tickets"],
    }),
    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `/tickets/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useAddTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = ticketsApiSlice;
