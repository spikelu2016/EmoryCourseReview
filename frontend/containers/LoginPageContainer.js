import React, {PropTypes} from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

import { LoginAction } from '../actions.js'


class LoginPageContainer extends React.Component {
  constructor(props) {
    super(props)
    console.log(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  updateLogin() {
    this.props.loginState();
  }

  updateEmail(event){
    this.setState({email: event.target.value});
  }

  updatePassword(event){
    this.setState({password: event.target.value});
  }
  redirectResend(){
    this.props.history.push('/resend')
    // window.location.replace("http://localhost:3000/resend");                  /*Fixed the resend url*/
  }
  login() {
        // Send a POST request
        console.log(this.state.email)
        //this refers to the window object when referenced inside a fucntion
        var self = this;

        axios({
          method: 'post',
          url: 'http://localhost:3000/account/login',
          data: {
            email: this.state.email,
            password: this.state.password
          }
        })
        .then(function (response) {
          console.log(response.status);
          if(response.data.message){
            alert(response.data.message)
          }
          if(response.data.redirectUrl){
            self.props.history.push(response.data.redirectUrl)
            // window.location.replace('http://localhost:3000'+response.data.redirectUrl)
          }else{
            // console.log("LOGIN SUCCESS")
            // console.log(self.props);
            self.updateLogin();
            // console.log(self.props)
            self.props.history.push('/')
            // window.location.replace("http://localhost:3000/");
          }
        })
        .catch(function (error) {
          console.log(error.response.data.message);
        });
  }
  render() {
    return(
      <div>
      <div className = "header">
          <div className = "header-title"> <span className = "header-title-emory">Emory</span> Course Critique </div>
      </div>

      <div className = "register-body">
        <div className = "login-body-main-component">
          <div className = "register-body-title">Login</div>
              <div>

                <div className="inputs-sizes">
                  <input
                   type="text"
                   value={this.state.email}
                   placeholder="Email Address"
                   className="user-input"
                   onChange={(event) => this.updateEmail(event)}
                  />
                </div>

                <div className="inputs-sizes-password">
                  <input
                   type="password"
                   value={this.state.password}
                   placeholder="Password"
                   className="user-input"
                   onChange={(event) => this.updatePassword(event)}
                  />
                  <button
                  type="button"
                  onClick={() => this.redirectResend()}
                  className="forgot-password-button">
                  Forgot your password?
                  </button>
                </div>

                <div className="submit-button-row">
                  <button
                  className="submit-button"
                  type="button" onClick={() => this.login()}>
                  Login!
                  </button>
                </div>

              </div>
              </div>
            </div>

        </div>
    )
  }
};

const mapStateToProps = state => {
  return{
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginState: () => dispatch(LoginAction())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPageContainer);
