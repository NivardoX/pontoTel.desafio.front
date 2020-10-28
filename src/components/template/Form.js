import React, { Component } from 'react';
import MessageService from '../../services/MessageService';
import RestService from '../../services/RestService';
import { FormRow } from './Layout';
import { Icons } from '../../iconSet';
import Select from 'react-select'
import Modal from 'react-modal';
import QRCode from 'qrcode-react'
import './Form.css';

const Messages = new MessageService();
const Rest = new RestService();


/*----------------------------------------------------------------------------------------------------*/
class Select2Field extends Component {
	constructor(props) {
		super(props);

		this.state = {
			options: [],
			isLoading: false,
			selectedValue: null,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleOnInputChange = this.handleOnInputChange.bind(this);
		this.handleReceiveOptions = this.handleReceiveOptions.bind(this);
		this.handleReceiveInitSelection = this.handleReceiveInitSelection.bind(
			this
		);
	}

	static defaultProps = {
		minLengthInput: 1,
		value: null,
		required: false,
		placeholder: "layout.select-field.placeholder",
	};

	componentDidMount() {
		Rest.get(this.props.url_list, {}).then(this.handleReceiveOptions);

		if (this.props.value) {
			Rest.get(`${this.props.url_view}/${this.props.value}`, {}).then(
				this.handleReceiveInitSelection
			);
		}
	}

	handleChange(e) {
		this.setState({
			selectedValue: e,
		});
		console.log(e);
		console.log(this.state.options);
		const event = {
			target: {
				name: this.props.name,
				value: e !== null ? e.value : null,
				label: e !== null ? e.label : null,
			},
		};

		this.props.onChange(event);
	}

	handleOnInputChange(e) {
		if (
			e.length >= this.props.minLengthInput ||
			(e.length === 0 && this.state.selectedValue === null)
		) {
			this.setState({
				isLoading: true,
				selectedValue: null,
				value: null,
			});

			Rest.get(this.props.url_list, { [this.props.filterName]: e }).then(
				this.handleReceiveOptions
			);
		}
	}

	handleReceiveOptions(res) {
		this.setState({
			isLoading: false,
		});

		if (!res.data.error) {
			let self = this;
			let options = res.data.itens.map((item) => {
				let label = self.props.displayName
					.map((fld) => {
						const reducer = (acc, cur) => acc[cur];
						return fld.split(".").reduce(reducer, item);
					})
					.join(" - ");

				return { label: label, value: item.id };
			});

			this.setState({
				options: options,
			});
		}
	}

	handleReceiveInitSelection(res) {
		if (!res.data.error) {
			let label = this.props.displayName
				.map((fld) => {
					const reducer = (acc, cur) => acc[cur];
					return fld.split(".").reduce(reducer, res.data);
				})
				.join(" - ");

			this.setState({
				selectedValue: { value: res.data.id, label: label },
			});
		}
	}

	render() {
		return (
			<div
				className={
					"form-group " +
					(this.props.colsize ? "col-md-" + this.props.colsize : "")
				}
			>
				<label>
					{Messages.getMessage(this.props.label)}
					{this.props.required ? "*" : ""}
				</label>
				<Select
					options={this.state.options}
					onChange={this.handleChange}
					isLoading={this.state.isLoading}
					onInputChange={this.handleOnInputChange}
					isClearable={!this.props.required}
					value={this.state.selectedValue}
					placeholder={Messages.getMessage(this.props.placeholder)}
				/>
				<div className="invalid-message">
					{this.props.errors[this.props.name]
						? this.props.errors[this.props.name]
						: ""}
				</div>
			</div>
		);
	}
}
/*----------------------------------------------------------------------------------------------------*/

class InputInGroup extends Component
{
	render()
	{
		let classValue;

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		} else if(!this.props.class) {
			classValue = "form-control";
		} else {
			classValue = "form-control " + (this.props.class);
		}

