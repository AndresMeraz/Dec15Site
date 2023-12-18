'use strict'

"use strict";
const myButton = document.getElementById("generate");
myButton.addEventListener("click", fetchData);

const baseURL = "https://world.openfoodfacts.net/api/v2/product/"

async function fetchData() {
  const endpointResource = document.getElementById("barcodeEntry").value;

  if (!endpointResource) {
    console.error('Endpoint resource is not provided');
    return;
  }

  try {
    const response = await fetch(baseURL + endpointResource);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

function displayData(data) {
  const displayDiv = document.getElementById("displayProducts");
  console.log(data.product.abbreviated_product_name);
  let message = `
  <div style="background-color: #d8973c; padding: 20px;">
    <h3>${data.product.brands_imported}, ${data.product.brands}</h3>
    <p><strong>${data.product.ciqual_food_name_tags}</strong></p>
    <h4>Categories</h4>
      <ul>
        <li>${data.product.categories_hierarchy[0].substring(3)}</li>
        <li>${data.product.categories_hierarchy[1].substring(3)}</li>
        <li>${data.product.categories_hierarchy[2].substring(3)}</li>
        <li>${data.product.categories_hierarchy[3].substring(3)}</li>
        <li>${data.product.categories_hierarchy[4].substring(3)}</li>
      </ul>
    <h4>Allergins</h4>
      <ul>
          <li>${data.product.allergens_hierarchy[0].substring(3)}</li>
          <li>${data.product.allergens_hierarchy[1].substring(3)}</li>
          <li>${data.product.allergens_hierarchy[2]}</li>
      </ul>
    
    <h4>More info here:</h4>
    <a href="${data.product.link}">Product info</a><br>
    <a href="https://ciqual.anses.fr/">Food database</a>
  </div>  `;
  displayDiv.innerHTML = message
}
let numbers = [60, 88, 53, 60, 62, 29, 33, 35];
numbers.sort((a, b) => b - a);
console.log(numbers);