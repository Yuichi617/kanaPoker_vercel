import React, { useState } from "react";
import { connect } from 'react-redux'
import { db } from '../lib/firebase'

function ReadyButton(props) {

    // データの追加
    const setData = async () => {
        db.collection("rooms").doc(props.keyword).collection("users").doc(props.name).set({
            ready: 1,
        }, { merge: true })
    }

    const doClick = async() => {
        await setData();
    }

    return (
        <div>
            <button type="button" onClick={doClick}>準備完了</button>
        </div>
  );
}

ReadyButton = connect((state)=>state)(ReadyButton)
export default ReadyButton;
