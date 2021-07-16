import Image from 'next/image'
import { useState, useEffect } from "react";
import { connect } from 'react-redux'
import ExchangeButton from './ExchangeButton'
import { SetCardId } from '../../store'

function CardList(props) {

    const [select, setSelect] = useState([false, false, false, false, false]);
    // カードを交換したかどうかのフラグ
    const [flg, setFlg] = useState(false);

    // 画像ファイルへのパスを作成
    const card_image = props.card_id.map(x => "/images/kanaCard/" + x + ".png");


    // クリックした要素にselectクラスをつけ外し
    const doClick = (e) => {
        const card_id = e.currentTarget.getAttribute('data-id');
        const select_copy = select.slice();
        if (select[card_id] === true) {
            select_copy[card_id] = false;
        } else {
            select_copy[card_id] = true;
        }
        setSelect(select_copy);
    }

    // ExchangeButtonに渡す関数
    const exchange = () => {
        const select_id = [];
        for (let i=0;i<select.length;i++) {
            if(select[i]===true){
                select_id.push(i);
            }
        }
        
        // 1〜51までの配列を作る
        let arr = [...Array(56)].map((_, i) => i+1);
        //  今選択されているカードを抜く
        for (let i=0;i<5;i++) {
            arr.splice(props.card_id[i]-1,1);
        }

        let a = arr.length;
        //  配列をシャッフル
         while (a) {
             let j = Math.floor( Math.random() * a );
             let t = arr[--a];
             arr[a] = arr[j];
             arr[j] = t;
         }

        // 選択されているカードを変更
        let new_card_id = props.card_id;
        for (let i=0;i<select_id.length;i++) {
            new_card_id[select_id[i]] = arr[i];
        }
        console.log(new_card_id);
        // ストアに更新したカードのidリストを追加
        props.dispatch(SetCardId(new_card_id));
        // カードを元の位置に戻す
        setSelect([false, false, false, false, false]);
        setFlg(true);
    }

    return (
        <div>
            <div className="card-container">
                <a className={"card" + " " + `${select[0] ? "select":""}`} onClick={doClick} data-id="0"><Image src={card_image[0]} alt="card1" width={135} height={170} /></a>
                <a className={"card" + " " + `${select[1] ? "select":""}`} onClick={doClick} data-id="1"><Image src={card_image[1]} alt="card2" width={135} height={170} /></a>
                <a className={"card" + " " + `${select[2] ? "select":""}`} onClick={doClick} data-id="2"><Image src={card_image[2]} alt="card3" width={135} height={170} /></a>
                <a className={"card" + " " + `${select[3] ? "select":""}`} onClick={doClick} data-id="3"><Image src={card_image[3]} alt="card4" width={135} height={170} /></a>
                <a className={"card" + " " + `${select[4] ? "select":""}`} onClick={doClick} data-id="4"><Image src={card_image[4]} alt="card5" width={135} height={170} /></a>
            </div>
            <ExchangeButton doClick={exchange} flg={flg}/>
        </div>

    )
}
CardList = connect((state)=>state)(CardList);
export default CardList