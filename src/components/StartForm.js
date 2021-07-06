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
                <p><label>名前</label></p>
                <p><input type="text" value={name} onChange={doChange}/></p>
            </div>
            <Link href="./keyword_page">
                <input type="submit" value="スタート" onClick={doClick} />
            </Link>
        </div>
  );
}

StartForm = connect((state)=>state)(StartForm)
export default StartForm;