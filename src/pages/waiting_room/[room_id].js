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
      let participate = [];
      let decision = [];
      let colRef = db.collection("rooms").doc(props.keyword).collection("users");
      const snapshots = await colRef.get();
      snapshots.forEach((doc) => {
          tempUserNames.push(doc.data().name);
          tempUserReady.push(doc.data().ready);
          participate.push(doc.data().participate);
          decision.push(doc.data().decision);
      });
      await useUserNameStatus(tempUserNames);
      await useUserReadyStatus(tempUserReady);
      return [tempUserNames, tempUserReady, participate, decision];
  }

  // 画面遷移の判定(1回目)
  const judgeReady = async(UserData) => {
    // まだ参加してなかったら実行(一つでもfalseなら実行)
    if(UserData[2].some(val => val===false)=== true) {
      console.log("judgeReady");
      // readyの和を計算
      const sum_user = UserData[1].length;
      const sum_ready = UserData[1].reduce((sum,element)=>sum+element, 0);
      console.log("Readydata: " + sum_user + "," + sum_ready);
      // 人数とreadyの数が揃ったら遷移
      if((sum_user === sum_ready) && (sum_user !== 0) && (sum_user !== 1)) {
        db.collection("rooms").doc(props.keyword).collection("users").doc(props.name).set({
          participate: true,
        }, { merge: true });
        router.push('/exchange_page');
      }
    } else { console.log("already paticipate") }
  }

  // 画面遷移の判定(2回目)
  const judgeDecision = async(UserData) => {
    // 参加していたら実行(インデックスは後で調整)
    if(UserData[2].every(val => val===true) === true) {
      console.log("judgeDecision");
      // readyの和を計算
      const sum_user = UserData[3].length;
      const sum_decision = UserData[3].reduce((sum,element)=>sum+element, 0);
      console.log("Decisiondata: " + sum_user + "," + sum_decision);
      // 人数とdecisionの数が揃ったら遷移
      if(sum_user === sum_decision) {
        router.push('/game_page');
      }
    } else { console.log("not paticipate yet") }
  }

  //更新時のcalback
  const onCollectionUpdate = async() => {
    console.log("updateData");
    const userData = await getData();
    // dbが更新されるたびに実行されてしまう。（後でなんとかする）
    await judgeReady(userData);
    await judgeDecision(userData);
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
            {/* <LeaveButton /> */}
        </div>
      </div>
    );
  }
WaitingRoom = connect((state)=>state)(WaitingRoom)
export default WaitingRoom