import React from 'react';
import BasePage from '../basePage/BasePage';
import { AdminPanel } from '../adminPanel/AdminPanel';
import MessageService from '../../services/MessageService';





/*
class Home extends BasePage {
	render()
	{
		return (
			<React.Fragment>
				<div className="card text-white bg-dark shadow">
					<h2 className="card-header text-center text-uppercase">SPA</h2>
					<div className="card-body p-4">
						<h3 className="card-title">Descrição</h3>
						<p className="card-text primary-text text-justify" style={{textIndent:"5%"}}>SPA é uma ferramenta para ...</p>
					</div>
				</div>
			</React.Fragment>
		);
	}
}*/


class Home extends BasePage {

	logout(){
		localStorage.clear();
		window.location.reload();
	}
	render()
	{
		return(

			<AdminPanel {...this.props}/>
		);


	}
}


export default Home;
