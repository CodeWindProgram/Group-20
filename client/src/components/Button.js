import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function Button() {
    return (
        <Link to='Ask-Question'>
            <button className='btn'>Ask Question</button>
        </Link>
    );
}
