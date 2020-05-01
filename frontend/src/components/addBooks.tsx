import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
export interface AddBookProps {
  refetch: any;
}

const getAuthors = gql`
  {
    authors {
      name
      id
    }
  }
`;

const ADD_TODO = gql`
  mutation addBook($name: String!, $genre: String!, $authorid: ID!) {
    addBook(name: $name, genre: $genre, authorid: $authorid) {
      name
      id
    }
  }
`;

const AddBook: React.SFC<AddBookProps> = (props) => {
  //states
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("Select an author");
  const { loading, error, data } = useQuery(getAuthors);
  const [addTodo] = useMutation(ADD_TODO);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo({ variables: { name: name, genre: genre, authorid: author } });
        props.refetch();
      }}
    >
      <div>
        <label>Book Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Book Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option>Select an Author</option>
          {data.authors.map((author: any) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <input type="submit" />
    </form>
  );
};

export default AddBook;
