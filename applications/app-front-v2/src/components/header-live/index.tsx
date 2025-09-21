import React from 'react';
import './headerLive.scss';
import LiveView from './live/LiveView';

const HeaderLive: React.FC = () => {
    return (
        <div className='headerLive'>
            <div className="container-live">
                <div className="detail-live">
                    <h1>Transmisión en Vivo</h1>

                    <p>
                        El Primer Canal y radio online desde Villa Hermosa, La Romana, República Dominicana
                    </p>
                    <p>
                        Escucha 24/7 la programación de nuestra emisora digital.
                    </p>

                    <button className='emision'>Escuchar Ahora</button>
                </div>
                <div className="live">
                    <LiveView/>
                </div>
            </div>
        </div>
    )
}

export default HeaderLive