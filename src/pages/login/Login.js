import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import { CenterCard, FormRow } from '../../components/template/Layout';
import { InputInGroup, RememberMeInGroup, ButtonSubmit } from '../../components/template/Form';
import {AlertifyError, AlertifySuccess} from '../../services/AlertifyService';
import MessageService from '../../services/MessageService';
import alertify from 'alertifyjs';
import { Link } from 'react-router-dom';
import logo from "../../assets/company_logo.png";

const imageStyle = {
	textAlign: "center",
	width: "20%",
	height: "20%"
};

const Message = new MessageService();

class Login extends Component
{

	constructor()
	{
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.Auth = new AuthService();
		this.state = {
			fieldErrors: {username: null, password: null},
			formErrors: []
		};
	}




	render()
	{
		return (
		<React.Fragment>
			<div style={{textAlign:"center"}}>
				<img src={logo} alt="logo" style={imageStyle}/>

			</div>
			<CenterCard title='page.user.login.title'>
				<form onSubmit={ this.handleSubmit }>

					<InputInGroup type="text" name="username" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.login.username' required="required" autofocus="autofocus"/>
					<InputInGroup type="password" name="password" errors={ this.state.fieldErrors} onChange={ this.handleChange }
						label='page.user.login.password' required="required" />
					<RememberMeInGroup text='page.user.login.remember' />
					<FormRow>
					    <div className="col-12 mb-2">
					        <ButtonSubmit type="submit" className="btn-block" text='page.user.login.submit' />
					    </div>
					</FormRow>
				</form>
			</CenterCard>
		</React.Fragment>
		);
	}

	handleChange(e)
	{
        this.setState({
                [e.target.name]: e.target.value
            }
        )
    }

    handleErrorLogin(errors)
    {
    	this.setState({
    		fieldErrors: {
    			username: errors.fields.username,
    			password: errors.fields.password
    		},
    		formErrors: errors.form
    	});
    //    AlertifyError(errors.form);
		alertify.error(errors.form[0].message);

	}


    handleSubmit(e)
    {
    	e.preventDefault();
    	this.Auth.login(this.state.username, this.state.password)
    		.then(res => {
    			if (res.has_error)
    			{
					AlertifyError([{message: Message.getMessage('page.user.login.error')}]);
    			} else {
					AlertifySuccess([{message: Message.getMessage('page.user.login.success')}]);
					this.props.history.push('/');
    			}
    		})
    		.catch(err=> {
    			alert(err);
    		})
    }

    UNSAFE_componentWillMount()
    {
    	if(this.Auth.loggedIn()) {
    		this.props.history.push('/');
    	}
    }

}

export default Login;
