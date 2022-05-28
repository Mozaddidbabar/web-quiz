import React from 'react';
import classes from '../styles/Alert.module.css';
export default function Alert({ alert, type }) {
    console.log(type);
    return (
        <>
            <p className={type === 'warning' ? `${classes.alert_warning}` : `${classes.alert_success}`}>{alert} </p>
        </>
    )
}
