import React from 'react'
import {  Paper } from "@mui/material";
import BoxModalContact from '@components/box-modal-contact/BoxModalContact';

interface ItemContainerGridProps {
    imgSrc: string;
    description: string;
}

const ItemContainerGrid: React.FC<ItemContainerGridProps> = ({imgSrc,description}) => {
    return (
        <Paper style={{ minWidth: 250, maxWidth:200, padding: 16, textAlign: "center", margin: 16 }}>
            <img src={imgSrc} alt="Item" style={{ width: "100%", borderRadius: 5 }} />
            <p><strong>{description}</strong></p>
            <BoxModalContact buttonText={"Contactar"}/>
        </Paper>
    )
}

export default ItemContainerGrid;
