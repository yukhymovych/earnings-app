import React, { Component } from 'react';
import './SideInfo.css';


class SideInfo extends Component{
   constructor(props){
      super(props);

      this.state = {
         incomeList: [],
         bestMonth: {},
         avgSum: 0,
      }
      this.state.incomeList = props.incomeList;
      
      this.monthsCalculation();
   }


   monthsCalculation = () => {
      let incomeList = this.state.incomeList;
      let selectedMonths = [];
      let tempMonth;
      let tempNextMonth;
      let tempYear;
      let tempSum = 0;

      let tempBestMonth = {
         monthSum: 0,
         monthNum: 0,
         monthYear: "0"
      };
      let tempAvgSum = 0;

      let monthsNames = {1:"Январь", 2:"Февраль", 3:"Март", 4:"Апрель", 5:"Май", 6:"Июнь", 7:"Июль", 8:"Август", 9:"Сентябрь", 10:"Октябрь", 11:"Ноябрь", 12:"Декабрь"};

      /*добавление фиктивного елемента списка исправляет ошибку undefiend во время работы цыкла внизу*/
      incomeList.push({
         incomeSum: 0,
         incomeInfo: "",
         incomeDate: "",
         incomeId: ""
      });

      for(var i=0; i < incomeList.length-1; i++){
         tempMonth = parseInt(incomeList[i].incomeDate.slice(3, 5), 10);
         tempYear = parseInt(incomeList[i].incomeDate.slice(6, 11), 10);
         
         if(i === 0){
            tempSum += incomeList[i].incomeSum;
         }
         else{
            tempNextMonth = parseInt(incomeList[i+1].incomeDate.slice(3, 5), 10);
            
            if(tempMonth !== tempNextMonth){
               tempSum += incomeList[i].incomeSum;
               selectedMonths.push({ 
                  monthSum: tempSum,
                  monthNum: tempMonth,
                  monthYear: tempYear
               });
               tempSum = 0;
            }
            else{
               tempSum += incomeList[i].incomeSum;
            }
         }
      }

      /*избавляемся от фиктивного елемента добавленного только для цыкла сверху*/
      incomeList.pop();

      for(let i=0; i < selectedMonths.length; i++){
         if(tempBestMonth.monthSum < selectedMonths[i].monthSum){
            tempBestMonth = selectedMonths[i];
         }
         tempAvgSum += selectedMonths[i].monthSum;
      }

      tempBestMonth.monthNum = monthsNames[tempBestMonth.monthNum];

      tempAvgSum /= selectedMonths.length;

      this.state.bestMonth = tempBestMonth;
      this.state.avgSum = tempAvgSum;
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
               <p className="side-info-sum">{ this.state.avgSum } <span>грн</span></p>
            </div>
         </div>
      )
   }
}


export default SideInfo;