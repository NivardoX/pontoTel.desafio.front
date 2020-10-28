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

class UsersList extends BasePageList
{
	static defaultProps = {
		urlBase: 'users',
		deleteUrlOverride:'user',
		title: 'menu.user.title',
		fields: [
			{
				label: 'page.user.fields.username',
				field: "username",
				width: "50%"
			},
			{
				label: 'page.user.fields.name',
				field: "name",
				width: "50%"
			}
		]
	};

	render()
	{
		let input_fields = [{label: 'page.user.fields.username', field: "username"}];
        let filter = <Filter fields={input_fields} onChange={this.handleChange} onSubmit={this.handleOnSubmitFilter}
            toggle="tooltip" placement="top" titletoggle="Filtrar usuários"/>;
		return (
			<TableData filter={filter} onClickPage={ this.handleClickPage } title='page.user.list.title'
				fields={ this.props.fields } data={ this.state.itens } pagination={ this.state.pagination }
				actions={ this.state.actions } addUrl='/users/add' titletoggle="Adicionar usuário" onEdit={ this.handleOnEditAction }
				onDelete={ this.handleOnDeleteAction } onView={ this.handleOnViewAction }/>
		);
	}

}

/*----------------------------------------------------------------------------------------------------*/

class UsersAdd extends BasePageForm
{
	static defaultProps = {
		urlBase: 'user',
		frontendUrl:'users',
		title: Messages.getMessage('menu.user.title'),
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
			<FormPage title="page.user.add.title">
				<FormRow>
					<InputInGroup type="text" name="name" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.name' required="required" colsize="6" />

					<InputInGroup type="email" name="email" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.email' required="required" colsize="6" />
				</FormRow>
				<FormRow>
					<InputInGroup type="text" name="username" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.username' required="required" colsize="6" />

					<InputInGroup type="password" name="password" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.password' required="required" colsize="6" />
				</FormRow>

				<FormRow>
					<Select2Field
						name="role_id"
						colsize="4"
						onChange={ this.handleChange }
						url_view="role"
						url_list="roles"
						filterName="nome"
						displayName={['nome']}
						label="page.user.fields.role"
						required={true}
						errors={ this.state.fieldErrors }/>
					{this.role(this.state.role_id)}
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

class UsersEdit extends BasePageForm
{
	constructor(props) {
		super(props);

		this.handleResponse = this.handleResponse.bind(this);
	}
	static defaultProps = {
		editUrlOverride:'user',

		urlBase: 'users',
		title: Messages.getMessage('menu.user.title')
	};

	componentDidMount(){
		if (this.props.location.state === undefined){
			this.setState(({error:true}));
			return;
		}
		let id = this.props.location.state.item_id;
		Rest.get( "user/" + id, this.state).then(this.handleResponse);
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
			<FormPage title="page.user.edit.title">
				<FormRow>
					<InputInGroup type="text" name="name" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.name' required="required" colsize="6" value={ this.state.name || '' } />

					<InputInGroup type="email" name="email" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.email' required="required" colsize="6" value={ this.state.email || '' } />
				</FormRow>
				<FormRow>
					<InputInGroup type="text" name="username" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.username' required="required" colsize="6" value={ this.state.username || '' } />

				</FormRow>

				{master_permission ?
				<FormRow>

					<Select2Field
						name="role_id"
						colsize="6"
						value={ this.state.role_id }
						onChange={ this.handleChange }
						url_view="role"
						url_list="roles"
						filterName="nome"
						displayName={['nome']}
						label="page.user.fields.role"
						required={true}
						errors={ this.state.fieldErrors }
					/>
					{/* <SelectField disabled={!master_permission} empty={ true } value_name="id" name="role_id" errors={ this.state.fieldErrors }  value={this.state.role_id} onChange={ this.handleChange }
						label='page.user.fields.role' required="required" colsize="6" url="roles/all" /> */}
				</FormRow>
				:''}

				<FormRow>
					<ButtonSubmit text="layout.form.edit" onClick={ this.handleOnSubmit } />
					<ButtonCancel text="layout.form.cancel" onClick={ this.handleCancel } />
				</FormRow>
			</FormPage>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class UsersView extends BasePageForm
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
		urlBase: 'users/view',
		title: Messages.getMessage('menu.user.title')
	};

	componentDidMount() {
		if (this.props.location.state === undefined){
			this.setState(({error:true}));
			return;
		}
		let id = this.props.location.state.item_id;
		Rest.get( "user/" + id, this.state).then(this.handleResponse);
	}

	handleResponse(data) {
		this.setState((
			data.data
		));
	}
	render()
	{
		let fields = [
			{label:"Username: ", value:this.state.username},
			{label:"Nome: ", value:this.state.name},
			{label:"Email: ", value:this.state.email},
			{label:"Tipo de Usuário", value: (this.state.role ? this.state.role.name : '')}
		]
		return (
			this.state.error ?
				( <Redirect to={{ pathname: "/login", state: { from: this.props.location } }}/> ) :
				(<BasicView status={this.state.response_status} title={Messages.getMessage("page.user.view.title")} url={"#user/edit?id=" + this.state.id} fields={fields} onClickEdit={this.onClickEdit}/>)
		);
	}
}


export { UsersList, UsersAdd , UsersEdit,  UsersView};
