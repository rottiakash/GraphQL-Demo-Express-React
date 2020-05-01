import * as React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

export interface BookListProps {
  data: any;
  refetch: any;
}

const REMOVE_BOOK = gql`
  mutation removeBook($id: ID!) {
    removeBook(id: $id) {
      name
      id
    }
  }
`;

const BookList: React.SFC<BookListProps> = (props) => {
  const [removeBook] = useMutation(REMOVE_BOOK);

  return (
    <div>
      <ul>
        {props.data.books.map((book: any) => (
          <li
            key={book.id}
            onClick={(e) => {
              removeBook({ variables: { id: book.id } });
              props.refetch();
            }}
          >
            {book.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
