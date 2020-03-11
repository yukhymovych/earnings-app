import React, { Component } from 'react';
import './IncomeForm.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class IncomeForm extends Component{
   constructor(props){
      super(props);
      this.state = {
         newIncomeSum: '',
         newIncomeInfo: '',
         newIncomeDate: new Date(),
      };

      this.errorMessage = React.createRef();
   }

   handleSumInput = (e) => {
      this.setState({
         newIncomeSum: e.target.value,
      });
   }

   handleInfoInput = (e) => {
      this.setState({
         newIncomeInfo: e.target.value,
      });
   }

   handleDateInput = (date) => {
      this.setState({
         newIncomeDate: date,
      });
   }

   writeIncome = () => {
      if (!this.state.newIncomeSum.match(/^\d+$/) || this.state.newIncomeInfo.match(/^\s*$/)){
         let errorMessage = this.errorMessage.current;

         this.setState({
            newIncomeSum: '',
            newIncomeInfo: '',
            newIncomeDate: new Date(),
         });

         this.errorMessage.current.textContent="Некоторые из полей пусты или имеют неверные данные.";

         errorMessage.classList.add("error-message--fade-in");
         setTimeout(function(){errorMessage.classList.remove("error-message--fade-in")}, 6000);
      }
      else {
         let newIncome,
             dd,
             mm,
             yyyy,
             today;

         if (this.state.newIncomeDate == null){
            today = new Date();
            dd = String(today.getDate()).padStart(2, '0');
            mm = String(today.getMonth() + 1).padStart(2, '0');
            yyyy = today.getFullYear();

            today = dd + '.' + mm + '.' + yyyy;

            newIncome = {
               incomeSum: parseInt(this.state.newIncomeSum), 
               incomeInfo: this.state.newIncomeInfo,
               incomeDate: today
            };
         }
         else {
            dd = String(this.state.newIncomeDate.getDate()).padStart(2, '0');
            mm = String(this.state.newIncomeDate.getMonth() + 1).padStart(2, '0');
            yyyy = this.state.newIncomeDate.getFullYear();

            today = dd + '.' + mm + '.' + yyyy;

            newIncome = {
               incomeSum: parseInt(this.state.newIncomeSum), 
               incomeInfo: this.state.newIncomeInfo,
               incomeDate: today
            };
         }

         this.props.addIncome(newIncome);
   
         this.setState({
            newIncomeSum: '',
            newIncomeInfo: '',
            newIncomeDate: new Date(),
         });
      }
   }

   render() {
      return (
         <div className="input-form">
            <input className="sum-input" 
            placeholder="Сумма"
            value={this.state.newIncomeSum} 
            onChange={this.handleSumInput} />

            <input className="info-input" 
            placeholder="Доп. информация"
            value={this.state.newIncomeInfo} 
            onChange={this.handleInfoInput} />

            <DatePicker
            selected={this.state.newIncomeDate}
            onChange={this.handleDateInput}
            dateFormat="dd.MM.yyyy" />
            
            <button className="input-button"
            onClick={this.writeIncome}>Добавить запись</button>

            <p className="error-message" ref={this.errorMessage}>Вы ввели неверные данные.</p>
         </div>
      )
   }
}

export default IncomeForm;