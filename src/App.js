import React, { Component } from 'react';
import './App.css';
import Income from './Income/Income';
import IncomeForm from './IncomeForm/IncomeForm';
import SideInfo from './SideInfo/SideInfo';


function makeId(length){
   let result           = '';
   let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let charactersLength = characters.length;

   for(let i = 0; i < length; i++){
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   return result;
}


class App extends Component{
   constructor(props){
      super(props);
      this.addIncome = this.addIncome.bind(this);
      this.removeIncome = this.removeIncome.bind(this);
      this.editIncome = this.editIncome.bind(this);
      this.showFirstOption = this.showFirstOption.bind(this);
      this.showSecondOption = this.showSecondOption.bind(this);
      this.showThirdOption = this.showThirdOption.bind(this);
      this.showFourthOption = this.showFourthOption.bind(this);
      
      this.state = {
         fullIncomeList: [ {
               incomeSum: 2000,
               incomeInfo: "Предоплата за сайт портфолио",
               incomeDate: "05.03.2019",
               incomeId: makeId(20)
            }, {
               incomeSum: 3000,
               incomeInfo: "Предоплата за сайт портфолио",
               incomeDate: "14.03.2019",
               incomeId: makeId(20)
            },{
               incomeSum: 3000,
               incomeInfo: "Предоплата за сайт портфолио",
               incomeDate: "02.05.2019",
               incomeId: makeId(20)
            },
            {
               incomeSum: 2200,
               incomeInfo: "Доработка предыдущего проекта",
               incomeDate: "14.05.2019",
               incomeId: makeId(20)
            }, {
               incomeSum: 4200,
               incomeInfo: "Изменения структуры сайта",
               incomeDate: "18.05.2019",
               incomeId: makeId(20)
            }
            , {
               incomeSum: 1300,
               incomeInfo: "Мелкие правки корпоративного проекта",
               incomeDate: "11.07.2019",
               incomeId: makeId(20)
            }
            , {
               incomeSum: 6450,
               incomeInfo: "Часть предоплаты за сайт",
               incomeDate: "21.07.2019",
               incomeId: makeId(20)
            }
            , {
               incomeSum: 1450,
               incomeInfo: "Часть предоплаты за сайт",
               incomeDate: "01.08.2019",
               incomeId: makeId(20)
            }
         ],
         showIncomeList: [],
      }
      this.state.showIncomeList = this.state.fullIncomeList;
   }


   addIncome(showIncomeList){
      const incomeArray = this.state.fullIncomeList;
      
      incomeArray.push({ 
         incomeSum: showIncomeList.incomeSum,
         incomeInfo: showIncomeList.incomeInfo,
         incomeDate: showIncomeList.incomeDate,
         incomeId: makeId(20)
      });

      this.setState({
         fullIncomeList: incomeArray,
         showIncomeList: incomeArray
      });
   }


   removeIncome(incomeId){
      const incomeArray = this.state.fullIncomeList;
      const shownIncomeArray = this.state.showIncomeList;

      for(let i=0; i < incomeArray.length; i++){
         if(incomeArray[i].incomeId === incomeId){
            incomeArray.splice(i, 1);
         }
      }
      for(let i=0; i < shownIncomeArray.length; i++){
         if(shownIncomeArray[i].incomeId === incomeId){
            shownIncomeArray.splice(i, 1);
         }
      }

      this.setState({
         fullIncomeList: incomeArray,
         showIncomeList: shownIncomeArray
      });
   }


   editIncome(incomeId){
      const incomeArray = this.state.fullIncomeList;
      const shownIncomeArray = this.state.showIncomeList;

      let editFormSaveButton = document.getElementById("editFormSaveButton");
      let editFormCloseButton = document.getElementById("editFormCloseButton");
      let errorMessage = document.querySelector(".error-message-2");

      let editFormSum;
      let editFormInfo;
      let editFormDate;
      let initialFormDate;

      document.getElementById("income-edit-form").style = 
      "transform: translate(-50%, -70%); opacity: 1; visibility: visible";
      
      for(let i=0; i < incomeArray.length; i++){
         if(incomeArray[i].incomeId === incomeId){
            document.getElementById("edit-form-sum").value = incomeArray[i].incomeSum;
            document.getElementById("edit-form-info").value = incomeArray[i].incomeInfo;
            document.getElementById("edit-form-date").value = incomeArray[i].incomeDate;
            initialFormDate = incomeArray[i].incomeDate;
         }
      }

      editFormSaveButton.onclick = function(){
         for(let i=0; i < incomeArray.length; i++){
            if(incomeArray[i].incomeId === incomeId){
               editFormSum = document.getElementById("edit-form-sum").value;
               editFormInfo = document.getElementById("edit-form-info").value;
               editFormDate = document.getElementById("edit-form-date").value;
            }
         }
         
         if(!editFormSum.match(/^\d+$/) || editFormInfo.match(/^\s*$/)){
            document.querySelector(".error-message-2").textContent="Некоторые из полей пусты или имеют неверные данные.";
            errorMessage.classList.add("error-message--fade-in");
         }
         else if(!editFormDate.match(/^\s*$/) && !editFormDate.match(/^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/)){
            document.querySelector(".error-message-2").textContent="Вы ввели неправильный формат даты. Верный - дд.мм.гггг";
            errorMessage.classList.add("error-message--fade-in");
         }
         else{
            if(editFormDate.match(/^\s*$/))
            {
               for(let i=0; i < incomeArray.length; i++){
                  if(incomeArray[i].incomeId === incomeId){
                     incomeArray[i] = {
                        incomeSum:  parseInt(editFormSum, 10),
                        incomeInfo: editFormInfo,
                        incomeDate: initialFormDate,
                        incomeId: makeId(20)
                     };
                  }
               }
               for(let i=0; i < shownIncomeArray.length; i++){
                  if(shownIncomeArray[i].incomeId === incomeId){
                     shownIncomeArray[i] = {
                        incomeSum:  parseInt(editFormSum, 10),
                        incomeInfo: editFormInfo,
                        incomeDate: initialFormDate,
                        incomeId: makeId(20)
                     };
                  }
               }
               document.getElementById("income-edit-form").style = 
               "transform: translate(-50%, -40%); opacity: 0; visibility: hidden";
               errorMessage.classList.remove("error-message--fade-in");
            }
            else
            {
               for(let i=0; i < incomeArray.length; i++){
                  if(incomeArray[i].incomeId === incomeId){
                     incomeArray[i] = {
                        incomeSum:  parseInt(editFormSum, 10),
                        incomeInfo: editFormInfo,
                        incomeDate: editFormDate,
                        incomeId: makeId(20)
                     };
                  }
               }
               for(let i=0; i < shownIncomeArray.length; i++){
                  if(shownIncomeArray[i].incomeId === incomeId){
                     shownIncomeArray[i] = {
                        incomeSum:  parseInt(editFormSum, 10),
                        incomeInfo: editFormInfo,
                        incomeDate: editFormDate,
                        incomeId: makeId(20)
                     };
                  }
               }
               document.getElementById("income-edit-form").style = 
               "transform: translate(-50%, -40%); opacity: 0; visibility: hidden";
               errorMessage.classList.remove("error-message--fade-in");
            }
         }

         this.setState({
            fullIncomeList: incomeArray,
            showIncomeList: shownIncomeArray
         });
      }.bind(this);

      editFormCloseButton.onclick = function(){
         document.getElementById("income-edit-form").style = 
         "transform: translate(-50%, -40%); opacity: 0; visibility: hidden";
         errorMessage.classList.remove("error-message--fade-in");
      };
   }


   showFirstOption(){
      const incomeArray = [];
      const shownIncomeArray = this.state.fullIncomeList;

      let elementDate;
      let presentDate = new Date();
      let pastDate = new Date(presentDate.getFullYear(), presentDate.getMonth(), presentDate.getDate());

      let tempDay;
      let tempMonth;
      let tempYear;

      for(let i=0; i < shownIncomeArray.length; i++){

         tempDay = parseInt(shownIncomeArray[i].incomeDate.slice(0, 2), 10);
         tempMonth = parseInt(shownIncomeArray[i].incomeDate.slice(3, 5), 10);
         tempYear = parseInt(shownIncomeArray[i].incomeDate.slice(6, 11), 10);

         elementDate  = new Date(tempYear, tempMonth-1, tempDay);

         if(elementDate >= pastDate.setDate(1)){
            incomeArray.push({ 
               incomeSum: shownIncomeArray[i].incomeSum,
               incomeInfo: shownIncomeArray[i].incomeInfo,
               incomeDate: shownIncomeArray[i].incomeDate,
               incomeId: shownIncomeArray[i].incomeId
            });
         }
      }

      this.setState({
         showIncomeList: incomeArray
      });
   }


   showSecondOption(){
      const incomeArray = [];
      const shownIncomeArray = this.state.fullIncomeList;

      let elementDate;
      let presentDate = new Date();
      let pastDate = new Date(presentDate.getFullYear(), presentDate.getMonth()-1, presentDate.getDate());
      
      let tempDay;
      let tempMonth;
      let tempYear;

      for(let i=0; i < shownIncomeArray.length; i++){

         tempDay = parseInt(shownIncomeArray[i].incomeDate.slice(0, 2), 10);
         tempMonth = parseInt(shownIncomeArray[i].incomeDate.slice(3, 5), 10);
         tempYear = parseInt(shownIncomeArray[i].incomeDate.slice(6, 11), 10);

         elementDate  = new Date(tempYear, tempMonth, tempDay);

         if(elementDate >= pastDate.setDate(1)){
            incomeArray.push({ 
               incomeSum: shownIncomeArray[i].incomeSum,
               incomeInfo: shownIncomeArray[i].incomeInfo,
               incomeDate: shownIncomeArray[i].incomeDate,
               incomeId: shownIncomeArray[i].incomeId
            });

         }
      }
      
      this.setState({
         showIncomeList: incomeArray
      });
   }


   showThirdOption(){
      const incomeArray = [];
      const shownIncomeArray = this.state.fullIncomeList;

      let elementDate;
      let presentDate = new Date();
      let pastDate = new Date(presentDate.getFullYear(), presentDate.getMonth()-4, presentDate.getDate());
 
      let tempDay;
      let tempMonth;
      let tempYear;

      for(let i=0; i < shownIncomeArray.length; i++){

         tempDay = parseInt(shownIncomeArray[i].incomeDate.slice(0, 2), 10);
         tempMonth = parseInt(shownIncomeArray[i].incomeDate.slice(3, 5), 10);
         tempYear = parseInt(shownIncomeArray[i].incomeDate.slice(6, 11), 10);

         elementDate  = new Date(tempYear, tempMonth, tempDay);

         if(elementDate >= pastDate.setDate(1)){
            incomeArray.push({ 
               incomeSum: shownIncomeArray[i].incomeSum,
               incomeInfo: shownIncomeArray[i].incomeInfo,
               incomeDate: shownIncomeArray[i].incomeDate,
               incomeId: shownIncomeArray[i].incomeId
            });
         }
      }

      this.setState({
         showIncomeList: incomeArray
      });
   }


   showFourthOption(){
      const incomeArray = this.state.fullIncomeList;

      this.setState({
         showIncomeList: incomeArray
      });
   }

   componentDidUpdate(){
      console.log("Весь список");
      console.log(this.state.fullIncomeList);
      console.log("Отображаемый список");
      console.log(this.state.showIncomeList);
   }


   render(){
      return(
         <div className="app-wrapper">
            <div className="list-place">
               <h1>Список записей</h1>
               {
                  this.state.showIncomeList.map((showIncomeList) => {
                     return(
                        <Income incomeSum={showIncomeList.incomeSum} 
                           incomeInfo={showIncomeList.incomeInfo}
                           incomeDate={showIncomeList.incomeDate}
                           incomeId={showIncomeList.incomeId}
                           key={showIncomeList.incomeId} 
                           removeIncome={this.removeIncome}
                           editIncome={this.editIncome} />
                     )
                  })
               }
               <IncomeForm addIncome={this.addIncome} />
            </div>

            <div id="income-edit-form" className="income-edit-form">
               <h3 className="edit-form-header">Редактирование записи</h3>
               <input id="edit-form-sum" type="text" />
               <input id="edit-form-date" type="text" />
               <textarea id="edit-form-info" type="text" />
               <span id="editFormSaveButton" className="save-button">Сохранить</span>
               <span id="editFormCloseButton" className="close-button">Отменить</span>
               <p className="error-message-2">Вы ввели неверные данные. Вы ввели неверные данные.</p>
            </div>

            <div className="option-menu">
               <h3 className="option-menu-header">Опции</h3>
               <div className="option-menu-item">
                  <span className="option-button" onClick={this.showFirstOption}>За 1 месяц</span>
                  <span className="option-button" onClick={this.showSecondOption}>За 3 месяца</span>
                  <span className="option-button" onClick={this.showThirdOption}>За 6 месяцев</span>
                  <span className="option-button" onClick={this.showFourthOption}>За все время</span>
               </div>
            </div>

            <SideInfo incomeList={this.state.showIncomeList} />
         </div>
      );
   }
}


export default App;