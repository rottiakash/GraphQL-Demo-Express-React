import React from "react";
import BookList from "./components/bookList";
import AddBook from "./components/addBooks";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
const getBooks = gql`
  {
    books {
      name
      id
    }
  }
`;
function App() {
  const { loading, error, data, refetch } = useQuery(getBooks);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <h1>My reading list</h1>
      <BookList data={data} refetch={refetch} />
      <AddBook refetch={refetch} />
    </div>
  );
}

export default App;
