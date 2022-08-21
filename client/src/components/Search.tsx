import React from "react";
import "../stylesheets/Search.css";

interface ISearchProps {
  inputValue: string;
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<ISearchProps> = ({ submit, change, inputValue }) => {
  return (
    <form className="search-task-container" onSubmit={(e) => submit(e)}>
      <input
        type="text"
        value={inputValue}
        placeholder="Add desired task"
        onChange={(e) => change(e)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Search;
