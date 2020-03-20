import React, { Component } from 'react';
import './SideInfo.css';
import * as logic from "../Logic/logic.js"; 

class SideInfo extends Component{
   constructor(props){
      super(props);

      this.state = {
         bestMonth: {},
         avgSum: 0,
         worstMonth: {},
      }
   }

   componentDidUpdate(prevProps) {
      let tempObject = {};

      if (prevProps !== this.props) {
         tempObject = logic.statsCalculation(this.props.incomeList);

         if (tempObject.worstMonth.monthNum !== undefined) {
            this.setState({
               avgSum: tempObject.avgSum,
               bestMonth: tempObject.bestMonth,
               worstMonth: tempObject.worstMonth,
            });
         }
      }
   }

   render(){
      return(
         <div className="side-info">
            <div className="side-info-item">
               <h3 className="side-info-header">Лучший месяц</h3>
               <p className="side-info-date">
                  { this.state.bestMonth.monthNum } { this.state.bestMonth.monthYear }
               </p>
               <p className="side-info-sum">{ this.state.bestMonth.monthSum } <span>грн</span></p>
            </div>
            <div className="side-info-item">
               <h3 className="side-info-header">Худший месяц</h3>
               <p className="side-info-date">
                  { this.state.worstMonth.monthNum } { this.state.worstMonth.monthYear }
               </p>
               <p className="side-info-sum">{ this.state.worstMonth.monthSum } <span>грн</span></p>
            </div>
            <div className="side-info-item">
               <h3 className="side-info-header">Средний доход</h3>
               <p className="side-info-sum">{ Math.round(this.state.avgSum) } <span>грн</span></p>
            </div>
         </div>
      )
   }
}

SideInfo.defaultProps = {
   incomeList: [{
      id: "",
      incomeSum: 0,
      incomeInfo: "",
      incomeDate: "",
   }]
}


export default SideInfo;