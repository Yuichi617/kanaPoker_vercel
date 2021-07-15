import React, { useState } from "react"
import Link from 'next/link'
import { connect } from 'react-redux'
import { SetName } from '../store'

function StartForm(props) {

    const [name, setName] = useState('');

    function doClick(e) {
        props.dispatch(SetName(name));
    }

    function doChange(e) {
        setName(e.target.value);
    }

    return (
        <div className="start_form">
            <div className="content">
                {/* <p><label>名前</label></p> */}
                <input type="text" value={name}  placeholder="なまえ" onChange={doChange}/>
            </div>
            <Link href="./keyword_page">
                <input type="submit" value="はじめる" onClick={doClick} />
            </Link>
            <p className="Version_text">Ver.1.0.0</p>
        </div>
  );
}

StartForm = connect((state)=>state)(StartForm)
export default StartForm;