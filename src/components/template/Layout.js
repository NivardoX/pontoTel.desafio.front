import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import MessageService from '../../services/MessageService';
import { Properties } from '../../config';
import { Icons } from '../../iconSet';
import { formatString } from '../utils/Utils';
import { Tooltip } from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import {ButtonColors} from "../../colorButtons";

import './Layout.css';
import {Hints} from "../../hintSet";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { TextView } from './Form';


const Auth = new AuthService();
const Messages = new MessageService();

const LightTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9',
	},
}))(Tooltip);

/*----------------------------------------------------------------------------------------------------*/

class CenterCard extends Component {
	render() {
		return (
			<div className="card card-login mx-auto mt-5">
				<div className="card-header">{Messages.getMessage(this.props.title)}</div>
				<div className="card-body">
					{this.props.children}
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class CenterCard2 extends Component {
	render() {
		return (
			<div className="card text-left" >
				<div className="card-header">{Messages.getMessage(this.props.title)}</div>
				<div className="card-body">
					{this.props.children}
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class AlertDangerForm extends Component {
	render() {
		if (this.props.text.length === 0) {
			return <div></div>;
		}

		let i = 0;

		const listErrors = this.props.text.map((err) => {
			return (<li key={i++}>{err.message}</li>);
		});

		return (
			<div className="alert alert-danger alert-dismissible fade show" role="alert">
				<ul>{listErrors}</ul>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------*/

class SideBar extends Component {
	render() {
		return (
			<ul className="sidebar navbar-nav">
				{this.props.children}
			</ul>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBarItem extends SideBar {
	render() {
		return (
			<li className="nav-item">
				<Link className="nav-link" to={this.props.url}>
					<i className={this.props.icon} />
					<span> {Messages.getMessage(this.props.name)}</span>
				</Link>
			</li>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBarDropDown extends Component {
	render() {
		return (
			<li className="nav-item dropdown">
				<Link className="nav-link dropdown-toggle" to="#" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i className={this.props.icon} />
					<span> {Messages.getMessage(this.props.name)}</span>
				</Link>
				<div className="dropdown-menu" aria-labelledby="pagesDropdown">
					{this.props.children}
				</div>
			</li>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBarDropDownItem extends SideBar {
	render() {
		return (
			<Link className="dropdown-item" to={this.props.url}> {Messages.getMessage(this.props.name)}</Link>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBarDropDownGroup extends Component {
	render() {
		return (
			<h6 className="dropdown-header">{Messages.getMessage(this.props.name)}</h6>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBarDropDownDivider extends Component {
	render() {
		return (
			<div className="dropdown-divider" />
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class NavBar extends Component {
	handleLogoutClick() {
		Auth.logout();
	}

	handleToggleSidebarClick(e) {
		e.preventDefault();
		let className = document.getElementsByClassName('sidebar')[0].className;
		let classBodyName = document.getElementsByTagName('body')[0].className;

		if (className.indexOf('toggled') === -1) {
			className = className + " toggled";
			classBodyName = classBodyName + " sidebar-toggled";
		}
		else {
			className = className.replace(" toggled", "");
			classBodyName.replace(" sidebar-toggled", "");
		}

		document.getElementsByClassName('sidebar')[0].className = className;
		document.getElementsByTagName('body')[0].className = classBodyName;
	}

	render() {
		return (
			<nav className="navbar navbar-expand navbar-white bg-white static-top shadow">

				<Link className="navbar-brand mr-1" to="/">{Properties.appName}</Link>

				<button className="btn btn-link btn-sm order-1 order-sm-0" id="sidebarToggle" onClick={this.handleToggleSidebarClick}>
					<i className="fas fa-bars" />
				</button>

				<ul className="navbar-nav ml-auto mr-0 mr-md-3 my-2 my-md-0">
					{/* <li className="nav-item dropdown no-arrow mx-1">
						<Link className="nav-link dropdown-toggle" to="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i className="fas fa-bell fa-fw" />
							<span className="badge badge-danger">9+</span>
						</Link>
						<div className="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
							<Link className="dropdown-item" to="#">{Messages.getMessage('layout.navbar.messages.action')}</Link>
							<Link className="dropdown-item" to="#">{Messages.getMessage('layout.navbar.messages.other')}</Link>
							<div className="dropdown-divider" />
							<Link className="dropdown-item" to="#">{Messages.getMessage('layout.navbar.messages.something')}</Link>
						</div>
					</li>
					<li className="nav-item dropdown no-arrow mx-1">
						<Link className="nav-link dropdown-toggle" to="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i className="fas fa-envelope fa-fw" />
							<span className="badge badge-danger">7</span>
						</Link>
						<div className="dropdown-menu dropdown-menu-right" aria-labelledby="messagesDropdown">
							<Link className="dropdown-item" to="#">{Messages.getMessage('layout.navbar.messages.action')}</Link>
							<Link className="dropdown-item" to="#">{Messages.getMessage('layout.navbar.messages.other')}</Link>
							<div className="dropdown-divider" />
							<Link className="dropdown-item" to="#">{Messages.getMessage('layout.navbar.messages.something')}</Link>
						</div>
					</li> */}

					<li className="nav-item dropdown no-arrow">
						<Link  onClick={this.handleLogoutClick} className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i className="fas fa-sign-out-alt" />
						</Link>
					</li>
					{/* <li className="nav-item dropdown no-arrow">
						<Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i className="fas fa-user-circle fa-fw" />
						</Link>
						<div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
							profile nao foi implementado ainda <Link className="dropdown-item" to="/empresa/profile">{Messages.getMessage('layout.navbar.user.profile')}</Link>
							<Link className="dropdown-item" to="/empresa/config">{Messages.getMessage('layout.navbar.user.settings')}</Link>
							<Link className="dropdown-item" to="#">{Messages.getMessage('layout.navbar.user.log')}</Link>
							<div className="dropdown-divider" />
							<Link className="dropdown-item" to="#" onClick={this.handleLogoutClick} data-toggle="modal" data-target="#logoutModal">{Messages.getMessage('layout.navbar.user.logout')}</Link>
						</div>
					</li> */}
				</ul>
			</nav>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class Footer extends Component {
	render() {
		return (
			<footer className="sticky-footer">
				<div className="container my-auto">
					<div className="copyright text-center my-auto">
						<span>{Messages.getMessage('layout.copyright')} © {Properties.company} {Properties.year}</span><br />
						<span>{Messages.getMessage('layout.version')}. {Properties.version}</span>
					</div>
				</div>
			</footer>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class ScrollToTop extends Component {
	render() {
		return (
			<a className="scroll-to-top rounded" href="#page-top">
				<i className={Icons.toparrow} />
			</a>
		)
	}
}

/*----------------------------------------------------------------------------------------------------*/

class PaginationPage extends Component {
	constructor(props) {
		super(props);
		this.handleClickPage = this.handleClickPage.bind(this);
	}

	handleClickPage(e) {
		e.preventDefault();
		this.props.onClick(this.props.page);
	}

	render() {
		return (<Link className="page-link" to="#" onClick={this.handleClickPage}>{this.props.text}</Link>)
	}
}

/*----------------------------------------------------------------------------------------------------*/

class Pagination extends Component {
	static defaultProps = {
		numberPagesShow: 5,
		pagination: {
			current: 0,
			pages_count: 0,
			prev: null,
			next: null
		}
	};

	handleUpdatePages() {
		let pages = [];
		let pagesPrior = [];

		let startPage = this.props.pagination.current - this.props.numberPagesShow;
		let endPage = this.props.pagination.current + this.props.numberPagesShow;

		if (startPage < 1) {
			endPage = endPage + Math.abs(startPage) + 1;
			startPage = 1;
		}

		if (endPage >= this.props.pagination.pages_count) {
			startPage = startPage - Math.abs(endPage - this.props.pagination.pages_count);
			endPage = this.props.pagination.pages_count;
		}

		if (startPage < 1) {
			startPage = 1;
		}

		for (let i = startPage; i <= endPage; pages.push(i++));

		let maxDist = -1;

		for (let i = 0; i <= pages.length; i++) {
			let dist = Math.abs(i - pages.indexOf(this.props.pagination.current));
			pagesPrior.push(dist);

			if (maxDist < dist) {
				maxDist = dist;
			}
		}

		let prior = pages.length;

		while (prior > 0) {
			for (let i = 0; i < pagesPrior.length; i++) {
				if (pagesPrior[i] === maxDist) {
					pagesPrior[i] = prior--;
				}
			}

			maxDist = maxDist - 1;
		}

		return {
			pages: pages,
			prior: pagesPrior
		};
	}

	render() {
		const pages = this.handleUpdatePages();

		let key = 1;
		let i = 0;

		const Paginator = pages['pages'].map((page) =>
			<li key={key++} className={"page-item page-item-" + pages['prior'][i++] + " " + (page === this.props.pagination.current ? 'active' : '')}>
				<PaginationPage page={page} text={page} onClick={this.props.onClickPage} />
			</li>
		);

		const PreviousIcon = (
			<span aria-hidden="true">&laquo;</span>
		);

		const Previous = (
			<li className={"page-item-prev page-item" + (this.props.pagination.prev ? '' : ' disabled')}>
				<PaginationPage page={this.props.pagination.prev} text={PreviousIcon} onClick={this.props.onClickPage} />
			</li>
		);

		const NextIcon = (
			<span aria-hidden="true">&raquo;</span>
		);

		const Next = (
			<li className={"page-item-prev page-item" + (this.props.pagination.next ? '' : ' disabled')}>
				<PaginationPage page={this.props.pagination.next} text={NextIcon} onClick={this.props.onClickPage} />
			</li>
		);

		const FirstIcon = (
			<span aria-hidden="true">&laquo;&laquo;</span>
		);

		const First = (
			<li className={"page-item-prev page-item" + (this.props.pagination.pages_count > 0 && this.props.pagination.current > 1 ? '' : ' disabled')}>
				<PaginationPage page={1} text={FirstIcon} onClick={this.props.onClickPage} />
			</li>
		);

		const LastIcon = (
			<span aria-hidden="true">&raquo;&raquo;</span>
		);

		const Last = (
			<li className={"page-item-prev page-item" + (this.props.pagination.pages_count > 0 && this.props.pagination.current < this.props.pagination.pages_count ? '' : ' disabled')}>
				<PaginationPage page={this.props.pagination.pages_count} text={LastIcon} onClick={this.props.onClickPage} />
			</li>
		);

		return (
			<nav aria-label="Navegação">
				<ul className="pagination pagination-sm justify-content-end">
					{First}
					{Previous}
					{Paginator}
					{Next}
					{Last}
				</ul>
			</nav>
		);
	}
}


/*----------------------------------------------------------------------------------------------------*/

class TableData extends Component
{
	constructor(props){
		super(props);
		this.onChangeRemember = this.onChangeRemember.bind(this);
		this.state = {
			remember: false
		}
	}

	onChangeRemember(e) {
		console.log(!this.state.remember);
		this.setState(({remember: !this.state.remember}));
	}

	render()
	{
		let key = 1;

		const labels = this.props.fields.map((fld) =>
			<th style={ {'width': fld.width} } key={ key++ } >{ Messages.getMessage(fld.label) }</th>
		);

		const data = this.props.data.map((register) =>
		{
			let registerFields = this.props.fields.map((fld) => {
				const reducer = (acc, cur) => acc[cur];
				const content = fld.field.split('.').reduce(reducer, register);
				return (<td style={ {'width': fld.width} } key={ key++ }>{ content }</td>)
			});

			let registerActions = <div/>;
			if (this.props.actions) {
				registerActions =
					<td key={ key++ }>
					<div style={{display: 'inline-flex'}}>{
					this.props.actions.map((act) =>
							<LightTooltip key={ key++ } title={Hints[act.field]} placement={"top"} arrow>
								{act.field === "delete" ?
									<Modal key={key++} act={act} register={register} onChangeRemember={this.onChangeRemember} remember={this.state.remember} dontRemember={() => this.setState(({remember:false}))}/>

									:
										<button key={ key++ } className="d-inline-block w-33 btn btn-secondary btn-action" style={ {margin:'2px', background:ButtonColors[act.field]}} onClick={ (evt) => act.handle(evt, register.id) }><i className={ Icons[act.field] }/></button>

									}
								</LightTooltip>
								)}
								</div>
					</td>;
			}
			if(this.props.actions) {
				return (
					<tr key={ key++ }>
						{ registerFields }
						{ registerActions }
					</tr>
				);
			} else {
				return (
					<tr key={ key++ }>
						{ registerFields }
					</tr>
				);
			}
		});

		let labelActions;

		if (this.props.actions && this.props.actions.length > 0) {
			labelActions = <th className="w-5 actions-label" style={ {width: "5%"} } colSpan={ this.props.actions.length }>{ Messages.getMessage('action.title') }</th>;
		}

		let footerPageInfo = "";
		if (this.props.pagination) {
			footerPageInfo = formatString(Messages.getMessage('layout.paginator'), [
				this.props.pagination.current,
				this.props.pagination.pages_count,
				this.props.pagination.itens_count
			]);
		}

		let card = <div className="card-body">
			<div className="table-responsive">
				<table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
					<thead>
					<tr>
						{ labels }
						{ labelActions }
					</tr>
					</thead>
					<tbody>
					{ data }
					</tbody>
				</table>
			</div>
			{this.props.pagination ?
			<Pagination pagination={ this.props.pagination } onClickPage={ this.props.onClickPage }/> : <div/>}
		</div>;

		let empty_card =
		<div className="card text-gray text-center ">
			<div className="card-body p-4">
				<h3 className="card-title">Nenhum registro</h3>
				<p className="card-text primary-text text-center" >
					Parece que ainda não há nada cadastrado aqui.
				</p>
			</div>
		</div>;
		let loading =
		<div className="card-body">
				<h3 style={{textAlign:'center'}}><i className={Icons.loading}/>   Carregando...</h3>
		</div>;
		return (
		    <div className="card mb-3 shadow">
				<div className="card-header">
					<i className={ Icons.table }/> { Messages.getMessage(this.props.title) }
					{this.props.extraButton ? this.props.extraButton : ""}
					{this.props.buttonBackRemove ?<a className="btn btn-primary border-right" href={"javascript:history.back();"}><i className="fas fa-backward"/></a> : <i/>}

					{this.props.buttonRemove ? <div/> : <Link className="btn btn-primary" to={ this.props.addUrl }><i className={ Icons.plus }/></Link> }
				</div>
				{this.props.details}
				{this.props.filter}

				{this.props.pagination ? this.props.pagination.loaded?((this.props.data.length === 0)? empty_card : card):loading : card}


				{this.props.pagination ?
				<div className="card-footer small text-muted">{ footerPageInfo }</div> : <div/>}
		    </div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/
class TableEvaluation extends Component{

	constructor(props)
	{
		super(props);
		this.state = {
			semaforos: []
		}
	}

	render() {
		let lista = [];
		let colun = []

		if(this.props.table == 1){
			colun[0] = "Cnpj";
			colun[1] = "Avaliação";
		}else if(this.props.table == 2){
			colun[0] = "Cpf";
			colun[1] = "Avaliação";
		}else if(this.props.table == 3){
			colun[0] = "Placa";
			colun[1] = "Avaliação";
		}
		let i = 0;
		if(this.props.data) {
			lista = this.props.data.map((colunas) =>
				<tr>
					<td>{colunas.nome}</td>
					<td>{colunas.semaforo}</td>

					<div id={i++}></div>
				</tr>

		);
		}

		return(
			<table className="table">
				<thead>
				<tr>
					<th scope="col">{colun[0]}</th>
					<th scope="col">{colun[1]}</th>
				</tr>
				</thead>
				<tbody>
					{lista}
				</tbody>
			</table>
		);
	}


}

/*----------------------------------------------------------------------------------------------------*/

class FormPage extends Component {
	render() {
		return (
			<div className="card mb-3 shadow">
				<div className="card-header">

				{this.props.noIcon ? " " : <i className={Icons.table }/>}{this.props.bold ?
				<b>{" " + Messages.getMessage(this.props.title)}</b> : " " + Messages.getMessage(this.props.title)}
				</div>
				<div className="card-body">

				{/*this.props.status ? this.props.children : <h3 style={{textAlign:'center'}}><i className={Icons.loading}/>   Carregando...</h3>*/}
				{this.props.children}
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class FormRow extends Component
{
	render()
	{
		return (<div className="form-row">{ this.props.children }</div>);
	}
}

/*----------------------------------------------------------------------------------------------------*/
class FormCol extends Component {
	render() {
		return (<div className={"form-group col-" + (this.props.tam ? this.props.tam + "-" : "-auto-") + (this.props.colsize ? +this.props.colsize : +"6")}>{this.props.children}</div>);
	}
}

/*----------------------------------------------------------------------------------------------------*/
class BasicView extends Component {


	render() {


		let text_fields = this.props.fields.map( (field, index) => {
			//return (<div key={field.label} className={ classe }><b>{field.label}</b>{(field.value !== ''? field.value : 'Não informado')}</div>);
			return(<TextView key={"basicView-key-" + index} name={"basicView-item-"+ index} label={field.label || "Sem título"} value={field.value || "Não informado"} rowsize={this.props.rowsize || '1'} colsize={this.props.colsize || '6'}/>);
		});

		return (<div className="card mb-2 shadow">
			{this.props.removeButtons ? '' :
				<div className="card-header">

					<div className="card-title"><b>{this.props.title || Messages.getMessage(this.props.title_message)}</b>
						{this.props.buttonEditRemove ? '' : <button className="btn btn-primary border-left active" onClick={this.props.onClickEdit}>
							<i className="fas fa-edit" /></button>}
						{this.props.buttonBackRemove ? '' :
							<a className="btn btn-primary border-right" href={"javascript:history.back();"}>
								<i className="fas fa-backward" /></a>}
					</div>


				</div>
			}

			{this.props.status ?

			<div className="card-body container">

				<div className={"row"}>
					{text_fields}
					{this.props.children}
				</div>
				<br/>
				<div className={"row"}>
					{this.props.details}
				</div>
				<br/>
				<div className={"row"}>
					{this.props.button_add}
				</div>
				<br/>
				<div className={"row"}>
					{this.props.button_cancel}
				</div>
			</div>

				:
			<div className="card-body">
				<h3 style={{textAlign:'center'}}><i className={Icons.loading}/>   Carregando...</h3>
			</div>
			}



		</div>);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class Filter extends Component {


	render() {

		let input_fields = this.props.fields.map((field) => {
			return (<div className={"form-group col-auto"} key={field.label}>
				<input className={"form-control col-auto"} type={field.type} id={this.props.label} placeholder={Messages.getMessage(field.label)} name={field.field}
					autoFocus={this.props.autofocus} onChange={this.props.onChange} />
			</div>);
		});

		return (

			<div className="container-fluid mt-4 ml-0 p-0">

				<div className="form-inline col-sm-12 p-1">
					{input_fields}
					<div className={"form-group col-auto"}>
						<Tooltip title="Filtrar" placement="top" arrow>

							<button type="submit" className="btn btn-success mt-0" onClick={this.props.onSubmit}><i className={"fas fa-filter"} /></button>

						</Tooltip>
					</div>
				</div>

			</div>);
	}
}


/*----------------------------------------------------------------------------------------------------*/

class Modal extends Component {
	constructor(props) {
		super(props);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleClickYes = this.handleClickYes.bind(this);
		this.state = {
			open:false
		}
	}

	handleClickOpen (){
		if(this.props.remember)
			this.props.act.handle(null, this.props.register.id);
		else
			this.setState(({open:true}));
	}

	handleClose() {
		this.props.dontRemember();
		this.setState(({open:false}));
	}

	handleClickYes(e) {
		this.setState(({open:false}));
		this.props.act.handle(e, this.props.register.id);
	}

	render() {
		return (
			<>
			<LightTooltip key={ 213876253 } title={Hints[this.props.act.field]} placement={"top"} arrow>
				<button key={ this.props.key } className={"d-inline-block w-33 btn btn-secondary btn-action"} style={ {margin:"2px", background:ButtonColors[this.props.act.field]}} onClick={this.handleClickOpen}><i className={ Icons[this.props.act.field] }/>
				</button>
			</LightTooltip>
			<Dialog
				open={this.state.open}
				onClose={this.handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{"Delete"}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Deseja realmente excluir?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={this.handleClose} color="primary">
						Não
					</Button>
					<Button onClick={ this.handleClickYes } color="primary" autoFocus>
						Sim
					</Button>
				</DialogActions>

			</Dialog>
			</>
		)
	}
}

export { CenterCard, AlertDangerForm, NavBar, SideBar, SideBarItem, SideBarDropDown, SideBarDropDownItem,
		 SideBarDropDownGroup, SideBarDropDownDivider, Footer, ScrollToTop, TableData, CenterCard2, FormPage,
		  FormRow, FormCol, BasicView, Filter, LightTooltip, TableEvaluation};

