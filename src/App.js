import React, { Component } from 'react';
import './App.css';
import Income from './Income/Income';
import IncomeForm from './IncomeForm/IncomeForm';
import SideInfo from './SideInfo/SideInfo';
import SearchForm from './SearchForm/SearchForm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import IncomeMonth from './IncomeMonth/IncomeMonth';

import { config } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';


class App extends Component{
   constructor(props){
      super(props);
     
      this.app = firebase.initializeApp(config);
      this.database = this.app.database().ref().child('income');

      this.incomeEditForm = React.createRef();
      this.errorMessage2 = React.createRef();
      
      this.state = {
         initialIncomeList: [],
         fullIncomeList: [],
         editIncomeDate: '',
      }
   }

   componentDidMount(){
      const incomeArray = this.state.fullIncomeList;

      this.database.on('child_added', snap => {
         incomeArray.push({
            id: snap.key,
            incomeSum: snap.val().incomeSum,
            incomeInfo: snap.val().incomeInfo,
            incomeDate: snap.val().incomeDate,
         });
         this.setState({
            initialIncomeList: incomeArray,
            fullIncomeList: incomeArray
         });
      });

      this.database.on('child_removed', snap => {
         for(var i=0; i < incomeArray.length; i++){
            if(incomeArray[i].id === snap.key){
               incomeArray.splice(i, 1);
            }
         }
         this.setState({
            initialIncomeList: incomeArray,
            fullIncomeList: incomeArray
         });
      });

      this.database.on('child_changed', snap => {
         for(var i=0; i < incomeArray.length; i++){
            if(incomeArray[i].id === snap.key){
               incomeArray[i].incomeSum = snap.val().incomeSum;
               incomeArray[i].incomeInfo = snap.val().incomeInfo;
               incomeArray[i].incomeDate = snap.val().incomeDate;
            }
         }
         this.setState({
            initialIncomeList: incomeArray,
            fullIncomeList: incomeArray
         });
      });
   }

   addIncome = (newIncome) => {
      this.database.push().set({
         incomeSum: newIncome.incomeSum,
         incomeInfo: newIncome.incomeInfo,
         incomeDate: newIncome.incomeDate
      });
   }

   removeIncome = (incomeId) => {
      this.database.child(incomeId).remove();
   }

   editIncome = (incomeId) => {
      const incomeArray = [...this.state.fullIncomeList];

      let editFormSaveButton = document.getElementById("editFormSaveButton");
      let editFormCloseButton = document.getElementById("editFormCloseButton");
      let errorMessage = this.errorMessage2.current;

      let editFormSum;
      let editFormInfo;
      let editFormDate;
      let initialFormDate;

      this.incomeEditForm.current.style = 
      "transform: translate(-50%, -70%); opacity: 1; visibility: visible";

      for(let i=0; i < incomeArray.length; i++){
         if(incomeArray[i].id === incomeId){
            document.getElementById("edit-form-sum").value = incomeArray[i].incomeSum;
            document.getElementById("edit-form-info").value = incomeArray[i].incomeInfo;
            document.getElementById("edit-form-date").value = incomeArray[i].incomeDate;
            initialFormDate = incomeArray[i].incomeDate;
         }
      }

      editFormSaveButton.onclick = () => {
         for(let i=0; i < incomeArray.length; i++){
            if(incomeArray[i].id === incomeId){
               editFormSum = document.getElementById("edit-form-sum").value;
               editFormInfo = document.getElementById("edit-form-info").value;
               editFormDate = document.getElementById("edit-form-date").value;
            }
         }
         
         if(!editFormSum.match(/^\d+$/) || editFormInfo.match(/^\s*$/)){
            this.errorMessage2.current.textContent = "Некоторые из полей пусты или имеют неверные данные.";
            errorMessage.classList.add("error-message--fade-in");
         }
         else if(!editFormDate.match(/^\s*$/) && !editFormDate.match(/^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/)){
            this.errorMessage2.current.textContent = "Вы ввели неправильный формат даты. Верный - дд.мм.гггг";
            errorMessage.classList.add("error-message--fade-in");
         }
         else{
            if(editFormDate.match(/^\s*$/))
            {
               for(var i=0; i < incomeArray.length; i++){
                  if(incomeArray[i].id === incomeId){
                     this.database.child(incomeId).set({
                        incomeSum: parseInt(editFormSum, 10),
                        incomeInfo: editFormInfo,
                        incomeDate: initialFormDate
                     });
                  }
               }
               
               this.incomeEditForm.current.style = "transform: translate(-50%, -40%); opacity: 0; visibility: hidden";
               errorMessage.classList.remove("error-message--fade-in");
            }
            else
            {
               for(var i=0; i < incomeArray.length; i++){
                  if(incomeArray[i].id === incomeId){
                     this.database.child(incomeId).set({
                        incomeSum: parseInt(editFormSum, 10),
                        incomeInfo: editFormInfo,
                        incomeDate: editFormDate
                     });
                  }
               }
               
               this.incomeEditForm.current.style = "transform: translate(-50%, -40%); opacity: 0; visibility: hidden";
               errorMessage.classList.remove("error-message--fade-in");
            }
         }
      }

      editFormCloseButton.onclick = () => {
         this.incomeEditForm.current.style = "transform: translate(-50%, -40%); opacity: 0; visibility: hidden";
         errorMessage.classList.remove("error-message--fade-in");
      }
   }

