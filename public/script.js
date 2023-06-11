document.addEventListener('DOMContentLoaded', () => {
  const createCardForm = document.getElementById('createCardForm');
  createCardForm.addEventListener('submit', handleCreateCard);

  // Function to handle card creation form submission
  function handleCreateCard(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const manaCost = document.getElementById('manaCost').value;
    const color = document.getElementById('color').value;

    // Create a new card object
    const newCard = {
      name: name,
      price: price,
      quantity: quantity,
      manaCost: manaCost,
      color: color
    };

    // Send a POST request to create the new card
    fetch('/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCard)
    })
      .then(response => response.json())
      .then(data => {
        const cardId = data.cardId;
        // Fetch the newly created card from the server
        fetch(`/cards/${cardId}`)
          .then(response => response.json())
          .then(data => {
            const card = data.card;
            // Display the newly created card on the webpage
            displayCard(card);
          })
          .catch(error => {
            console.error('Error retrieving the newly created card: ', error);
          });
      })
      .catch(error => {
        console.error('Error creating the card: ', error);
      });

    // Reset the form fields
    createCardForm.reset();
  }

  // Function to display a card on the webpage
  function displayCard(card) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    const cardName = document.createElement('h3');
    cardName.textContent = card.name;

    const cardPrice = document.createElement('p');
    cardPrice.textContent = `Price: $${card.price}`;

    const cardQuantity = document.createElement('p');
    cardQuantity.textContent = `Quantity: ${card.quantity}`;

    const cardManaCost = document.createElement('p');
    cardManaCost.textContent = `Mana Cost: ${card.mana_cost}`;

    const cardColor = document.createElement('p');
    cardColor.textContent = `Color: ${card.color}`;

    cardContainer.appendChild(cardName);
    cardContainer.appendChild(cardPrice);
    cardContainer.appendChild(cardQuantity);
    cardContainer.appendChild(cardManaCost);
    cardContainer.appendChild(cardColor);

    document.body.appendChild(cardContainer);
  }
});
