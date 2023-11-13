import React, { Component } from 'react';
import css from './ContactListItem.module.css';
import PropTypes from 'prop-types';

export class ContactListItem extends Component {
  render() {
    const { name, number, id, onDeleteHandle } = this.props;

    return (
      <li className={css.listItem}>
        <span className={css.listItemText}>
          {name}: {number}
        </span>
        <button
          type="button"
          id={id}
          className={css.deleteBtn}
          onClick={onDeleteHandle}
        >
          Delete
        </button>
      </li>
    );
  }
}

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDeleteHandle: PropTypes.func.isRequired,
};
