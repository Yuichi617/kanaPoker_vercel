import { useRouter } from 'next/router'

function ResultPage() {

    const router = useRouter();

    const doClick = () => {
        router.push("/");
    }

    return (
      <div>
        <div className="main_screen">
          <h1>終わり</h1>
          <p onClick={doClick}>Topへ</p>
        </div>
      </div>
    );
  }
  export default ResultPage