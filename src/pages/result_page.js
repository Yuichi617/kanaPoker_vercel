import { useRouter } from 'next/router'
import { useEffect } from "react"
import { db } from '../lib/firebase'
import { connect } from 'react-redux'

function ResultPage(props) {

    const router = useRouter();

    const doClick = () => {

      // db.collection("rooms").doc(props.keyword).collection("users").doc(props.name).delete().then(() => {
      //   console.log("Document users successfully deleted!");
      // })

      // db.collection("rooms").doc(props.keyword).collection("action").doc("action").delete().then(() => {
      //   console.log("Document action successfully deleted!");
      // }).catch((error) => {
      //   console.log("Document action already removed");
      // });

      // db.collection("rooms").doc(props.keyword).collection("open").doc("open").delete().then(() => {
      //   console.log("Document open successfully deleted!");
      // }).catch((error) => {
      //   console.log("Document open already removed");
      // });

      router.push("/");

    }

    useEffect(()=>{
      console.log("hello result_page");
    },[])

    return (
      <div>
        <div className="main_screen">
          <div className="result_screen">
            <h1>おわり</h1>
            <button type="button" onClick={doClick}>Topへ</button>
          </div>
        </div>
      </div>
    );
  }
  ResultPage = connect((state)=>(state))(ResultPage)
  export default ResultPage