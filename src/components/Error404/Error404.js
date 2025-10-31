import React from "react";
import { TbFaceIdError } from "react-icons/tb";
import './Error404.css';

const Error404 = () => {
    return (
    <div className="error">
      <h2>Error 404</h2>
      <p>Pagina no encontrada</p>
      < TbFaceIdError />
    </div>
  );
}

export default Error404;