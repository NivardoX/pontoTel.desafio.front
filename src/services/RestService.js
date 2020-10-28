import axios from 'axios';
import { Properties } from '../config';
import AuthService from './AuthService';

class RestService {

/*----------------------------------------------------------------------------------------------------*/

	constructor() {
		this.Auth = new AuthService();
	}

/*----------------------------------------------------------------------------------------------------*/

	get(urlBase, parameters) {
		return this.Auth.doRequest(urlBase, 'GET', parameters, {}, null).then(function(res) {
			return {
				...res,
				data: {
					...res.data,
					response_status: true
				}
			};
		});		
	}

/*----------------------------------------------------------------------------------------------------*/

	post(urlBase, parameters) {
		return this.Auth.doRequest(urlBase, 'POST', parameters, {}, null);
	}

/*----------------------------------------------------------------------------------------------------*/

	delete(urlBase, parameters) {
		return this.Auth.doRequest(urlBase, 'DELETE', parameters, {}, null);
	}

/* ----------------------------------------------------------------------------------------------------*/

	put(urlBase, parameters) {
		return this.Auth.doRequest(urlBase, 'PUT', parameters, {}, null);		
	}
/*----------------------------------------------------------------------------------------------------*/

	postFile(urlBase, parameters) {
		return this.Auth.doRequest(urlBase, 'POST', parameters, {}, 'blob');
	}

/*----------------------------------------------------------------------------------------------------*/

	getFile(urlBase, parameters) {
		return this.Auth.doRequest(urlBase, 'GET', parameters, {}, 'blob');
	}

/*----------------------------------------------------------------------------------------------------*/


}

export default RestService;