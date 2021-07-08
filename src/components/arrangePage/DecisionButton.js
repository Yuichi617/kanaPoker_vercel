import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { db } from '../../lib/firebase'
import { SetArrangeCardId } from '../../store'

function DecisionButton(props) {

    const router = useRouter();

    // データの更新
    const setData = async () => {
        db.collection("rooms").doc(props.keyword).collection("users").doc(props.name).set({
            arrange_card_id: props.arrangeCardID,
            decision: 1
        }, { merge: true })
    }

    const doClick = async() => {
        // 並び替えたカードをストアに登録
        props.dispatch(SetArrangeCardId(props.arrangeCardID));
        await setData();
        router.push("/waiting_page");
    }

    return (
        <div>
            <button type="button" className="decision_button" onClick={doClick}>OK</button>
        </div>
    )
}
DecisionButton = connect((state)=>state)(DecisionButton)
export default DecisionButton