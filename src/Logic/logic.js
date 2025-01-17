export function statsCalculation (data) {
   let incomeList = data;

   let selectedMonths = [];
   let tempMonth;
   let tempPrevMonth;
   let tempYear;
   let tempSum = 0;

   let resultData = {};

   let tempBestMonth = {
      monthSum: 0,
      monthNum: 0,
      monthYear: "0"
   };
   let tempWorstMonth = {
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
      if (i === 0) {
         tempWorstMonth = selectedMonths[i];
      }

      if (tempBestMonth.monthSum < selectedMonths[i].monthSum) {
         tempBestMonth = selectedMonths[i];
      }
      if (!(tempWorstMonth.monthSum < selectedMonths[i].monthSum)) {
         tempWorstMonth = selectedMonths[i];
      }
   }
   
   tempBestMonth.monthNum = monthsNames[tempBestMonth.monthNum];
   tempWorstMonth.monthNum = monthsNames[tempWorstMonth.monthNum];

   if (selectedMonths.length > 0) {
      tempAvgSum /= selectedMonths.length;
   }

   for (let i=0; i < selectedMonths.length; i++) {
      if(typeof selectedMonths[i].monthNum === "number"){
         selectedMonths[i].monthNum = monthsNames[selectedMonths[i].monthNum];
      }
   }

   resultData = {
      avgSum: tempAvgSum, 
      bestMonth: tempBestMonth,
      worstMonth: tempWorstMonth,
      monthsList: selectedMonths,
   };
   
   return resultData;
}