import React, { useState, useEffect } from "react"
import { db } from '../../lib/firebase'
import Image from 'next/image'
import { connect } from 'react-redux'

function See (props) {

    // 画像ファイルへのパスを作成 
    const card_image = props.cards.map(x => "/images/kanaCard/" + x + ".png");

    let card_back_list = [];
    for (let i=0;i<props.cards.length;i++) {
          card_back_list.push(<a className="card"><Image src="/images/card_back.png" width={108} height={136} /></a>)
      }

    useEffect(()=>{
        console.log("hello See");
    },[])

    return (
        <div className="see">
            <h1>{props.userName}さんのターンです</h1>
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
                            {
                            card_image.map((fname)=>{
                                return <a className="card"><Image src={fname} width={108} height={136} /></a>
                            })
                            }
                            </div>
                        )
                    }
                })()}
        </div>
    );
  }
See = connect((state)=>(state))(See)
export default See