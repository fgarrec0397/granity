import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Layout from '@/components/layout';

export default function FirstPost() {
    return (
        <Layout>
          <Head>
            <title>First Post</title>
            <meta name="description" content="First post content" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <h1>First Post</h1>
          <Image
                src="/images/profile.jpg" // Route of the image file
                height={144} // Desired size with correct aspect ratio
                width={144} // Desired size with correct aspect ratio
                alt="Your Name"
            />
          <h2>
            <Link href="/">Back to home</Link>
          </h2>
        </Layout>
      );
  }