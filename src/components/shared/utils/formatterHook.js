

export const useFormatter = ()=> {

   // Number Formatters
   const percentageFormatter = (num) => {
    const formatDone = Math.abs(num*100).toFixed(2) + "%";
    return formatDone
  }
  const numberFormatter = (num) => {
    const numb = Number(num)    
    return new Intl.NumberFormat().format(numb)
  }
  const currencyFormatter = (num, digits)=> {
    
    const numb = Number(num)    
    const digit = num < 1 ? 4 : undefined  
      return new Intl.NumberFormat('en-EN', {maximumSignificantDigits: digit, style: 'currency', currency: 'USD' }).format(numb)
  }


  return [percentageFormatter, numberFormatter, currencyFormatter ]
}