// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide Results
  document.getElementById('results').style.display = 'none';
  
  // Show Loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);
  
  e.preventDefault();
});

// Calculate Results
function calculateResults(e) {
  console.log('Calculating');
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) /100/12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show Results
    document.getElementById('results').style.display = 'block';

    // Hide Loader
    document.getElementById('loading').style.display = 'none';
  } else {
    // console.log('Please check your numbers');
    showError('Please check your numbers');
  }


  e.preventDefault();
}

// Show Error Function
function showError(error) {
  // Hide Results
  document.getElementById('results').style.display = 'none';

  // Hide Loader
  document.getElementById('loading').style.display = 'none';
  
  // Create Div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading')

  // Add bootstrap classes
  errorDiv.className = 'alert alert-danger'

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error function
function clearError() {
  document.querySelector('.alert').remove();
};