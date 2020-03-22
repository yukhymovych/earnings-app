import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
   constructor(props){
      super(props);
      this.state = {
         inputPassword: "",
      };

      this.form = React.createRef();
      this.msg = React.createRef();
   }

   handleInput = (e) => {
      this.setState({
         inputPassword: e.target.value,
      });
   }

   inputCheck = () => {
      if(this.state.inputPassword === this.props.password) {
         this.msg.current.textContent = "Пароль верный";
         this.msg.current.style = "opacity: 1; color: #2faa42";

         setTimeout(() => {this.form.current.style = "opacity: 0; transform: translate(-50%,-75%);";}, 1000);
         setTimeout(() => {this.props.checkPassword(this.state.inputPassword);}, 2000);
      }
      else{
         this.msg.current.textContent = "Пароль неверный";
         this.msg.current.style = "opacity: 1; color: #ff4242";

         setTimeout(() => {this.msg.current.style = "opacity: 0;";}, 2000); 
      }
   }

   render(){
      return(
         <div className="login-form" ref={this.form}>
            <input className="login__input"
            placeholder="Введите пароль" 
            value={this.state.inputPassword}
            onChange={this.handleInput} 
            type="password"/>
            <button className="login__btn"
            onClick={this.inputCheck}>Войти</button>
            <p className="login__msg" ref={this.msg}>Пароль верный</p>
         </div>
      );
   }
}

export default Login;