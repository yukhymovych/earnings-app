import React, { Component } from 'react';
import './Income.css';
import PropTypes from 'prop-types';

class Income extends Component{
   
   dateChanger = () => {
      let monthsNames = {1:"Янв", 2:"Фев", 3:"Мар", 4:"Апр", 5:"Май", 6:"Июн", 7:"Июл", 8:"Авг", 9:"Сен", 10:"Окт", 11:"Ноя", 12:"Дек"};

      this.incomeDate = parseInt(this.incomeDate.slice(0, 3), 10) + " " + 
      monthsNames[parseInt(this.incomeDate.slice(3, 5), 10)] + ", " +
      parseInt(this.incomeDate.slice(6, 11), 10);
   }

   handleRemoveIncome = (id) => {
      this.props.removeIncome(id);
   }

   handleEditIncome = (id) => {
      this.props.editIncome(id);
   }

   render(){
      const { incomeSum, incomeInfo, incomeId, incomeDate } = this.props;
      return(
         <div className="income-item">
            <p className="income-date">{ incomeDate }</p>
            <p className="income-sum">{ incomeSum } грн</p>
            <p className="income-info">{ incomeInfo }</p>
            <div className="income-options">
               <div className="open-btn income-options-open-btn">
                  <div className="open-btn-dots"></div>
               </div>
               <span className="closebtn" onClick={() => this.handleRemoveIncome(incomeId)}>Удалить</span>
               <span className="editbtn" onClick={() => this.handleEditIncome(incomeId)}>Изменить</span>
            </div>
         </div>
      )
   }
}

Income.propTypes = {
   incomeSum: PropTypes.number,
   incomeInfo: PropTypes.string,
   incomeDate: PropTypes.string,
   incomeId: PropTypes.string
}

export default Income;