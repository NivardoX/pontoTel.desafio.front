import BasePage from './BasePage';
import RestService from '../../services/RestService';
import { AlertifySuccess, AlertifyError } from '../../services/AlertifyService';

const Rest = new RestService();

class BasePageForm extends BasePage
{
	constructor(props)
	{
		super(props);

		if(this.props.role == null) {
			this.props.onLoadUserRole();
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
		this.handleReceiveResponseRest = this.handleReceiveResponseRest.bind(this);
		this.handleReceiveResponseRestDelete = this.handleReceiveResponseRestDelete.bind(this);
		this.handleReceiveResponseRestListErrors = this.handleReceiveResponseRestListErrors.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
		this.handleChangeTable = this.handleChangeTable.bind(this);

	}
	handleChange(e)
	{
		this.setState({
				[e.target.name]: e.target.value,
                fieldErrors: []
            }
		)
	}

	handleCheckBoxChange(e)
	{
		this.setState({[e.target.name]: e.target.checked ? true : false});
	}

    handleChangeTable(e){

        this.setState({
            item:{
                ...this.state.item,
                [e.target.name]: e.target.value,
                fieldErrors: []
                }
            }
        )
    }


    handleReceiveResponseRest(res)
    {
        if (res.data.has_error)
    	{
    		console.log(res);
    		let arrErrors = [];
    		if (res.data.errors !== undefined) {
				let arrKeys = Object.keys(res.data.errors);
				for (let i = 0; i < arrKeys.length; i++) {
					if (arrKeys[i] !== "response_status" && arrKeys[i] !== "fieldErrors") {
						arrErrors[arrKeys[i]] = res.data.errors[arrKeys[i]][0];

					}
				}
				this.setState({
					fieldErrors: arrErrors,
				});
			}

			AlertifyError([res.data]);

			console.log("Log aqui:", res.data.message)
    	} else {
            AlertifySuccess([{message: res.data.message}]);

			let baseUrl = this.props.frontendUrl ? this.props.frontendUrl.split('/')[0] : this.props.urlBase.split('/')[0];
			this.props.history.push("/" + baseUrl + '/list');
        }
    }
	handleReceiveResponseRestDelete(res){
		console.log("Log aqui:", res.data)
        if (res.data.error)
    	{
    		console.log(res);
    		let arrErrors = [];
    		if (res.data.errors !== undefined) {
				let arrKeys = Object.keys(res.data.errors.fields);
				for (let i = 0; i < arrKeys.length; i++) {
					arrErrors[arrKeys[i]] = res.data.errors.fields[arrKeys[i]].message;
				}

				this.setState({
					item: {
						...this.state.item,
						fieldErrors: arrErrors
					}
				});

				AlertifyError(res.data.errors.form);
			} else {
				AlertifyError([{message: res.data.message}]);

			}
			return false
    	} else {
            AlertifySuccess([{message: res.data.message}]);
			return true
        }
	}
	handleReceiveResponseRestListErrors(res)
    {
		console.log("Log aqui:", res.data)
        if (res.data.has_error)
    	{
    		console.log(res);
    		let arrErrors = [];
    		if (res.data.errors !== undefined) {
				let arrKeys = Object.keys(res.data.errors.fields);
				for (let i = 0; i < arrKeys.length; i++) {
					arrErrors[arrKeys[i]] = res.data.errors.fields[arrKeys[i]][0];
				}

				this.setState({
					fieldErrors: arrErrors,
				});

				AlertifyError([res.data.message]);
			} else {
				AlertifyError([res.data.message]);


			}

			console.log("Log aqui:", res.data.message)
		}else if( res.data.listErrors){
			this.setState({
				item: {
					...this.state.item,
					fieldErrors: res.data.errors
				}
			});
			console.log(res.data.errors)

		}else {
            AlertifySuccess([{message: res.data.message}]);
            this.props.history.push('/' + this.props.urlBase.split('/')[0] + '/list');
        }
    }
    async handleOnSubmit(e) {
		console.log("handleOnSubmit", this.state)
    	Rest.post(this.props.urlBase, this.state).then(this.handleReceiveResponseRest);
    }

    handleCancel(e) {
		let baseUrl = this.props.frontendUrl ? this.props.frontendUrl.split('/')[0] : this.props.urlBase.split('/')[0];
		this.props.history.push("/" + baseUrl + '/list');
    }
}

export default BasePageForm;
