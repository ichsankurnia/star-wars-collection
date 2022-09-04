export const convertToInternationalCurrencySystem = (labelValue: any) => {
    try {
        if(Number(labelValue)){
            // Nine Zeroes for Billions
            const res = Math.abs(Number(labelValue)) >= 1.0e+9
        
            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " billion"
            // Six Zeroes for Millions 
            : Math.abs(Number(labelValue)) >= 1.0e+6
        
            ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " million"
            // Three Zeroes for Thousands
            : Math.abs(Number(labelValue)) >= 1.0e+3
        
            ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " kilo"
        
            : Math.abs(Number(labelValue));
            
            return res
        }else{
            return labelValue
        }
        
    } catch (error) {
        return labelValue        
    }
}

export const isValidURL = (string: string) => {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }