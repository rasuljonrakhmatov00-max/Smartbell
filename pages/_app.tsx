import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Minimal global style import

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
