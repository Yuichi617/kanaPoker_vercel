import Image from 'next/image'
import { connect } from 'react-redux'

function ArrangeCards(props) {

    // 画像を選択順に並び替え
    const arrange_card_id = props.selectOrder.map(x => props.card_id[x]);

    // 画像ファイルへのパスを作成
    const card_image = arrange_card_id.map(x => "/images/kanaCard/" + x + ".png");

    return (
        <div className="card-container">
            {card_image.map((fname)=>{
                return <a className="card" ><Image src={fname} width={108} height={136} /></a>
            })
            }
        </div>
    )
}
ArrangeCards = connect((state)=>state)(ArrangeCards);
export default ArrangeCards