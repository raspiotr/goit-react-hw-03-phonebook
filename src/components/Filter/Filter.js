import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './Filter.module.css';
import PropTypes from 'prop-types';

export class Filter extends Component {
  filterInputId = nanoid();

  render() {
    const { onChangeHandle } = this.props;
    return (
      <div className={css.filter}>
        <label className={css.filterLabel} htmlFor={this.filterInputId}>
          Find contact by name
        </label>
        <input
          className={css.filterInput}
          type="text"
          name="filter"
          id={this.filterInputId}
          onChange={onChangeHandle}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  onChangeHandle: PropTypes.func.isRequired,
};
