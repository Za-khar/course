import React from 'react';
import './Form.css';
import PropTypes from 'prop-types';

function Form({setUsername}) {

    const handleSubmit = event => {
        event.preventDefault();
        setUsername({firstName: event.target[0].value, secondName: event.target[1].value});
    };

    return (
        <form onSubmit={handleSubmit} className="profile-form">
            <p>Input name</p>
            <input name="firstName" className="profile-form__input"></input>
            <p>Input surname</p>
            <input name="secondName" className="profile-form__input"></input>
            <button type="submit" className="profile-form__button">Save</button>
        </form>
        
    );
}

Form.propTypes = {
    setUsername: PropTypes.func.isRequired,
}

export default Form;