		return (
			<div className= {"form-group " + (this.props.colsize ? "col-md-" + this.props.colsize : "")  }>
				<label>{ Messages.getMessage(this.props.label) }</label>
				<input type={ this.props.type } className={ classValue } id={ this.props.name }  name={ this.props.name }
					   required={ this.props.required } disabled={this.props.disabled} value={this.props.value} autoFocus={ this.props.autofocus } onChange={ this.props.onChange }
					   maxLength={this.props.maxLength} checked={this.props.checked} onBlur={this.props.onChange}/>
				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : ''}
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/


class RememberMeInGroup extends Component
{
	render()
	{
		return (
			<div className="form-group">
				<div className="checkbox">
					<label>
						<input type="checkbox" value="remember-me" /> { Messages.getMessage(this.props.text) }
					</label>
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class ButtonSubmit extends Component
{
	render()
	{
		return (
			<input disabled={this.props.disabled} className='btn btn-primary button-form' value={ Messages.getMessage(this.props.text) } type="submit"
				   onClick={ this.props.onClick } />
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class ButtonCancel extends Component
{
	render()
	{
		return (
			<input className='btn btn-danger button-form' value={ Messages.getMessage(this.props.text) } type="submit"
				   onClick={ this.props.onClick } />
		);
	}
}


/*----------------------------------------------------------------------------------------------------*/

class SelectStockField extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			urlParameters: undefined ,
			options: this.props.options ? this.props.options: []

		};

		this.handleReceiveOption = this.handleReceiveOption.bind(this);
		this._isMounted = false;
	}

	async handleReceiveOption(res)
	{
		console.log(res.data.itens)
		if (res.status === 200) {
			this._isMounted && this.setState({
				options: res.data.itens,
			});
		}
	}

	componentDidMount()
	{

		this._isMounted = true;
		this._isMounted && !this.props.options && Rest.get(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);


	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	concatenarValues(data) {
		let value = "";
		let keys = [
			data.centro_estagio_nome,
			data.empresa_nome,
			data.inicio,
			data.fim,
			data.contrato_empresa_nome,
			data.quantidade_vagas,
			data.curso_nome,
			data.conhecimento_especifico

		];
		for (var i=0;i < keys.length ;i++){
			if(keys[i] !== undefined) {
				value =  value.concat(keys[i]);
				if(i!== keys.length - 1 && keys[i+1]!== undefined){
					value = value.concat(' - ');

				}
			}

		}

		return String(value);
	}

	render()
	{
		let classValue;
		let key;
		if(JSON.stringify(this.state.urlParameters)!== JSON.stringify(this.props.urlParameters)){
			Rest.get(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);
			this.setState(({urlParameters: this.props.urlParameters}))
		}

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		}
		else {
			classValue = "form-control";
		}

		key=1;


		const options = this.state.options.map((data) =>
			<option key={key++} value={data[this.props.value_name?this.props.value_name:this.props.name]}>
				{(data[this.props.option_name] ? data[this.props.option_name] :(
					data.nome_fantasia || data.escola || data.nome || data.nome_fantasia || data.name || this.concatenarValues(data)))}
			</option>
		);


		return (
			<div className= { "form-group " + (this.props.colsize ? "col-md-" + this.props.colsize : "") }>
				<label>{ Messages.getMessage(this.props.label) }</label>
				<select className={ classValue } id={ this.props.name }  name={ this.props.name } disabled={this.props.disabled}
						required={ this.props.required } value={this.props.value} autoFocus={ this.props.autofocus } onChange={ this.props.onChange }>
					{ this.props.empty === true ? <option value=""/> : '' }
					{ options }
				</select>

				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : '' }
				</div>
			</div>
		);
	}
}

class SelectField extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			urlParameters: undefined ,
			options: this.props.options ? this.props.options: []

		};

		this.handleReceiveOption = this.handleReceiveOption.bind(this);
		this._isMounted = false;
	}

