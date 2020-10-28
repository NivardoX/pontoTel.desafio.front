import { Component } from 'react';
import {AlertifyError, AlertifySuccess} from "../../services/AlertifyService";

class BasePage extends Component
{
	constructor(props)
	{
		super(props);


		this.state = {
			fieldErrors: [],
			response_status: false,
		};

		if(this.props.role == null) {
			this.props.onLoadUserRole();
		}
	}


}

export default BasePage;
