import { connect } from 'react-redux'
import ArrangeField from '../components/arrangePage/ArrangeField'
import DecisionButton from '../components/arrangePage/DecisionButton'

function ArraangePage(props) {

    return (
        <div className="arrange_screen">
            <h1>並び替えフェーズ</h1>
            <ArrangeField />
            <DecisionButton />
        </div>
    );
  }
  ArraangePage  = connect((state)=>state)(ArraangePage)
  export default ArraangePage