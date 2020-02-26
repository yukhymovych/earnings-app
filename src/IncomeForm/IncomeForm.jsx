import React, { Component } from 'react';
import './IncomeForm.css';

class IncomeForm extends Component{
   constructor(props){
      super(props);
      this.state = {
         newIncomeSum: '',
         newIncomeInfo: '',
         newIncomeDate: '',
      };
   }

   handleSumInput = (e) => {
      this.setState({
         newIncomeSum: e.target.value,
      })
   }

   handleInfoInput = (e) => {
      this.setState({
         newIncomeInfo: e.target.value,
      })
   }

   handleDateInput = (e) => {
      this.setState({
         newIncomeDate: e.target.value,
      })
   }

   writeIncome = () => {
      if(!this.state.newIncomeSum.match(/^\d+$/) || this.state.newIncomeInfo.match(/^\s*$/)){
         let errorMessage = document.querySelector(".error-message");

         this.setState({
            newIncomeSum: '',
            newIncomeInfo: '',
            newIncomeDate: '',
         })

         document.querySelector(".error-message").textContent="Некоторые из полей пусты или имеют неверные данные.";

         errorMessage.classList.add("error-message--fade-in");
         setTimeout(function(){errorMessage.classList.remove("error-message--fade-in")}, 6000);
      }
      else if(!this.state.newIncomeDate.match(/^\s*$/) && !this.state.newIncomeDate.match(/^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/)){
         let errorMessage = document.querySelector(".error-message");

         this.setState({
            newIncomeSum: '',
            newIncomeInfo: '',
            newIncomeDate: '',
         })

         document.querySelector(".error-message").textContent="Вы ввели неправильный формат даты. Верный - дд.мм.гггг";

         errorMessage.classList.add("error-message--fade-in");
         setTimeout(function(){errorMessage.classList.remove("error-message--fade-in")}, 6000);
      }
      else{
         let newIncome;

         if(this.state.newIncomeDate.match(/^\s*$/)){
            var today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();

            today = dd + '.' + mm + '.' + yyyy;

            newIncome = {
               incomeSum: parseInt(this.state.newIncomeSum), 
               incomeInfo: this.state.newIncomeInfo,
               incomeDate: today};
         }
         else {
            newIncome = {
               incomeSum: parseInt(this.state.newIncomeSum), 
               incomeInfo: this.state.newIncomeInfo,
               incomeDate: this.state.newIncomeDate};
         }

         this.props.addIncome(newIncome);
   
         this.setState({
            newIncomeSum: '',
            newIncomeInfo: '',
            newIncomeDate: '',
         });
      }
   }

   render(){
      return(
         <div className="input-form">
            <input className="sum-input" 
            placeholder="Сумма"
            value={this.state.newIncomeSum} 
            onChange={this.handleSumInput} />

            <input className="info-input" 
            placeholder="Доп. информация"
            value={this.state.newIncomeInfo} 
            onChange={this.handleInfoInput} />

            <input className="date-input" 
            placeholder="Дата (может быть пустым)"
            value={this.state.newIncomeDate} 
            onChange={this.handleDateInput} />
            
            <button className="input-button"
            onClick={this.writeIncome}>Добавить запись</button>

            <p className="error-message">Вы ввели неверные данные.</p>
         </div>
      )
   }
}

export default IncomeForm;