	async handleReceiveOption(res)
	{
		console.log(res.data.itens)
		if (res.status === 200) {
			this._isMounted && this.setState({
				options: res.data.itens,
			});
		}
	}

	componentDidMount()
	{

		this._isMounted = true;
		this._isMounted && !this.props.options && Rest.get(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);


	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	concatenarValues(data) {
		let value = "";
		let keys = [
			data.centro_estagio_nome,
			data.empresa_nome,
			data.inicio,
			data.fim,
			data.contrato_empresa_nome,
			data.quantidade_vagas,
			data.curso_nome,
			data.conhecimento_especifico

		];
		for (var i=0;i < keys.length ;i++){
			if(keys[i] !== undefined) {
				value =  value.concat(keys[i]);
				if(i!== keys.length - 1 && keys[i+1]!== undefined){
					value = value.concat(' - ');

				}
			}

		}

		return String(value);
	}

	render()
	{
		let classValue;
		let key;
		if(JSON.stringify(this.state.urlParameters)!== JSON.stringify(this.props.urlParameters)){
			Rest.get(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);
			this.setState(({urlParameters: this.props.urlParameters}))
		}

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		}
		else {
			classValue = "form-control";
		}

		key=1;


		const options = this.state.options.map((data) =>
			<option key={key++} value={data[this.props.value_name?this.props.value_name:this.props.name]}>
				{(data[this.props.option_name] ? data[this.props.option_name] :(
					data.nome_fantasia || data.escola || data.nome || data.nome_fantasia || data.name || this.concatenarValues(data)))}
			</option>
		);


		return (
			<div className= { "form-group " + (this.props.colsize ? "col-md-" + this.props.colsize : "") }>
				<label>{ Messages.getMessage(this.props.label) }</label>
				<select className={ classValue } id={ this.props.name }  name={ this.props.name } disabled={this.props.disabled} onBlur={this.props.onChange}
						required={ this.props.required } value={this.props.value} autoFocus={ this.props.autofocus } onChange={ this.props.onChange }>
					{ this.props.empty === true ? <option value=""/> : '' }
					{ options }
				</select>

				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : '' }
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/
class DataList extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			urlParameters: undefined ,
			options: this.props.options ? this.props.options: []
		};

		this.handleReceiveOption = this.handleReceiveOption.bind(this);
		this._isMounted = false;
	}

	async handleReceiveOption(res)
	{
		if (res.status === 200) {
			this._isMounted && this.setState({
				options: res.data.itens
			});
		}
	}

	componentDidMount()
	{
		this._isMounted = true;
		this._isMounted && Rest.get(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);
	}

	componentWillUnmount() {
		this._isMounted = false;

	}

	render()
	{
		let classValue;
		let key;


		if(JSON.stringify(this.state.urlParameters)!== JSON.stringify(this.props.urlParameters)){
			Rest.get(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);
			this.setState(({urlParameters: this.props.urlParameters}))
		}

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid custom-select";
		}
		else {
			classValue = "custom-select";
		}

		key=1;

		const options = this.state.options.map((data) =>
			<option key={key++} value={data[this.props.value_name?this.props.value_name:this.props.name]}>{data.nome}</option>
		);


		return (
			<div className= { "form-group col " + (this.props.colsize ? "col-md-" + this.props.colsize : "") }>
				<label>{ Messages.getMessage(this.props.label) }</label>
				<input list={this.props.name} className={classValue} placeholder={this.props.placeholder}/>
				<datalist id={ this.props.name }  name={ this.props.name } disabled={this.props.disabled}
						  required={ this.props.required } value={this.props.value} autoFocus={ this.props.autofocus } onChange={ this.props.onChange }>
					{ this.props.empty === true ? <option value=""/> : '' }
					{ options }
				</datalist>

				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : '' }
				</div>
			</div>
		);
	}




}


/*----------------------------------------------------------------------------------------------------*/

