import axios from 'axios';
import { Properties } from '../config';

class RestServiceUnsecure {
/*----------------------------------------------------------------------------------------------------*/


    get(urlBase, param, header=null){

        let request = {
            url: `${ Properties.domain }/${urlBase}`,
            method: "GET",
            responseType: null,
            params: param,
            headers: {...header}
        }

        return axios(request)

    }


/*----------------------------------------------------------------------------------------------------*/


	post(urlBase, data, header=null){

		let request = {
			url: `${ Properties.domain }/${urlBase}`,
			method: "POST",
			responseType: null,
            data: data,
            headers:{...header}
		}

		return axios(request)

	}


}

export default RestServiceUnsecure;