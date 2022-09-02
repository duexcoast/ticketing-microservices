import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';

const Home = ({ currentUser }) => {
  console.log(currentUser);
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

export async function getServerSideProps({ req }) {
  try {
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        withCredentials: true,
        headers: req.headers,
      }
    );
    return { props: { currentUser: data } };
  } catch (err) {
    return { props: {} };
  }
}

export default Home;
