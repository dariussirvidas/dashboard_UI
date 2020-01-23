import React, {Component, useState, useEffect} from 'react';
import './domainList.scss';

function DomainList(props) {
    return (
        <>
            <p>this is the domain list: </p>
            <p>portals:</p>
            {props.portals.map((item) => {
                return SingleDomain(item)
            })}
            <p>services:</p>
            {props.services.map((item) => {
                return SingleDomain(item)
            })}
        </>
    )
}

const SingleDomain = (d) => {
    return (
        <>
            <div className="bg-info">
                <p>{d.url}</p>
                <p>{d.admin_Email}</p>
                <p>{d.interval_Ms} ms</p>
            </div>
        </>
    )
};

export default DomainList;