class LoginArea extends Component{
	render(){
		return(
			<div className="card mb-2">
				<div className="card-header dynamic">
					<b>{this.props.title}</b>
				</div>
				<div className="card-body">
					<FormRow>
						<div className="col-6">
							<label>{Messages.getMessage(this.props.label1) }</label>
							<input type="text" class="form-control" name="username" label='page.user.fields.username' required="required" />
						</div>
						<div className="col-6">
							<label>{Messages.getMessage(this.props.label2) }</label>
							<input type="password" class="form-control" name="password" label='page.user.fields.password' required="required" />
						</div>

					</FormRow>

					<FormRow>
						<div className="col mt-2">
							<label>{Messages.getMessage(this.props.label3) }</label>
							<input type="email" class="form-control" name="email" label='page.user.fields.email' required="required" />
						</div>
					</FormRow>
				</div>
			</div>
		);
	}

}

/*----------------------------------------------------------------------------------------------------*/

class TextField extends Component
{
	render()
	{
		let classValue;

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		} else if(!this.props.class) {
			classValue = "form-control";
		} else {
			classValue = "form-control " + (this.props.class);
		}

		return (
			<div className= {"form-group  " + (this.props.colsize ? "col-md-" + this.props.colsize : "")  }>
				<label>{ Messages.getMessage(this.props.label) }</label>


				<textarea id={this.props.name} name={this.props.name} className={classValue} style={{resize: "none"}} rows={this.props.rowsize} cols={10 * this.props.colsize}
						  required={this.props.required} maxLength={this.props.maxLength} disabled={this.props.disabled} value={this.props.value}
						  onChange={this.props.onChange}  placeholder={this.props.placeholder}/>

				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : ''}
				</div>
			</div>
		);
	}
}
/*----------------------------------------------------------------------------------------------------*/

/** Deve ser enviado o value ao componente para evitar erro de mudanca de controle */
class InputTime extends Component
{
	constructor(props) {
		super(props);
		this.handleMaskChange = this.handleMaskChange.bind(this);
	}

	handleMaskChange(e){

		var valor = '';


		for(var i = 0; i < e.target.value.length;i++){
			if(!((e.target.value[i] === ':'))){
				valor += e.target.value[i];
			}
		}

		if(valor.length < 5 && valor[valor.length-1] >= 0 &&  valor[valor.length-1] <= 9){
			var novoValor = "";
			for(i = 0; i < valor.length; i++){
				if(i === 2 ){
					novoValor += ':';
				}
				novoValor += valor[i];
			}
			e.target.value = novoValor;
			this.props.onChange(e)
		}else if(valor === ''){
			this.props.onChange(e)

		}

	}
	render()
	{
		let classValue;

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		} else if(!this.props.class) {
			classValue = "form-control";
		} else {
			classValue = "form-control " + (this.props.class);
		}

		return (
			<div className= {"form-group " + (this.props.colsize ? "col-md-" + this.props.colsize : "")  }>
				<label>{ Messages.getMessage(this.props.label) }</label>
				<input type={ this.props.type } className={ classValue } id={ this.props.name }  name={ this.props.name }
					   required={ this.props.required } disabled={this.props.disabled} value={this.props.value || ""} autoFocus={ this.props.autofocus }
					   onChange={ this.handleMaskChange } maxLength={this.props.maxLength} checked={this.props.checked}
					   placeholder={this.props.placeholder}/>
				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : ''}
				</div>
			</div>
		);
	}
}
/*----------------------------------------------------------------------------------------------------*/

/** Deve ser enviado o value ao componente para evitar erro de mudanca de controle */
class InputDate extends Component
{
	constructor(props) {
		super(props);
		this.handleMaskChange = this.handleMaskChange.bind(this);
	}

