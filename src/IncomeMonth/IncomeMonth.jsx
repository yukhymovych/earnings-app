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
   componentDidUpdate (prevProps) {
      let tempObject = {};

      if (prevProps !== this.props) {
         tempObject = logic.statsCalculation(this.props);
         
         this.setState({
            fullMonthList: tempObject.monthsList,
         });
      }
   }

   render () { 
      return (
         this.state.fullMonthList.map((item) => {
            return (
               <div className="income-month">
                  <p className="income-month__date">{ item.monthNum } { item.monthYear }</p>
                  <p className="income-month__sum">{ item.monthSum }</p>
               </div>
            )
         })  
      )
   }
}

export default IncomeMonth;