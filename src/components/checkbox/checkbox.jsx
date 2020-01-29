import React, {Component} from 'react';

function Checkbox(props) {

    function changeActiveState(event){
        console.log(event.target.checked);
        props.changeDomainList(props.id);

    }

    return(
        <>
            <input type="checkbox" checked={props.active} onClick={changeActiveState}></input>
        </>
    )
}


export default Checkbox;