	handleMaskChange(e){

		var valor = e.target.value;
		// 25/01/2020
		var dateTest = "01/01/1999";
		if(valor.length < 11){
			var novoValor = valor.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2') .replace(/(\d{2})(\d)/, '$1/$2')
				.replace(/(\d{4})(\d{1,2})/, '$1-$2')

			var dateMatch = novoValor + dateTest.substring(novoValor.length);
			if (/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
				.test(dateMatch)){
				e.target.value = novoValor;
				this.props.onChange(e)
			}
		}else if(e.target.value === ''){
			this.props.onChange(e)

		}

	}
	render()
	{
		let classValue;

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		} else if(!this.props.class) {
			classValue = "form-control";
		} else {
			classValue = "form-control " + (this.props.class);
		}

		return (
			<div className= {"form-group " + (this.props.colsize ? "col-md-" + this.props.colsize : "")  }>
				<label>{ Messages.getMessage(this.props.label) }</label>
				<input type={ this.props.type } className={ classValue } id={ this.props.name }  name={ this.props.name }
					   required={ this.props.required } disabled={this.props.disabled} value={this.props.value || ""} autoFocus={ this.props.autofocus }
					   onChange={ this.handleMaskChange } maxLength={this.props.maxLength} checked={this.props.checked}
					   placeholder={this.props.placeholder}/>
				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : ''}
				</div>
			</div>
		);
	}
}
/*----------------------------------------------------------------------------------------------------*/

/** Deve ser enviado o value ao componente para evitar erro de mudanca de controle */
class InputCpf extends Component
{
	constructor(props) {
		super(props);
		this.handleMaskChange = this.handleMaskChange.bind(this);
	}

	handleMaskChange(e){

		var valor = e.target.value;
		//001.716.503-02
		if(valor.length < 15){
			valor = valor.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2') .replace(/(\d{3})(\d)/, '$1.$2')
				.replace(/(\d{3})(\d{1,2})/, '$1-$2').replace(/(-\d{2})\d+?$/, '$1')

			e.target.value = valor;
			this.props.onChange(e);

		}else if(valor === ''){
			this.props.onChange(e)

		}

	}
	render()
	{
		let classValue;

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		} else if(!this.props.class) {
			classValue = "form-control";
		} else {
			classValue = "form-control " + (this.props.class);
		}

		return (
			<div className= {"form-group " + (this.props.colsize ? "col-md-" + this.props.colsize : "")  }>
				<label>{ Messages.getMessage(this.props.label) }</label>
				<input type={ this.props.type } className={ classValue } id={ this.props.name }  name={ this.props.name }
					   required={ this.props.required } disabled={this.props.disabled} value={this.props.value || ""} autoFocus={ this.props.autofocus }
					   onChange={ this.handleMaskChange } maxLength={this.props.maxLength} checked={this.props.checked}
					   placeholder={this.props.placeholder}/>
				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : ''}
				</div>
			</div>
		);
	}
}
/*----------------------------------------------------------------------------------------------------*/

/** Deve ser enviado o value ao componente para evitar erro de mudanca de controle */
class InputCnpj extends Component
{
	constructor(props) {
		super(props);
		this.handleMaskChange = this.handleMaskChange.bind(this);
	}

	handleMaskChange(e){

		var valor = e.target.value;
		//91.525.761/0001-12
		if(valor.length < 19){
			valor = valor.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2')
				.replace(/(\d{3})(\d{1,2})/, '$1/$2').replace(/(\d{4})(\d)/, '$1-$2')

			e.target.value = valor;
			this.props.onChange(e);
		}else if(valor === ''){
			this.props.onChange(e)
		}

	}
	render()
	{
		let classValue;

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		} else if(!this.props.class) {
			classValue = "form-control";
		} else {
			classValue = "form-control " + (this.props.class);
		}

		return (
			<div className= {"form-group " + (this.props.colsize ? "col-md-" + this.props.colsize : "")  }>
				<label>{ Messages.getMessage(this.props.label) }</label>
				<input type={ this.props.type } className={ classValue } id={ this.props.name }  name={ this.props.name }
					   required={ this.props.required } disabled={this.props.disabled} value={this.props.value || ""} autoFocus={ this.props.autofocus }
					   onChange={ this.handleMaskChange } maxLength={this.props.maxLength} checked={this.props.checked}
					   placeholder={this.props.placeholder}/>
				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : ''}
				</div>
			</div>
		);
	}
}



