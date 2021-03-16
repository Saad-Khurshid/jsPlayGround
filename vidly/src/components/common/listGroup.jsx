import React from "react";
import propTypes from "prop-types";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

ListGroup.propTypes = {
  items: propTypes.array.isRequired,
  textProperty: propTypes.string.isRequired,
  valueProperty: propTypes.any.isRequired,
  selectedItem: propTypes.any,
  onItemSelect: propTypes.func,
};
export default ListGroup;
