import React from "react";
import miFoto from "../../assets/gato.png";

const Welcome = ({nombre}) => {
    if(nombre==="Desarrollador"){
        return(
        <div>
            <h2>Bienvenido, {nombre}! Eres un Crack</h2>
            <p>Este es un ejemplo de componentes modularizados</p>
            <img src={miFoto} alt="Mi Foto" width="200"/>
        </div>
    );
    } else{
        return(
        <div>
            <h2>Bienvenido, {nombre}!</h2>
            <p>Este es un ejemplo de componentes modularizados</p>
        </div>
    );
    }
};

export default Welcome;
