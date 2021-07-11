import React, { useState } from "react";
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { SetKeyword } from '../store'
import { db } from '../lib/firebase'

function KeywordForm(props) {

    const [keyword, setKeyword] = useState('');

    const router = useRouter();

     // データの追加
     const addData = async () => {
        // console.log("add");
        db.collection("rooms").doc(keyword).collection("users").doc(props.name).set({
            name: props.name,
            ready: 0,
            participate: false,
            decision: 0
        })
    }

    // データの取得
    const getData = async () => {
        let tempUserNames = [];
        let colRef = db.collection("rooms").doc(keyword).collection("users");
        const snapshots = await colRef.get();
        snapshots.forEach((doc) => {
            tempUserNames.push(doc.data().name);
        });
        return tempUserNames;
    }

    // データの削除
    const removeData = async () => {
        db.collection("rooms").doc(keyword).collection("users").doc(props.name).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const doClick = async () => {
        // キーワードをストアに追加
        props.dispatch(SetKeyword(keyword));

        await addData();
        const users = await getData();
        if(users.length === 7) {
            await removeData();
            alert("満室です");
        } else {
            router.push('/waiting_room/[room_id]', `/waiting_room/${keyword}`)
        }
    }

    function doChange(e) {
        setKeyword(e.target.value);
    }

    return (
        <div className="keyword_form">
            <div className="content">
                <p><input type="text" value={keyword} onChange={doChange}/></p>
            </div>
            <a className="inputButton" onClick={doClick}>決定</a>
        </div>
  );
}

KeywordForm = connect((state)=>state)(KeywordForm)
export default KeywordForm;