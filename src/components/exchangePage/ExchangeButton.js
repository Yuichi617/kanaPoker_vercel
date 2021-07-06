import { connect } from 'react-redux'
import { SetCardId } from '../../store'

function ExchangeButton(props) {

    return (
        <div>
             <button type="button" className={"exchange_button" + " " + `${props.flg ? "used":""}`} onClick={props.doClick}>交換</button>
        </div>
    )
}
ExchangeButton = connect((state)=>state)(ExchangeButton);
export default ExchangeButton