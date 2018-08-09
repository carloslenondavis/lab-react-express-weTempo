/**
 * 
 */
export const formatDate = (_date) => {
    var monthNames = [
      'January', 
      'February', 
      'March',
      'April', 
      'May', 
      'June', 
      'July',
      'August', 
      'September', 
      'October',
      'November', 
      'December'
    ];
  
    var day = _date.getDate(),
      monthIdx = _date.getMonth(),
      year = _date.getFullYear();
  
    return day + ' ' + monthNames[monthIdx] + ' ' + year;
  }