import { useState } from "react";
import { useMutation } from "@apollo/client";
import { addBookMutation, getBooksQuery } from "../queries/queries";

export default function Form(props) {
  const { authors } = props;

  const [addBook, { data, loading, error }] = useMutation(addBookMutation);

  const [state, setState] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  function submitForm(e) {
    e.preventDefault()
    addBook({
      variables: {
        name: state.name,
        genre: state.genre,
        authorId: state.authorId,
      },
      refetchQueries: [
        {query: getBooksQuery}
      ]
    });
  }

  return (
    <form id="add-book" onSubmit={(e) => submitForm(e)}>
      <div className="field">
        <label>Book Name: </label>
        <input
          type="text"
          onChange={(e) =>
            setState({
              ...state,
              name: e.target.value,
            })
          }
        />
      </div>

      <div className="field">
        <label>Genre: </label>
        <input
          type="text"
          onChange={(e) =>
            setState({
              ...state,
              genre: e.target.value,
            })
          }
        />
      </div>

      <div className="field">
        <label>Author: </label>
        <select
          onChange={(e) =>
            setState({
              ...state,
              authorId: e.target.value,
            })
          }
        >
          {authors.map((author) => {
            return (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            );
          })}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}
