import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h2 className='text-4xl fw-bold'>Page NotFound 404</h2>
            <Link to="/" className='btn btn-primary mt-5'>Go To Home</Link>
        </div>
    );
};

export default NotFound;