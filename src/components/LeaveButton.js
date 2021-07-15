import React, { useState } from "react";
import { connect } from 'react-redux'
import { db } from '../lib/firebase'
import { useRouter } from 'next/router'

function LeaveButton(props) {

    const router = useRouter();

    // データの削除
    const removeData = async () => {
        db.collection("rooms").doc(props.keyword).collection("users").doc(props.name).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const doClick = async() => {
        await removeData();
        router.push('/keyword_page');
    }

    return (
        <div>
            <button type="button" className="leave_button" onClick={doClick}>退室</button>
        </div>
  );
}

LeaveButton = connect((state)=>state)(LeaveButton)
export default LeaveButton;


