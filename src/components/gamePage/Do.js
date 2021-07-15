import React, { useState, useEffect } from "react"
import Image from 'next/image'
import { connect } from 'react-redux'

function Do (props) {

    // 画像ファイルへのパスを作成
    const card_image = props.arrange_card_id.map(x => "/images/kanaCard/" + x + ".png");

    let card_back_list = [];
    for (let i=0;i<props.arrange_card_id.length;i++) {
            card_back_list.push(<a className="card"><Image src="/images/card_back.png" width={108} height={136} /></a>)
        }

    useEffect(()=>{
        console.log("hello Do");
    },[])

    return (
      <div className="do">
        <h1>あなたのターンです</h1>
        {(() => {
                if(props.open===false) {
                    return (
                        <div className="card-container">
                            {card_back_list}
                        </div>
                    )
                } else {
                    return (
                        <div className="card-container">
                        {card_image.map((fname)=>{
                            return <a className="card"><Image src={fname} width={108} height={136} /></a>
                        })
                        }
                        </div>
                    )
                }
            })()}
       
        <button type="button" className="open_button" onClick={props.doOpen}>Open</button>
        <button type="button" className="next_button" onClick={props.doClick}>Next</button>
      </div>
    );
  }
Do = connect((state)=>(state))(Do)
export default Do