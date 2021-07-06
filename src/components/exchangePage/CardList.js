import Image from 'next/image'

function CardList(props) {

    const selectCard = () => {
        const card = document.getElementById('card');
        classList.toggle('select');
    }

    const doClick = () => {
        console.log("click");
    }

    return (
        <div className="card-container">
            <a onClick={doClick}><Image src="/images/kanaCard/1.png" alt="card1" width={135} height={170} /></a>
            <a onClick={doClick}><Image src="/images/kanaCard/2.png" alt="card2" width={135} height={170} /></a>
            <a onClick={doClick}><Image src="/images/kanaCard/3.png" alt="card3" width={135} height={170} /></a>
            <a onClick={doClick}><Image src="/images/kanaCard/4.png" alt="card4" width={135} height={170} /></a>
            <a onClick={doClick}><Image src="/images/kanaCard/5.png" alt="card5" width={135} height={170} /></a>
        </div>
    )
}
export default CardList