import React, { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {
   constructor(props){
      super(props);
      this.state = {
         inquiry: '',
      };
   }

   handleInquiryInput = (e) => {
      this.setState({
         inquiry: e.target.value,
      });
   }

   inquiryInputStart = () => {
      this.props.searching(this.state.inquiry);
   }

   render(){
      return(
         <div className="search-form">
            <input className=""
            placeholder="Дата, описание или сумма" 
            value={this.state.inquiry}
            onChange={this.handleInquiryInput} />

            <button className=""
            onClick={this.inquiryInputStart}>Поиск</button>
         </div>
      )
   }
}

export default SearchForm;