function CopyTextsArea(idDelElemento: string): void {
    const elemento = document.getElementById(idDelElemento);
  
    if (elemento) {
      const texto: any = elemento.textContent;
  
      if (navigator.clipboard) {
        navigator.clipboard.writeText(texto)
          .then(() => {
            console.log('Success Copy!');
          })
          .catch((error) => {
            console.error('Error al copiar al portapapeles:', error);
          });
      }else{
        console.log('No se pudo copiar')
      }

    }
  }

  export default CopyTextsArea;