import { connect } from 'react-redux'

function ResetButton(props) {

    return (
        <div>
             <button type="button" className="reset_button" onClick={props.doClick}>ăȘă»ăă</button>
        </div>
    )
}
ResetButton = connect((state)=>state)(ResetButton);
export default ResetButton