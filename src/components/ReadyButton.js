import React, { useState } from "react";
import { connect } from 'react-redux'
import { db } from '../lib/firebase'

function ReadyButton(props) {

    // ボタンを押したかどうかのフラグ
    const [flg, setFlg] = useState(false);

    // データの追加
    const setData = async () => {
        db.collection("rooms").doc(props.keyword).collection("users").doc(props.name).set({
            ready: 1,
        }, { merge: true })
    }

    const doClick = async() => {
        await setData();
        setFlg(true);
    }

    return (
        <div>
            <button type="button" className={"ready_button" + " " + `${flg ? "used":""}`} onClick={doClick}>準備完了</button>
        </div>
  );
}

ReadyButton = connect((state)=>state)(ReadyButton)
export default ReadyButton;
