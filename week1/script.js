const recipeObject = {
  id: 1,
  title: "Gløgg",
  picture_url:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Gl%C3%B6gg_kastrull.JPG/800px-Gl%C3%B6gg_kastrull.JPG",
  ingredients: [
    { NAME: "Orange zest", AMOUNT: "0.5" },
    { NAME: "Water", AMOUNT: "200 ml" },
    { NAME: "Sugar", AMOUNT: "275 g" },
    { NAME: "Whole cloves", AMOUNT: "5" },
    { NAME: "Cinnamon sticks", AMOUNT: "2" },
  ],
  description: "Mix everything, heat it, and you are good to go!",
};

function displayRecipe(recipe) {
  const container = document.getElementById("recipe-container");
  container.innerHTML = `
          <h2>${recipe.title}</h2>
          <img src="${recipe.picture_url}" alt="${recipe.title}" width="200">
          <p>${recipe.description}</p>
          <h3>Ingredients:</h3>
          <ul id="ingredient-list"></ul>
      `;

  const ingredientList = document.getElementById("ingredient-list");
  for (let i = 0; i < recipe.ingredients.length; i++) {
    const li = document.createElement("li");
    li.innerText = `${recipe.ingredients[i].NAME}: ${recipe.ingredients[i].AMOUNT}`;
    ingredientList.appendChild(li);
  }
}

displayRecipe(recipeObject);

document
  .getElementById("recipe-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const picture = document.getElementById("picture").value;
    const ingredientInputs = document.querySelectorAll(".ingredient-input");
    const ingredientAmounts = document.querySelectorAll(".ingredient-amount");

    let ingredients = [];
    for (let i = 0; i < ingredientInputs.length; i++) {
      ingredients.push({
        NAME: ingredientInputs[i].value,
        AMOUNT: ingredientAmounts[i].value,
      });
    }

    const newRecipe = {
      id: Date.now(),
      title,
      picture_url: picture,
      ingredients,
      description,
    };

    displayRecipe(newRecipe);
    document.getElementById("recipe-form").reset();
  });

document
  .getElementById("add-ingredient")
  .addEventListener("click", function () {
    const ingredientContainer = document.getElementById("ingredient-container");

    ingredientContainer.innerHTML += `
      <br>
      <input type="text" class="ingredient-input" placeholder="Ingredient Name" required>
      <input type="text" class="ingredient-amount" placeholder="Amount" required>
    `;
  });
