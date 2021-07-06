import React, { useState, useEffect } from "react"
import { db } from '../../lib/firebase'
import { connect } from 'react-redux'
import UserList from '../../components/UserList'
import LeaveButton from '../../components/LeaveButton'
import ReadyButton from '../../components/ReadyButton'
import { useRouter } from 'next/router'

function WaitingRoom(props) {

  const router = useRouter();

  const [userNames, setUserNames] = useState([]);
  const [userReady, setUserReady] = useState([]);

   // stateを更新
   const useUserNameStatus = async(names) => {
     if (names.toString() !== userNames.toString()){
      setUserNames(names);
     }
  }
  const useUserReadyStatus = async(ready) => {
    if (ready.toString() !== userReady.toString()){
      setUserReady(ready);
    }
  }

  // データの取得
  const getData = async () => {
      console.log("getData");
      let tempUserNames = [];
      let tempUserReady = [];
      let colRef = db.collection("rooms").doc(props.keyword).collection("users");
      const snapshots = await colRef.get();
      snapshots.forEach((doc) => {
          tempUserNames.push(doc.data().name);
          tempUserReady.push(doc.data().ready);
      });
      await useUserNameStatus(tempUserNames);
      await useUserReadyStatus(tempUserReady);
      return [tempUserNames, tempUserReady];
  }

  // 画面遷移の判定
  const judgeReady = async(ReadyData) => {
    console.log("judgeReady");
    // readyの和を計算
    const sum_user = ReadyData.length;
    const sum_ready = ReadyData.reduce((sum,element)=>sum+element, 0);
    console.log("Readydata: " + sum_user + "," + sum_ready);
    // 人数とreadyの数が揃ったら遷移
    if((sum_user === sum_ready) && (sum_user !== 0) && (sum_user !== 1)) {
      router.push('/exchange_page')
    }
  }

  //更新時のcalback
  const onCollectionUpdate = async() => {
    console.log("updateData");
    const userData = await getData();
    await judgeReady(userData[1]);
  }

  useEffect(()=>{
      const f = async() => {
        console.log("useEffect1")
        await getData();
        // データの変更を監視
        // 変更があった場合 onCollectionUpdate を実行
        console.log("useEffect2")
        db.collection("rooms").doc(props.keyword).collection("users").onSnapshot(onCollectionUpdate);
      }
      f();
  },[])

    return (
      <div className="waiting_room">
        <div className="main_screen">
            <h1>参加者</h1>
            <UserList userNames={userNames}/>
            <ReadyButton />
            <LeaveButton />
        </div>
      </div>
    );
  }
WaitingRoom = connect((state)=>state)(WaitingRoom)
export default WaitingRoom