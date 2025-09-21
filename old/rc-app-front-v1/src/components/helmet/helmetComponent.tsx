import React from 'react';
import { HelmetProvider, HelmetData, Helmet } from 'react-helmet-async';

interface HelmetProps {
  title?: string;
  meta?: Array<{ name: string; content: string }>;
}

const HelmetComponent: React.FC<HelmetProps> = ({ title, meta }) => {
  const helmetContext = {};

  // Valores por defecto para title y meta
  const defaultTitle = 'En vivo';
  const defaultMeta = [
    { name: 'description', content: 'Descripción por defecto' },
  ];

  return (
    <HelmetProvider context={helmetContext as HelmetData}>
      <Helmet>
        {(title || defaultTitle) && <title>RCTV | {title || defaultTitle}</title>}
        {(meta || defaultMeta).map((item, index) => (
          <meta key={index} name={item.name} content={item.content} />
        ))}
      </Helmet>
    </HelmetProvider>
  );
};

export default HelmetComponent;

