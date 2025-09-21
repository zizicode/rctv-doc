import React from 'react';

import styled from '@emotion/styled';

interface FooterProps {
    // ...
}

const Footer: React.FC <FooterProps>  = () => {
  return (
    <ContentFooter>
        <p>© <span id="year">2023 </span> Rodolfo Cordones. Todos los derechos reservados.</p>
        <a href="https://www.instagram.com/zizicode_/">Create by: zizicode</a>
    </ContentFooter>
  )
}

export default Footer;

const ContentFooter = styled('div')`
    padding:20px 10px 10px 10px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;

    p{
        font-size:14px;
        text-align:center;
        pading:5px 10px;
    }

    a{
        font-size:10px;
        color:#1A2354;
    }
`
