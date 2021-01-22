import React from 'react';
import './Container.css';
import PropTypes from 'prop-types';

function Container(props) {
    return (
        <div className="container">
            {props.children}
        </div>
    );
}

Container.propTypes = {
    children: PropTypes.element.isRequired
  };

export default Container;