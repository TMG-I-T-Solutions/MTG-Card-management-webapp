// Handle form submission
document.getElementById("cardForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form values
    var cardName = document.getElementById("cardName").value;
    var cardPrice = document.getElementById("cardPrice").value;
    var cardQuantity = document.getElementById("cardQuantity").value;
    var cardManaCost = document.getElementById("cardManaCost").value;
    var cardColor = document.getElementById("cardColor").value;
  
    // Create a new row in the table
    var tableBody = document.getElementById("cardTable").getElementsByTagName("tbody")[0];
    var newRow = tableBody.insertRow();
  
    // Insert cell values
    var nameCell = newRow.insertCell(0);
    nameCell.textContent = cardName;
  
    var priceCell = newRow.insertCell(1);
    priceCell.textContent = cardPrice;
  
    var quantityCell = newRow.insertCell(2);
    quantityCell.textContent = cardQuantity;
  
    var manaCostCell = newRow.insertCell(3);
    manaCostCell.textContent = cardManaCost;
  
    var colorCell = newRow.insertCell(4);
    colorCell.textContent = cardColor;
  
    // Clear form inputs
    document.getElementById("cardName").value = "";
    document.getElementById("cardPrice").value = "";
    document.getElementById("cardQuantity").value = "";
    document.getElementById("cardManaCost").value = "";
    document.getElementById("cardColor").value = "green";
  });
  