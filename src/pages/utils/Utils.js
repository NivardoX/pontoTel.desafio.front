import React from "react";
import { Link } from 'react-router-dom';
import { CenterCard } from '../../components/template/Layout';


function NotFound () {
    return(
        <CenterCard title='menu.not_found'>
            <h1>404 - Página não encontrada!</h1>
            <Link to="/"><h3>Ir para à página principal</h3></Link>
        
        </CenterCard>

    );
}

export {NotFound}