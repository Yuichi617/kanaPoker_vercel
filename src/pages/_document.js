import Document, { Head, Main, NextScript, Html} from 'next/document';
 
class MyDocument extends Document {
    render() {
        return (
            <Html lang="ja">
                <Head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="description" content="Web site created using create-react-app" />
                    <title>Kana Poker</title>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
export default MyDocument