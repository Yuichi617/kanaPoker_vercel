import React, { useState, useEffect } from "react"
import { db } from '../lib/firebase'
import { connect } from 'react-redux'
import Do from '../components/gamePage/Do'
import See from '../components/gamePage/See'

function GamePage(props) {

    const [userNames, setUserNames] = useState([]);
    const [userCards, setUserCards] = useState([]);
    const [order, setOrder] = useState(0);
    // 自分のターンかどうかを判断するフラグ
    const [myTurn, setMyTurn] = useState(false);

    // stateを更新
    const useUserNamesStatus = async(names) => {
        setUserNames(names);
    }
    const useUserCardsStatus = async(cards) => {
        setUserCards(cards);
    }
    const useMyTurnStatus = async(judge) => {
        setMyTurn(judge);
    }

    // データの取得
    const getData = async () => {
        let tempUserNames = [];
        let tempUserCards = [];
        let colRef = db.collection("rooms").doc(props.keyword).collection("users");
        const snapshots = await colRef.get();
        snapshots.forEach((doc) => {
            tempUserNames.push(doc.data().name);
            tempUserCards.push(doc.data().arrange_card_id);
        });
        await useUserNamesStatus(tempUserNames);
        await useUserCardsStatus(tempUserCards);
        console.log(tempUserNames, tempUserCards);
        return [tempUserNames, tempUserCards];
    }

    // 自分のターンかどうかを判定
    const judgeTurnNum = async (userData) => {
        console.log(userData[0], props.name, order);
        if (userData[0][order] == props.name) {
            await useMyTurnStatus(true);
            console.log("myTurn: "+myTurn);
        } else {
            await useMyTurnStatus(false);
            console.log("myTurn: "+myTurn);
        }
    }

    useEffect(()=>{
        console.log("hello game_page");
        const f = async() => {
            const userData = await getData();
            await judgeTurnNum(userData);
          }
          f();
    },[])

    return (
      <div>
        <div className="main_screen">
          <h1>ひらがなポーカー</h1>
          <Do />
          <See />
        </div>
      </div>
    );
  }
  GamePage = connect((state)=>(state))(GamePage)
  export default GamePage