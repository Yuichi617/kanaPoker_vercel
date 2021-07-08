import Image from 'next/image'
import { useState, useEffect } from "react";
import { connect } from 'react-redux'
import ResetButton from './ResetButton'
import ArrangeCards from './ArrangeCards'
import DecisionButton from './DecisionButton'

function ArrangeField(props) {

    // クリック順を格納する配列
    const [selectOrder, setSelectOrder] = useState([]);
    // 選択されているかどうかを格納する配列
    const [select, setSelect] = useState([false, false, false, false, false]);
    // 並び替えたカードを格納する配列
    const [arrangeCardID, setArrangeCardID] = useState([]);

    // 画像ファイルへのパスを作成
    const card_image = props.card_id.map(x => "/images/kanaCard/" + x + ".png");

    const doClick = (e) => {
        const card_id = e.currentTarget.getAttribute('data-id');
        // selectの更新
        const select_copy = select.slice();
        select_copy[card_id] = true;
        setSelect(select_copy);
        // selectOrderの更新
        const selectOrder_copy = selectOrder.slice();
        selectOrder_copy.push(Number(card_id));
        setSelectOrder(selectOrder_copy);
        // arrangeCardIDの更新
        const arrange_card_id_copy = selectOrder_copy.map(x => props.card_id[x]);
        setArrangeCardID(arrange_card_id_copy);
        // console.log(arrangeCardID);
    }

    // ResetButtonに渡す関数
    const reset = () => {
        // カードを選択されていない状態にする
        setSelectOrder([]);
        setArrangeCardID([]);
        setSelect([false, false, false, false, false]);
    }

    return (
        <div>
            <div className="card-container">
                <a className={"card" + " " + `${select[0] ? "select":""}`} data-id="0" onClick={doClick}><Image src={card_image[0]} alt="card1" width={108} height={136} /></a>
                <a className={"card" + " " + `${select[1] ? "select":""}`} data-id="1" onClick={doClick}><Image src={card_image[1]} alt="card2" width={108} height={136} /></a>
                <a className={"card" + " " + `${select[2] ? "select":""}`} data-id="2" onClick={doClick}><Image src={card_image[2]} alt="card3" width={108} height={136} /></a>
                <a className={"card" + " " + `${select[3] ? "select":""}`} data-id="3" onClick={doClick}><Image src={card_image[3]} alt="card4" width={108} height={136} /></a>
                <a className={"card" + " " + `${select[4] ? "select":""}`} data-id="4" onClick={doClick}><Image src={card_image[4]} alt="card5" width={108} height={136} /></a>
            </div>
            <ArrangeCards selectOrder={selectOrder} />
            <ResetButton doClick={reset}/>
            <DecisionButton arrangeCardID={arrangeCardID}/>
        </div>

    )
}
ArrangeField = connect((state)=>state)(ArrangeField);
export default ArrangeField