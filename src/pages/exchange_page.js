import CardList from '../components/exchangePage/CardList'
import ExchangeButton from '../components/exchangePage/ExchangeButton'
import DecisionButton from '../components/exchangePage/DecisionButton'

function ExchangePage() {
    // 1〜52までの配列を作る
    let arr = [...Array(52)].map((_, i) => i+1);
    let a = arr.length;
    //1〜52までの配列をシャッフル
    while (a) {
        let j = Math.floor( Math.random() * a );
        let t = arr[--a];
        arr[a] = arr[j];
        arr[j] = t;
    }
    // 最初の5要素を切り取る
    let card_list = arr.slice(0,5);

    return (
        <div className="game_screen">
            <h1>手札決定フェーズ</h1>
            <CardList card_list={card_list}/>
            <ExchangeButton />
            <DecisionButton />
        </div>
    );
  }
  export default ExchangePage