import { connect } from 'react-redux'
import Image from 'next/image'
import { useEffect } from "react"
import { db } from '../lib/firebase'

// 画面遷移の判定は [room_id].js で行っている(後で修正)
function WaitingPage(props) {

  // 画像ファイルへのパスを作成
  const card_image = props.arrange_card_id.map(x => "/images/kanaCard/" + x + ".png");

  useEffect(()=>{

    console.log("hello waiting_page");

    const f = async() => {

      // アクションドキュメントがなければ作成(最初に入った人が作成)
      const itemsRef = db.collection("rooms").doc(props.keyword).collection("action");
      
      const itemRef = itemsRef.doc('order');
      const doc = await itemRef.get();
  
      if (doc.exists) {
        console.log("action document ordre already exist");
      } else {
        console.log("add action document");
        db.collection("rooms").doc(props.keyword).collection("action").doc("order").set({
          order: 0
        })
      }

      // オープンドキュメントがなければ作成(最初に入った人が作成)
      const itemsRef2 = db.collection("rooms").doc(props.keyword).collection("open");
      
      const itemRef2 = itemsRef2.doc('open');
      const doc2 = await itemRef2.get();
  
      if (doc2.exists) {
        console.log("open document ordre already exist");
      } else {
        console.log("add open document");
        db.collection("rooms").doc(props.keyword).collection("open").doc("open").set({
          open: false
        })
      }

    }

    f();
  },[])

    return (
        <div className="waiting_screen">
          <h1>待機中...</h1>
          <div className="card-container">
            {card_image.map((fname)=>{
                return <a className="card" ><Image src={fname} width={108} height={136} /></a>
            })
            }
            </div>
            <p>あなたの手札</p>
        </div>
    );
  }
  WaitingPage = connect((state)=>state)(WaitingPage)
  export default WaitingPage