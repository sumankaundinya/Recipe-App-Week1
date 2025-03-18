const recipeArray = [
  {
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
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    picture_url:
      "https://www.seriouseats.com/thmb/AKv7r-Xt2anoVvsn0WpLqUehNzU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/chicken-tikka-masala-for-the-grill-recipe-hero-2_1-cb493f49e30140efbffec162d5f2d1d7.JPG",
    ingredients: [
      { NAME: "Chicken", AMOUNT: "500 g" },
      { NAME: "Yogurt", AMOUNT: "100 g" },
      { NAME: "Garlic", AMOUNT: "2 cloves" },
      { NAME: "Ginger", AMOUNT: "1 inch" },
      { NAME: "Tomato puree", AMOUNT: "200 g" },
      { NAME: "Cumin powder", AMOUNT: "1 tsp" },
      { NAME: "Coriander powder", AMOUNT: "1 tsp" },
      { NAME: "Garam masala", AMOUNT: "1 tsp" },
      { NAME: "Cream", AMOUNT: "50 ml" },
    ],
    description: "A creamy, spiced curry with tender chicken pieces.",
  },
  {
    id: 3,
    title: "Aloo Gobi",
    picture_url:
      "https://cinnamonsnail.com/wp-content/uploads/2024/08/Aloo-Gobi-03.jpg",
    ingredients: [
      { NAME: "Potatoes", AMOUNT: "4 medium" },
      { NAME: "Cauliflower", AMOUNT: "1 medium" },
      { NAME: "Onion", AMOUNT: "1 large" },
      { NAME: "Tomato", AMOUNT: "1 large" },
      { NAME: "Cumin seeds", AMOUNT: "1 tsp" },
      { NAME: "Turmeric", AMOUNT: "1 tsp" },
      { NAME: "Ginger", AMOUNT: "1 inch" },
      { NAME: "Coriander leaves", AMOUNT: "A handful" },
    ],
    description:
      "A classic North Indian dish made with potatoes and cauliflower.",
  },
  {
    id: 4,
    title: "Chole Bhature",
    picture_url:
      "https://cdn3.didevelop.com/public/cdn/533_6bba638e2de994c1d0114e14bb7c82ca.jpg",
    ingredients: [
      { NAME: "Chickpeas", AMOUNT: "1 cup" },
      { NAME: "Onions", AMOUNT: "2 medium" },
      { NAME: "Tomatoes", AMOUNT: "2 medium" },
      { NAME: "Ginger-garlic paste", AMOUNT: "1 tbsp" },
      { NAME: "Chili powder", AMOUNT: "1 tsp" },
      { NAME: "Cumin seeds", AMOUNT: "1 tsp" },
      { NAME: "Coriander powder", AMOUNT: "1 tsp" },
      { NAME: "Bhature dough", AMOUNT: "For frying" },
    ],
    description:
      "A delicious curry made from chickpeas, served with deep-fried bread.",
  },
];

function displayRecipe(recipeArray) {
  const container = document.getElementById("recipe-container");
  container.innerHTML = "";
  recipeArray.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
          <h2>${recipe.title}</h2>
          <img src="${recipe.picture_url}" alt="${recipe.title}" width="200">
          <p>${recipe.description}</p>
          <h3>Ingredients:</h3>
          <ul class="ingredient-list"></ul>`;

    const ingredientList = recipeCard.querySelector(".ingredient-list");
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const li = document.createElement("li");
      li.innerText = `${recipe.ingredients[i].NAME}: ${recipe.ingredients[i].AMOUNT}`;
      ingredientList.appendChild(li);
    }

    container.appendChild(recipeCard);
  });
}

displayRecipe(recipeArray);

document.getElementById("sort-button").addEventListener("click", function () {
  const sortedRecipes = [...recipeArray].sort(
    (a, b) => a.ingredients.length - b.ingredients.length
  );
  displayRecipe(sortedRecipes);
});
document.getElementById("search-input").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  if (!searchTerm) {
    displayRecipe(recipeArray);
    return;
  }
  const filteredRecipes = recipeArray.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm)
  );
  displayRecipe(filteredRecipes);
});
function createIngredientInput(value = "", amount = "") {
  const div = document.createElement("div");
  div.classList.add("ingredient-entry");
  div.innerHTML = `
             <input type="text" class="ingredient-input" placeholder="Ingredient Name" value="${value}" required>
             <input type="text" class="ingredient-amount" placeholder="Amount" value="${amount}" required>
           `;
  return div;
}

const ingredientContainer = document.getElementById("ingredient-container");
for (let i = 0; i < 4; i++) {
  ingredientContainer.appendChild(createIngredientInput());
}

document
  .getElementById("add-ingredient")
  .addEventListener("click", function () {
    ingredientContainer.appendChild(createIngredientInput());
  });

document
  .getElementById("recipe-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const picture = document.getElementById("picture").value;
    const ingredientInputs = document.querySelectorAll(".ingredient-input");
    const ingredientAmounts = document.querySelectorAll(".ingredient-amount");

    if (ingredientInputs.length < 5) {
      alert("Please add at least 5 ingredients.");
      return;
    }

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
    recipeArray.push(newRecipe);
    displayRecipe(recipeArray);
    document.getElementById("recipe-form").reset();

    ingredientContainer.innerHTML = "";
    ingredientContainer.appendChild(createIngredientInput());
  });
