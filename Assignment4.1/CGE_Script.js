// Wait for the user to click the "Submit" button
document.getElementById('submitBtn').addEventListener('click', function () {
  
  // Get the value from each input field
  const username = document.getElementById('username').value;
  const weapons = document.getElementById('weapons').value;
  const health = document.getElementById('health').value;
  const points = document.getElementById('points').value;

  // Get the output area where we'll display the results
  const outputArea = document.getElementById('output');

  // Display the collected values in the output area
  outputArea.innerHTML = `
    <strong>Username:</strong> ${username} <br>
    <strong>Weapons:</strong> ${weapons} <br>
    <strong>Health/Damage:</strong> ${health} <br>
    <strong>Point Total:</strong> ${points}
  `;
});
