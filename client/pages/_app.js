import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <h1>Header!</h1>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
