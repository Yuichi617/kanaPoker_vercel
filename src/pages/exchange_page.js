import CardList from '../components/exchangePage/CardList'
import DecisionButton from '../components/exchangePage/DecisionButton'
import { connect } from 'react-redux'
import { SetCardId } from '../store'
import { useEffect } from "react"

function ExchangePage(props) {

    useEffect(()=>{
        // 1〜51までの配列を作る
        let arr = [...Array(51)].map((_, i) => i+1);
        let a = arr.length;
        //1〜52までの配列をシャッフル
        while (a) {
            let j = Math.floor( Math.random() * a );
            let t = arr[--a];
            arr[a] = arr[j];
            arr[j] = t;
        }
        // 最初の5要素を切り取る
        const card_id = arr.slice(0,5);
        console.log(card_id)
        // ストアにカードのidリストを追加
        props.dispatch(SetCardId(card_id));
    },[])

    return (
        <div className="exchange_screen">
            <h1>手札決定フェーズ</h1>
            <CardList />
            <DecisionButton />
        </div>
    );
  }
  ExchangePage  = connect((state)=>state)(ExchangePage)
  export default ExchangePage