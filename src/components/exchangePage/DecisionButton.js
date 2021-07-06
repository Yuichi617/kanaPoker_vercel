import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { db } from '../../lib/firebase'

function DecisionButton(props) {
    const router = useRouter();

    // データの追加
    const setData = async () => {
        db.collection("rooms").doc(props.keyword).collection("users").doc(props.name).set({
            card_id: props.card_id,
        }, { merge: true })
    }

    const doClick = async() => {
        await setData();
        router.push("/arrange_page");
    }

    return (
        <div>
            <button type="button" className="decision_button" onClick={doClick}>OK</button>
        </div>
    )
}
DecisionButton = connect((state)=>state)(DecisionButton)
export default DecisionButton