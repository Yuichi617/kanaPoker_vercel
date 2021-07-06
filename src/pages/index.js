import StartForm from '../components/StartForm'
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

function StartPage() {
    return (
      <div>
        <div className="main_screen">
          <h1>ひらがなポーカー</h1>
          {process.env.FIREBASE_API_KEY}
          <StartForm />
        </div>
      </div>
    );
  }
  export default StartPage