/*----------------------------------------------------------------------------------------------------*/

class TextView extends Component
{
	render()
	{
		let classValue;

		if(!this.props.class) {
			classValue = "form-control";
		} else {
			classValue = "form-control " + (this.props.class);
		}

		return (
			<div className= {"form-group  " + (this.props.colsize ? "col-md-" + this.props.colsize : "")  }>
				<label>{ (this.props.label) }</label>

				<textarea id={this.props.name}  className={classValue} style={{resize: "none"}} rows={this.props.rowsize} cols={10 * this.props.colsize}
						  maxLength={this.props.maxLength} disabled={true} value={this.props.value}
						  placeholder={this.props.placeholder}/>
			</div>
		);
	}
}



/*----------------------------------------------------------------------------------------------------*/
const modalStyle = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)'
	}
};
class QrField extends Component
{

	constructor(props){
		super(props);
		this.state = {
			modal: false,
		}
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
	}
	closeModal(){
		this.setState({modal:false});
	}
	openModal(){
		this.setState({modal:true});
	}


	render()
	{
		let classValue;

		if(!this.props.class) {
			classValue = "form-control";
		} else {
			classValue = "form-control " + (this.props.class);
		}

		return (
			<React.Fragment>
				<div className= {"form-group  " + (this.props.colsize ? "col-md-" + this.props.colsize : "")  }>
					<label>{ (this.props.label) }</label>
					<div className="input-group mb-12">

						<textarea id={this.props.name}  className={classValue} style={{resize: "none"}} rows={this.props.rowsize} cols={10 * this.props.colsize}
								  maxLength={this.props.maxLength} disabled={true} value={this.props.value}
								  placeholder={this.props.placeholder}/>
						<div className="input-group-append">
							<ButtonSubmit disabled={this.state.modal} text="fields.qr_code" onClick={this.openModal}/>
						</div>
					</div>

				</div>
				<Modal ariaHideApp={false} isOpen={this.state.modal}  onRequestClose={this.closeModal} style={modalStyle} contentLabel={"Modal " + this.props.name}>
					<QRCode size="200" value={this.props.value} />,
				</Modal>

			</React.Fragment>
		);
	}
}



/*----------------------------------------------------------------------------------------------------*/

class InputMoney extends Component
{
	constructor(props) {
		super(props);
		this.handleMaskChange = this.handleMaskChange.bind(this);
	}

	handleMaskChange(e){

		var valor = '';
		for(var i = 0; i < e.target.value.length;i++){
			if(!((e.target.value[i] === ',') || (e.target.value[i] === '.'))){
				valor += e.target.value[i];
			}
		}

		if(valor[valor.length-1] >= 0 &&  valor[valor.length-1] <= 9){

			var novoValor = valor.split("").reverse().join("");


			if (novoValor.length > 1){
				var agora = novoValor.split('')

				if(novoValor.length == 2){
					novoValor = novoValor.slice(0, 2) + ',' + novoValor.slice(2) + "0" ;
				}else if(novoValor.length == 4 && agora[3] == 0){

					novoValor = novoValor.split("").splice(0,3).join("");

					novoValor = novoValor.slice(0, 2) + ',' + novoValor.slice(2);

				}else{
					novoValor = novoValor.slice(0, 2) + ',' + novoValor.slice(2);
				}

				//0 1 , 2 3 4 5 6 7
				var i = 4;
				var j = 1;

				while( i  < novoValor.length){
					if( j % 3 === 0 ){
						novoValor = novoValor.slice(0, i) + '.' + novoValor.slice(i);
						i+=2;
						j = 1;
					}else{
						j++;
						i++;

					}

				}
			}

			novoValor = novoValor.split("").reverse().join("");

			e.target.value = novoValor;
			this.props.onChange(e)
		}else if(valor === ''){
			this.props.onChange(e)

		}

	}
	render()
	{
		let classValue;

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		} else if(!this.props.class) {
			classValue = "form-control";
		} else {
			classValue = "form-control " + (this.props.class);
		}

