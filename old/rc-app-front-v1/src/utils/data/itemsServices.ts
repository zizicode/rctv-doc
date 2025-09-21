import image1 from "@assets/servicios/servicios.png";
import image2 from "@assets/servicios/servicios2.png";


interface ItemProps {
    imgSrc: string;
    description: string;
}
  
  const items: ItemProps[] = [
    {
      imgSrc: image1,
      description: "Imagenes Aereas",
    },
    {
      imgSrc: image2,
      description: "Transmision en Vivo",
    },
  ];
  
  export default items;