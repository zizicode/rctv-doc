import React from 'react';
import './home.scss';
import HeaderLive from '@/components/header-live';
import LastPost from '@/components/LastPost';
import OtherPost from '@/components/OtherPost';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeaderLive/>
      <LastPost/>
      <OtherPost/>
    </div>
  )
}

export default HomePage