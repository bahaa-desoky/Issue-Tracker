import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Basic authorization. Include credentials with each request or with cookies
const baseQuery = fetchBaseQuery({
  baseUrl: "https://issue-tracker-anrs.onrender.com/",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = JSON.parse(localStorage.getItem("profile"))?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["Projects", "Tickets"],
  endpoints: () => ({}),
});
