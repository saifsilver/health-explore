import {Provider} from 'react-redux';
import '../styles/globals.css'
// import "tailwindcss/tailwind.css"; include in css
import store from '../redux/store';

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
