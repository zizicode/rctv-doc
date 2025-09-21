import React from 'react';
import { IconButton } from '@mui/material';

// Styles
import './ButtonIconText.scss';

// Interfaz para definir las propiedades del componente
interface SocialButtonProps {
  backgroundColor?: string;
  text?: string;
  icon?: JSX.Element; // Icono en formato JSX.Element
  url?: string;
}


const ButtonIconText: React.FC<SocialButtonProps> = (props) => {
  const { text, icon, url } = props;

  if (url) {
    // Si se proporciona una URL, utiliza un enlace
    return (
      <a href={url} target='_blank' className="button-link">
        <IconButton size="large" className={text}>
          {icon}
          {text}
        </IconButton>
      </a>
    );
  }

  // Si no se proporciona una URL, simplemente renderiza el botón
  return (
    <IconButton size="large" className={text}>
      {icon}
      {text}
    </IconButton>
  );
};


export default ButtonIconText;