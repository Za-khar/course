import React from 'react';
import './MyProfile.css';
import Form from './components/Form';
import PropTypes from 'prop-types';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';

function MyProfile({setUsername}){
    return(
        <div className="profile">
            <ErrorBoundary>
                <Form setUsername={setUsername}></Form>
            </ErrorBoundary>
        </div>
    );
}

MyProfile.propTypes = {
    setUsername: PropTypes.func.isRequired,
}

export default MyProfile;