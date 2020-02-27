import React, { Component } from 'react';
import './SideInfo.css';

class SideInfo extends Component{
   constructor(props){
      super(props);

      this.state = {
         bestMonth: {},
         avgSum: 0,
      }
      this.state.incomeList = props.fullIncomeList;
   }

   componentDidMount () {
      this.monthsCalculation()
   }

   componentDidUpdate(prevProps) {
      if (prevProps !== this.props) {
         this.monthsCalculation()
      }
   }

   monthsCalculation = () => {
      let { incomeList } = this.props;
      let selectedMonths = [];
      let tempMonth;
      let tempPrevMonth;
      let tempYear;
      let tempSum = 0;

      let tempBestMonth = {
         monthSum: 0,
         monthNum: 0,
         monthYear: "0"
      };
      let tempAvgSum = 0;
      
      let monthsNames = {1:"Январь", 2:"Февраль", 3:"Март", 4:"Апрель", 5:"Май", 6:"Июнь", 7:"Июль", 8:"Август", 9:"Сентябрь", 10:"Октябрь", 11:"Ноябрь", 12:"Декабрь"};

      for (let i=0; i < incomeList.length; i++) {
         tempMonth = parseInt(incomeList[i].incomeDate.slice(3, 5), 10);
         tempYear = parseInt(incomeList[i].incomeDate.slice(6, 11), 10);

         if (i === 0) {
            tempSum += incomeList[i].incomeSum;

            if (incomeList.length === 1) {
               selectedMonths.push({ 
                  monthSum: tempSum,
                  monthNum: tempMonth,
                  monthYear: tempYear
               });
            } 
         }
         else {
            tempPrevMonth = parseInt(incomeList[i-1].incomeDate.slice(3, 5), 10);

            if (tempMonth !== tempPrevMonth){
               tempMonth = parseInt(incomeList[i-1].incomeDate.slice(3, 5), 10);
               tempYear = parseInt(incomeList[i-1].incomeDate.slice(6, 11), 10);

               selectedMonths.push({ 
                  monthSum: tempSum,
                  monthNum: tempMonth,
                  monthYear: tempYear
               });

               tempSum = 0;
               tempSum += incomeList[i].incomeSum;

               if (i + 1 === incomeList.length) {
                  tempMonth = parseInt(incomeList[i].incomeDate.slice(3, 5), 10);
                  tempYear = parseInt(incomeList[i].incomeDate.slice(6, 11), 10);

                  selectedMonths.push({ 
                     monthSum: tempSum,
                     monthNum: tempMonth,
                     monthYear: tempYear
                  });
               }
            }
            else {
               tempSum += incomeList[i].incomeSum;
            }
         }

         tempAvgSum += incomeList[i].incomeSum;
      }

      for (let i=0; i < selectedMonths.length; i++) {
         if (tempBestMonth.monthSum < selectedMonths[i].monthSum) {
            tempBestMonth = selectedMonths[i];
         }
      }

      tempBestMonth.monthNum = monthsNames[tempBestMonth.monthNum];

      if (selectedMonths.length > 0) {
         tempAvgSum /= selectedMonths.length;
      }

      this.setState({
         avgSum: tempAvgSum, 
         bestMonth: tempBestMonth
      });
   }


   render(){
      return(
         <div className="side-info">
            <h3 className="side-info-header">Лучший месяц</h3>
            <div className="side-info-item">
               <p className="side-info-date">
                  { this.state.bestMonth.monthNum } { this.state.bestMonth.monthYear }
               </p>
               <p className="side-info-sum">{ this.state.bestMonth.monthSum } <span>грн</span></p>
            </div>
            <h3 className="side-info-header">Средний доход</h3>
            <div className="side-info-item">
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