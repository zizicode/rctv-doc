import React from "react"
import HelmetComponent from '@components/helmet/helmetComponent'
import { styled } from "@mui/material"

import logo from './assets/rc-media.png'
import PlayerComponent from "@components/player-multimedia/PlayerComponent"
import AboutMe from '@shared/articles/home/about-me/AboutMe';

interface AppProps {
}

const App: React.FC<AppProps> = () => {
  return (
    <>
      <HelmetComponent />

      <Container className="app_content">
        <ContainerHeader className="header">
          <div className="caja_gradient">
            <img src={logo} alt="logo" />
            {/* Player */}
            <PlayerComponent />
          </div>
        </ContainerHeader>

        {/* Container */}
        <Content>
          <AboutMe />
        </Content>
      </Container>

    </>
  )
}

export default App

const Container = styled('div')`
  width:100%;
  position:relative;

`
const Content = styled('div')`
  width:100%;
  max-width:800px;
  margin:0 auto;
  padding:1rem;
  padding-bottom:10rem;
  color:black;
  
`

const ContainerHeader = styled('div')`
  width:100%;
  position:relative;
  min-height: 320px;
  margin-bottom: 250px;

  .caja_gradient{
    position:absolute;
    width:100%;
    height:100%;
    background-color: rgba(35, 51, 140, 0.6);

    img{
      position:relative;
      margin-left:50%;
      margin-top:20px;
      margin-bottom: 20px;
      transform: translateX(-50%);
    }
  }

  @media (max-width: 480px) {
      .caja_gradient{
        img{
          margin-top:40px;
        }
      }
  }
`

