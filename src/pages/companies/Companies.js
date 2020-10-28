import React from 'react';
import BasePageList from '../basePage/BasePageList';
import BasePageForm from '../basePage/BasePageForm';
import MessageService from '../../services/MessageService';
import {TableData, FormPage, FormRow, BasicView, Filter} from '../../components/template/Layout';
import { ButtonSubmit, ButtonCancel, InputInGroup, Select2Field } from '../../components/template/Form';
import {Redirect} from "react-router-dom";
import RestService from "../../services/RestService";
const Rest = new RestService();

const Messages = new MessageService();

class CompaniesList extends BasePageList
{
	static defaultProps = {
		urlBase: 'companies',
		editUrlOverride:'company',
		viewUrlOverride:'company',
		deleteUrlOverride:'company',

		title: 'menu.company.title',
		fields: [
			{
				label: 'page.company.fields.name',
				field: "name",
				width: "30%"
			},
			{
				label: 'page.company.fields.symbol',
				field: "symbol",
				width: "20%"
			},
			{
				label: 'page.company.fields.peso',
				field: "peso",
				width: "50%"
			}
		]
	};

	render()
	{
		let input_fields = [{label: 'page.company.fields.name', field: "name"}];
        let filter = <Filter fields={input_fields} onChange={this.handleChange} onSubmit={this.handleOnSubmitFilter}
            toggle="tooltip" placement="top" titletoggle="Filtrar usuários"/>;
		return (
			<TableData filter={filter} onClickPage={ this.handleClickPage } title='page.company.list.title'
				fields={ this.props.fields } data={ this.state.itens } pagination={ this.state.pagination }
				actions={ this.state.actions } addUrl='/companies/add' titletoggle="Adicionar usuário" onEdit={ this.handleOnEditAction }
				onDelete={ this.handleOnDeleteAction } onView={ this.handleOnViewAction }/>
		);
	}

}

/*----------------------------------------------------------------------------------------------------*/

class CompaniesAdd extends BasePageForm
{
	static defaultProps = {
		urlBase: 'company',
		frontendUrl: 'companies',
		title: Messages.getMessage('menu.company.title'),
	};

	constructor(props) {
		super(props);
	    this.handleChange = this.handleChange.bind(this);
	}

    handleChange(e)
	{
		this.setState({[e.target.name]: e.target.value});
	}

	role(role_id){
		let role = eval(role_id);
		if(role !== 1){
			return(
                <React.Fragment>

                </React.Fragment>

			);

		}

	}

	render()
	{

		return (
			<FormPage title="page.company.add.title">
				<FormRow>
					<InputInGroup type="text" name="name" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.company.fields.name' required="required" colsize="6" />

					<InputInGroup type="text" name="symbol" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.company.fields.symbol' required="required" colsize="6" />
				</FormRow>
				<FormRow>
					<InputInGroup type="number" name="peso" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.company.fields.peso' required="required" colsize="6" />
				</FormRow>

				<FormRow>
					<ButtonSubmit text="layout.form.sign" onClick={ this.handleOnSubmit } />
					<ButtonCancel text="layout.form.cancel" onClick={ this.handleCancel } />
				</FormRow>
			</FormPage>
		);
	}
}

/*--------------------------------------------------------------------------------------------------*/

class CompaniesEdit extends BasePageForm
{
	constructor(props) {
		super(props);

		this.handleResponse = this.handleResponse.bind(this);
	}
	static defaultProps = {
		urlBase: 'companies',
		editUrlOverride:'company',

		title: Messages.getMessage('menu.company.title')
	};

	componentDidMount(){
		if (this.props.location.state === undefined){
			this.setState(({error:true}));
			return;
		}
		let id = this.props.location.state.item_id;
		Rest.get( "company/" + id, this.state).then(this.handleResponse);
	}

	handleResponse(data) {
		this.setState(
			data.data
		);
	}

	async handleOnSubmit(e) {
		Rest.put(this.props.editUrlOverride + "/" + this.state.id, this.state).then(this.handleReceiveResponseRest)
	}
	role(role_id){
		let role = eval(role_id);
		if(role !== 1){
			return(
                <React.Fragment>

                </React.Fragment>
			);

		}

	}
	render()
	{

		let master_permission = false;
		if (this.props.role === "1"){
			master_permission = true;
		}

		return (
			this.state.error ?
			( <Redirect to={{ pathname: "/login", state: { from: this.props.location } }}/> ) :
			<FormPage title="page.company.edit.title">
				<FormRow>
					<InputInGroup type="text" name="name" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.company.fields.name' required="required" colsize="6" value={ this.state.name || '' } />

					<InputInGroup type="text" name="symbol" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.company.fields.symbol' required="required" colsize="6" value={ this.state.symbol || '' } />

				</FormRow>
				<FormRow>
					<InputInGroup type="number" name="peso" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.company.fields.peso' required="required" colsize="6" value={ this.state.peso || '' } />

				</FormRow>

				<FormRow>
					<ButtonSubmit text="layout.form.edit" onClick={ this.handleOnSubmit } />
					<ButtonCancel text="layout.form.cancel" onClick={ this.handleCancel } />
				</FormRow>
			</FormPage>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class CompaniesView extends BasePageForm
{

	constructor(props) {
		super(props);

		this.handleResponse = this.handleResponse.bind(this);
		this.onClickEdit = this.onClickEdit.bind(this);
	}
	onClickEdit(event) {
		console.log(event.target);
		let url = "edit";
		let id = this.state.id;
		this.props.history.push({
			pathname: url,
			state: {item_id: id}
		});
	}
	static defaultProps = {
		urlBase: 'companies/view',
		title: Messages.getMessage('menu.company.title')
	};

	componentDidMount() {
		if (this.props.location.state === undefined){
			this.setState(({error:true}));
			return;
		}
		let id = this.props.location.state.item_id;
		Rest.get( "company/" + id, this.state).then(this.handleResponse);
	}

	handleResponse(data) {
		this.setState((
			data.data
		));
	}
	render()
	{
		let fields = [
			{label:"Nome: ", value:this.state.name},
			{label:"Símbolo: ", value:this.state.symbol},
			{label:"Peso: ", value:this.state.peso},


		]
		return (
			this.state.error ?
				( <Redirect to={{ pathname: "/login", state: { from: this.props.location } }}/> ) :
				(<BasicView status={this.state.response_status} title={Messages.getMessage("page.company.view.title")} url={"#company/edit?id=" + this.state.id} fields={fields} onClickEdit={this.onClickEdit}/>)
		);
	}
}


export { CompaniesList, CompaniesAdd , CompaniesEdit,  CompaniesView};
