import React, { Component } from 'react';
import './IncomeMonth.css';
import * as logic from "../Logic/logic.js"; 

class IncomeMonth extends Component {
   constructor(props) {
      super(props);

      this.state = {
         fullMonthList: []
      }
   }

   monthsCalculation = () => {
      let tempObject = {};

      tempObject = logic.statsCalculation(this.props.incomeList);
      
      this.setState({
         fullMonthList: tempObject.monthsList,
      });
   }

   componentDidMount() {
      this.monthsCalculation();
   }

   componentDidUpdate(prevProps) {
      if (prevProps !== this.props) {
         this.monthsCalculation();
      }
   }

   render() { 
      return (
         this.state.fullMonthList.map((item) => {
            return (
               <div className="income-month">
                  <p className="income-month__date">{ item.monthNum } { item.monthYear }</p>
                  <p className="income-month__sum">{ item.monthSum } грн</p>
               </div>
            )
         })  
      )
   }
}

export default IncomeMonth;