import React, { useState, useEffect } from "react"
import { db } from '../lib/firebase'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import Do from '../components/gamePage/Do'
import See from '../components/gamePage/See'

function GamePage(props) {

    const router = useRouter();

    const [userNames, setUserNames] = useState([]);
    const [userCards, setUserCards] = useState([[1]]);
    const [order, setOrder] = useState(0);
    // 自分のターンかどうかを判断するフラグ
    const [myTurn, setMyTurn] = useState(false);
    // openボタンを押したかどうかのフラグ
    const [open, setOpen] = useState(false);

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
    const useOrderStatus = async(order_num) => {
        setOrder(order_num);
    }
    const useOpenStatus = async(judge) => {
        setOpen(judge);
    }

    // データの取得
    const getData = async () => {
        console.log("getData");
        let tempUserNames = [];
        let tempUserCards = [];
        let tempOrder = [];

        let colUsersRef = db.collection("rooms").doc(props.keyword).collection("users");
        const snapshots_users = await colUsersRef.get();
        snapshots_users.forEach((doc) => {
            tempUserNames.push(doc.data().name);
            tempUserCards.push(doc.data().arrange_card_id);
        });
        // 最後の遷移のために仕方なく
        tempUserCards.push([1]);

        let colActionRef = db.collection("rooms").doc(props.keyword).collection("action");
        const snapshots_action = await colActionRef.get();
        snapshots_action.forEach((doc) => {
            tempOrder.push(doc.data().order);
        });

        await useUserNamesStatus(tempUserNames);
        await useUserCardsStatus(tempUserCards);

        return [tempUserNames, tempUserCards, tempOrder[0]];
    }

    // 自分のターンかどうかを判定
    const judgeTurnNum = async (userData) => {
        console.log("judgeTurnNum");
        if (userData[0][order] == props.name) {
            await useMyTurnStatus(true);
        } else {
            await useMyTurnStatus(false);
        }
    }

    // 全員終わったかどうかを判定
    const judgeFinish = async (userData) => {
        console.log("judgeFinish");
        if (userData[0].length == userData[2]) {
            console.log("finish");
            router.push("/result_page");
        } else {
            console.log("continue");
        }
    }

    // Doに渡す関数
    // nextボタンがクリックされたらorder, openを更新
    const updateOrderDo = async () => {
        console.log("updateOrderDo");
        // 現在の値を取得
        let tempOrderList = [];
        let colRef = db.collection("rooms").doc(props.keyword).collection("action");
        const snapshots = await colRef.get();
        snapshots.forEach((doc) => {
            tempOrderList.push(doc.data().order);
        });
        let nextOrder = tempOrderList[0]+1;
        // 値を更新
        db.collection("rooms").doc(props.keyword).collection("action").doc("order").set({
            order: nextOrder
          });
        db.collection("rooms").doc(props.keyword).collection("open").doc("open").set({
            open: false
        });
        await useOrderStatus(nextOrder);
        await useOpenStatus(false);
    }

    // openを更新
    const updateOpen = async () => {
        console.log("updateOpen");
        db.collection("rooms").doc(props.keyword).collection("open").doc("open").set({
            open:true
          })
        await useOpenStatus(true);
    }

    // Seeに渡す関数
    // firestoreのorderが更新されたらstateのorder, openを更新
    const updateOrderSee = async () => {
        console.log("updateOrderSee");
        // 現在の値を取得
        let tempOrderList = [];
        let colRef = db.collection("rooms").doc(props.keyword).collection("action");
        const snapshots = await colRef.get();
        snapshots.forEach((doc) => {
            tempOrderList.push(doc.data().order);
        });
        let nextOrder = tempOrderList[0];
        // 値を更新
        await useOrderStatus(nextOrder);
        await useOpenStatus(false);
    }

    // firestoreのopenが更新されたらstateのopenを更新
    const updateOpenSee = async() => {
        console.log("updateOpenSee");
        // 現在の値を取得
        let tempOpenList = [];
        let colRef = db.collection("rooms").doc(props.keyword).collection("open");
        const snapshots = await colRef.get();
        snapshots.forEach((doc) => {
            tempOpenList.push(doc.data().open);
        });
        let open = tempOpenList[0];
         // 値を更新
         await useOpenStatus(open);
    }

    const UpdateFirestore = async() => {
        console.log("UpdateFirestore");
        // open document に変更があった場合 updateopen を実行
        let unsubscribe1 = db.collection("rooms").doc(props.keyword).collection("open").onSnapshot(updateOpenSee);
        // action document に変更があった場合 updateOrder を実行
        let unsubscribe2 = db.collection("rooms").doc(props.keyword).collection("action").onSnapshot(updateOrderSee);
    }

    useEffect(()=>{
        console.log("hello game_page");

        const f = async() => {
            await UpdateFirestore();
            const userData = await getData();
            await judgeTurnNum(userData);
            await judgeFinish(userData);
          }

        f();

    },[order])

    return (
      <div>
        <div className="main_screen">
            <div className="game_screen">
                {(() => {
                if(myTurn==true) {
                    return <Do doClick={updateOrderDo} doOpen={updateOpen} open={open}/>
                } else {
                    return <See updateOrder={updateOrderSee} updateOpen={updateOpenSee} userName={userNames[order]} cards={userCards[order]} open={open} order={order}/>
                }
            })()}
            </div>
        </div>
      </div>
    );
  }
  GamePage = connect((state)=>(state))(GamePage)
  export default GamePage