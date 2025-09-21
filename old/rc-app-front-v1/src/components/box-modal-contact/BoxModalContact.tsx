import React, { useState } from 'react';
// styles
import './BoxModalContact.scss';
import {
    Backdrop,
    Box,
    Modal,
    Fade,
    Button,
    styled
} from '@mui/material';
import CopyTextsArea from 'src/helpers/copy-texts/CopyTextArea';

interface BoxModalContactProps {
    buttonText?: any;
}


const BoxModalContact: React.FC<BoxModalContactProps> = ({ buttonText }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCopyClick = () => {
        CopyTextsArea('test');
      };

    return (
        <div>
            <Button onClick={handleOpen}>{buttonText}</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <ItemBox>
                        <ItemButton href="mailto:rodolfocordones.media@gmail.com" className='buttonEmail'>
                            Contactar
                        </ItemButton>
                        <Email  className='p'  onClick={handleCopyClick}>
                            <span id='test'>rodolfocordones.media@gmail.com</span>
                        </Email>
                    </ItemBox>
                </Fade>
            </Modal>
        </div>
    );
};

export default BoxModalContact;

const ItemBox = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    max-width: 300px;
    background-color: white;
    height: 100px;
    color: black;
    border: 2px solid black;

    // border-radius: 10px;
    overflow: hidden;
`

const Email = styled('p')`
    &.p{
        padding: 10px !important;
        text-align: center;
        color: #A3A4A5;
        background-color: white;
        display: block;
        flex: 1;
        font-size: 14px;
    }
`

const ItemButton = styled('a')`
position: absolute;
bottom:0;
padding:20px;
text-align: center;
    flex: 1;
    width: 100%;
    background-color: $color-bg-component;
`