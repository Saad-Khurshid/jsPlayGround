import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      className="form-control my-3"
    />
  );
};

export default SearchBox;
