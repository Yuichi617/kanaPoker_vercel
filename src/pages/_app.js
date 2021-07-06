import '../public/reset.css'
import '../public/style.css'
import App, { Container } from 'next/app';
import React from 'react';
import withReduxStore from '../lib/redux-store';
import { Provider } from 'react-redux';

class MyApp extends App {
  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      // <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      // </Container>
    )
  }
}

export default withReduxStore(MyApp)