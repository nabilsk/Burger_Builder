import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/action/index';

class Auth extends Component {
    state = {
        controls : {
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : 'My Adress'
                },
                value : '',
                validation : {
                    required : true,
                    isEmail  : true
                },
                valid : false,
                touched : false,
            } ,
            password : {
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder : 'password'
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 6
                },
                valid : false,
                touched : false,
            } 
        },
        isSignup : true,
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectP !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules){
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    inputChangeHandler = (event , controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value : event.target.value,
                valid : this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched : true
            }
        }
        this.setState({controls : updatedControls})
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }
    switchAuthModeHAndler = () => {
        this.setState(pervState => {
            return {isSignup : !pervState.isSignup};
        })
    }
    render() {
        const formElements = [];
        for (const key in this.state.controls) {
            formElements.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        let form = formElements.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
            />
        ))
        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectP} />
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHAndler}
                    btnType="Danger">Switch to {this.state.isSignup ? "SignIn" : "SignUp"}</Button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
           loading : state.auth.loading,
           error : state.auth.error,
           isAuthenticated : state.auth.token !== null,
           buildingBurger : state.burgerBuilder.building,
           authRedirectP : state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);