		return (
			<div className= {"form-group " + (this.props.colsize ? "col-md-" + this.props.colsize : "")  }>
				<label>{ Messages.getMessage(this.props.label) }</label>
				<input type={ this.props.type } className={ classValue } id={ this.props.name }  name={ this.props.name }
					   required={ this.props.required } disabled={this.props.disabled} value={this.props.value} autoFocus={ this.props.autofocus } onChange={ this.handleMaskChange }
					   maxLength={this.props.maxLength} checked={this.props.checked} onBlur={this.props.onBlur === true? this.props.onChange : undefined}/>
				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : ''}
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

const errorMessage = {
	color: 'red',
	textAlign: "center"
}
class TableView extends Component{


	render(){

		return(
			<div className="tableview-card">

				{/** dentro do componente deve ser enviado o header com os inputs que vao ser colocados
				 * e o botao para adicionar a lista */}
				{this.props.children}

				{/** A tabela deve ser carregada usando a lista enviada e um vetor informando o nome dos headers,
				 *  e outro vetor informando o nome dos campos */}

				<table className="tableview-table" >

					<thead>
					<tr>
						{/** Header */}

						{this.props.header.map((item, index) => {
							return(
								<th key={"header " + item + "-" + index}>{item}</th>
							);
						})}
						<th key={"header deleteTag-" + this.props.name}>DELETAR</th>
					</tr>
					</thead>

					<tbody>

					{/** TDsssssss */}
					{this.props.items.map((item, index) =>{
						return(
							<React.Fragment>
								<tr key={"item tr-" + index + " " + this.props.name}>
									{this.props.fields.map((field, index) => {
										return(
											<td key={"col td-"+ field + "-" + index}>{item[field]}</td>
										);
									})}
									<td key={"delete btn-" + index + " " + this.props.name}>
										<button className='btn btn-primary button-form' onClick={this.props.onDelete.bind(this, index)}><i className={ Icons.trash }></i></button>

									</td>
								</tr>

								{/** O backend deve enviar o index do erro na lista e a mensagem de erro */}
								{/** ERROR Message*/}
								{this.props.errors[item.id] ?
									<tr>
										{this.props.fields.map((field) => {
											return(
												<td key={"errorMessage-" + item.id + "-" + this.props.name} style={errorMessage}>
													{this.props.errors[item.id]['fields'][field] !== undefined ? this.props.errors[item.id]['fields'][field].message : ""}
													{/*this.props.errors[item.id].fields[field] || "asd"*/}
												</td>
											)
										})}
										<td></td>
									</tr>
									/*<th style={errorMessage} colSpan={this.props.header.length+1}>
                                        <p > <small>{"Erro no cadastro"}</small></p>
                                    </th>*/
									:
									''}

							</React.Fragment>


						);
					})}





					</tbody>

				</table>
			</div>

		);
	}
}
/*----------------------------------------------------------------------------------------------------*/

class FormColapse extends Component
{
	render()
	{
		return (
			<div className="accordion mb-3" id="accordionExample">
				<div className="card">
					<div className="card-header" id="headingOne">
						<h2 className="mb-0 d-flex flex-row bd-highlight">
							<button className="btn btn-link " type="button" data-toggle="collapse" data-target={"#" + this.props.name} aria-expanded="true" aria-controls="collapseOne">
								<i className={ Icons.table }/> { Messages.getMessage(this.props.title) }
							</button>
						</h2>
					</div>

					<div id={this.props.name} className="collapse " aria-labelledby="headingOne" data-parent={"#" + this.props.name}>
						<div className="card-body">
							{ this.props.children }
						</div>
					</div>
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*//*----------------------------------------------------------------------------------------------------*/

class TableList extends Component{

	render(){
		if(this.props.data === undefined || this.props.data[0] === undefined ){
			return(

				<div className="w3-panel w3-pale-blue w3-leftbar w3-border-blue" >
					<p className="text-w3">{this.props.empty || "Não há registros."}</p>
				</div>

			);
		}
		return(
			<div className="table-responsive">
				<div className="tablelist-table">


					<table className="table table-bordered">
						<thead>
						<tr>
							{this.props.cols.map((item_th, index) => {
								return(
									<th key={item_th.col_title + " col-" + index}>
										{item_th.col_title}
									</th>

								)
							})}
						</tr>
						</thead>

						<tbody>
						{this.props.data.map((item_tr, index) => {
							return(
								<tr key={"item-" + index} className="tablelist">
									{this.props.cols.map((item_td) =>{
										return(
											<td key={"item-" + index + " col"+ item_td.col_title}>
												{item_tr[item_td.col_value]}
											</td>
										)
									})}

								</tr>
							)
						})}
						</tbody>

					</table>
				</div>
			</div>
		);
	}
}
const checkBoxStyle = {
	textAlign: "center",
	verticalAlign: "middle",
	height: "25px",
	width: "25px",
};
class MasterDetails extends Component {
	render() {
		return (
			<div className="card mb-2" style={{ width: "100%" }}>
				<h6 className="card-header">
					<b>{Messages.getMessage(this.props.title)}</b>
				</h6>
				<div className="card-body">
					{this.props.children}
					<div className="tableview-div">
						<table className="tableview-table">
							<thead>
							<tr>
								{/** Header */}
								{this.props.checkbox ? (
									<th key={"header checkboxTag-" + this.props.name}>
										{this.props.checkbox_title}
									</th>
								) : (
									""
								)}
								{this.props.header.map((item, index) => {
									return <th key={"header " + item + "-" + index}>{item}</th>;
								})}
								<th key={"header deleteTag-" + this.props.name}>DELETAR</th>
							</tr>
							</thead>

							<tbody>
							{this.props.items.map((item, index) => {
								return (
									<React.Fragment>
										<tr key={"item tr-" + index + " " + this.props.name}>
											{this.props.checkbox ? (
												<td
													key={
														"checkbox btn-" + index + " " + this.props.name
													}
												>
													<input
														type="checkbox"
														style={checkBoxStyle}
														id="id"
														name={this.props.checkbox_name}
														onChange={this.props.checkbox.bind(this, index)}
														checked={item[this.props.checkbox_name]}
													/>
												</td>
											) : (
												""
											)}
											{this.props.fields.map((field, index) => {
												return (
													<td key={"col td-" + field + "-" + index}>
														{item[field]}
													</td>
												);
											})}
											<td key={"delete btn-" + index + " " + this.props.name}>
												<button
													className="btn btn-primary button-form"
													onClick={this.props.onDelete.bind(this, index)}
												>
													<i className={Icons.trash} />
												</button>
											</td>
										</tr>

										{this.props.errors[item.id] ? (
											<tr>
												{this.props.fields.map((field) => {
													return (
														<td
															key={
																"errorMessage-" +
																item.id +
																"-" +
																this.props.name
															}
															style={errorMessage}
														>
															{this.props.errors[item.id]["fields"][field] !==
															undefined
																? this.props.errors[item.id]["fields"][field]
																	.message
																: ""}
														</td>
													);
												})}
												<td />
											</tr>
										) : (
											""
										)}
									</React.Fragment>
								);
							})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}
/*----------------------------------------------------------------------------------------------------*/
export  { InputInGroup, RememberMeInGroup, ButtonSubmit, ButtonCancel, SelectField, DataList, LoginArea, TextField, Select2Field
	,TextView, FormColapse, TableView, TableList, InputDate, InputCpf, InputCnpj, InputMoney, InputTime, QrField, MasterDetails,SelectStockField};
