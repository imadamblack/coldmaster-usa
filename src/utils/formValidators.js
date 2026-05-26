export const restrictNumber = (e) => {
  const digitPeriodRegExp = new RegExp('\\d|\,|\\.|\\$|\\(|\\)');
  if(e.ctrlKey // (A)
    || e.altKey // (A)
    || typeof e.key !== 'string' // (B)
    || e.key.length !== 1) { // (C)
    return;
  }
  if(!digitPeriodRegExp.test(e.key)) {
    e.preventDefault();
  }
}

export const emailRegExp = /^([a-zA-Z0-9_.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