   handleDateInput = (date) => {
      this.setState({
         editIncomeDate: date,
      });
   }

   showFirstOption = () => {
      const incomeArray = [];
      const shownIncomeArray = [...this.state.fullIncomeList];

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
               id: shownIncomeArray[i].id,
               incomeSum: shownIncomeArray[i].incomeSum,
               incomeInfo: shownIncomeArray[i].incomeInfo,
               incomeDate: shownIncomeArray[i].incomeDate
            });
         }
      }

      this.setState({
         fullIncomeList: incomeArray
      });
   }

   showSecondOption = () => {
      const incomeArray = [];
      const shownIncomeArray = [...this.state.fullIncomeList];

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
               id: shownIncomeArray[i].id,
               incomeSum: shownIncomeArray[i].incomeSum,
               incomeInfo: shownIncomeArray[i].incomeInfo,
               incomeDate: shownIncomeArray[i].incomeDate
            });

         }
      }
      
      this.setState({
         fullIncomeList: incomeArray
      });
   }

   showThirdOption = () => {
      const incomeArray = [];
      const shownIncomeArray = [...this.state.fullIncomeList];

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
               id: shownIncomeArray[i].id,
               incomeSum: shownIncomeArray[i].incomeSum,
               incomeInfo: shownIncomeArray[i].incomeInfo,
               incomeDate: shownIncomeArray[i].incomeDate
            });
         }
      }

      this.setState({
         fullIncomeList: incomeArray
      });
   }

   showFourthOption = () => {
      this.setState({
         fullIncomeList: this.state.initialIncomeList,
      });
   }

   searching = (searchText) => {
      const incomeArray = [];
      const initialIncomeArray = [...this.state.initialIncomeList];

      let tempSum = '';
      let tempInfo = '';
      let tempDate = '';

      if (!searchText.match(/^\s*$/)) {
         for (let i=0; i < initialIncomeArray.length; i++){
            tempSum = initialIncomeArray[i].incomeSum.toString();
            tempInfo = initialIncomeArray[i].incomeInfo;
            tempDate = initialIncomeArray[i].incomeDate;
   
            if (tempSum.indexOf(searchText) !== -1
            || tempInfo.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 
            || tempDate.indexOf(searchText) !== -1) {
               incomeArray.push({
                  id: initialIncomeArray[i].id,
                  incomeSum: initialIncomeArray[i].incomeSum,
                  incomeInfo: initialIncomeArray[i].incomeInfo,
                  incomeDate: initialIncomeArray[i].incomeDate
               });
            }
         }
   
         this.setState({
            fullIncomeList: incomeArray,
         });
      }
      else {
         this.setState({
            fullIncomeList: this.state.initialIncomeList,
         });
      }
   }


   render(){
      return(
         <div className="app-wrapper">
            <div className="list-place">
               <h1>Список записей</h1>
               {
                  this.state.fullIncomeList.map((item) => {
                     return(
                        <Income incomeSum={item.incomeSum} 
                           incomeInfo={item.incomeInfo}
                           incomeDate={item.incomeDate}
                           incomeId={item.id}

                           key={item.id} 

                           removeIncome={this.removeIncome}
                           editIncome={this.editIncome} />
                     )
                  })
               }
               <IncomeForm addIncome={this.addIncome} />
            </div>

            <div className="month-list">
               <IncomeMonth incomeList={this.state.fullIncomeList} />
            </div>

            <div id="income-edit-form" className="income-edit-form" ref={this.incomeEditForm}>
               <h3 className="edit-form-header">Редактирование записи</h3>
               <input id="edit-form-sum" type="text" />
               <DatePicker id="edit-form-date"
               selected={this.state.editIncomeDate}
               onChange={this.handleDateInput}
               dateFormat="dd.MM.yyyy" />
               <textarea id="edit-form-info" type="text" />
               <span id="editFormSaveButton" className="save-button">Сохранить</span>
               <span id="editFormCloseButton" className="close-button">Отменить</span>
               <p className="error-message-2" ref={this.errorMessage2}>Вы ввели неверные данные. Вы ввели неверные данные.</p>
            </div>

            <div className="option-menu">
               <h3 className="option-menu-header">Опции</h3>
               <div className="option-menu-item">
                  <span className="option-button" onClick={this.showFirstOption}>За 1 месяц</span>
                  <span className="option-button" onClick={this.showSecondOption}>За 3 месяца</span>
                  <span className="option-button" onClick={this.showThirdOption}>За 6 месяцев</span>
                  <span className="option-button" onClick={this.showFourthOption}>За все время</span>
               </div>
               <SearchForm searching={this.searching} />
            </div>

            <SideInfo incomeList={this.state.fullIncomeList} />
         </div>
      );
   }
}


export default App;