import { useEffect, useState } from 'react';
import './app.scss';
import Header from './Header';
import Footer from './Footer';
export default function Layout({ children }: { children: React.ReactNode }) {
  const [chip, setChip] = useState(children)

  useEffect(() => {
    setTimeout(() => {
      setChip(children)
    }, 3000);
  },[children])

  return (
      <div className="layout">
        <Header/>
        <main className="flex-1 p-6"><div className="max"><br />{chip}</div></main>
        <Footer/>
      </div>
  );
}
