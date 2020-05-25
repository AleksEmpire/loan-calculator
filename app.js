let form = document.getElementById('loan-form');
let results = document.getElementById('results');
let loader = document.getElementById('loader');

let loanCalculator = () => {
    form.addEventListener('submit',(e) => {
        results.style.display = 'none';
        loader.style.display = 'block';

        setTimeout(calculate, 2000);
        e.preventDefault();
    });
}

let calculate = (e) => {

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    
    const principal = parseFloat(amount.value);
    const calculateInterest = parseFloat(interest.value) / 100 / 12;
    const calculatePayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculateInterest, calculatePayments);
    const monthly = (principal*x*calculateInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatePayments).toFixed(2);
        totalInterest.value = ((monthly * calculatePayments) - principal).toFixed(2);
        results.style.display = 'block';
        loader.style.display = 'none';
    } else{
        showError('Please check your numbers');
    }
}

let showError = (error) => {
    results.style.display = 'none';
    loader.style.display = 'none';
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);

    setTimeout(clearError, 3000);
}

let clearError = () => {
    document.querySelector('.alert').remove();
}

loanCalculator();