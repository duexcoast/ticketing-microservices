import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';

const Home = ({ currentUser }) => {
  console.log(currentUser);
  axios.get('/api/users/currentuser').catch((err) => {
    console.log(err);
  });
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>tickets.dev</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
        <h1 className='text-6xl font-bold'>
          Microservices{' '}
          <a className='text-blue-600' href='https://nextjs.org'>
            Architecture
          </a>
        </h1>

        <p className='mt-3 text-2xl'>You are signed in</p>
      </main>

      <footer className='flex h-24 w-full items-center justify-center border-t'>
        <a
          className='flex items-center justify-center gap-2'
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};

// export async function getServerSideProps() {
//   try {
//     const { data } = await axios.get('/api/users/currentuser');
//     // double bang returns boolean
//     return { props: { isLogedIn: !!data.currentUser } };
//   } catch (error) {
//     return { props: { isLoggedIn: false } };
//   }
// }

Home.getInitialProps = async () => {
  const response = await axios.get('/api/users/currentuser');

  return response.data;
};

export default Home;
