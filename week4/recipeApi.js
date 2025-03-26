let recipeArray = [];

function fetchRecipes() {
  fetch(
    "https://raw.githubusercontent.com/sumankaundinya/sumankaundinya.github.io/main/recipes.json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      recipeArray = data; 
      console.log(recipeArray); 
      displayRecipe(recipeArray); 
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

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
                                                <ul class="ingredient-list"></ul>
                                        `;

    const ingredientList = recipeCard.querySelector(".ingredient-list");
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const li = document.createElement("li");
      li.innerText = `${recipe.ingredients[i].NAME}: ${recipe.ingredients[i].AMOUNT}, Price: ${recipe.ingredients[i].PRICE}`;
      ingredientList.appendChild(li);
    }

    container.appendChild(recipeCard);
  });
}

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

document
  .getElementById("search-ingredient")
  .addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    if (!searchTerm) {
      displayRecipe(recipeArray);
      return;
    }
    const filteredRecipes = recipeArray.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.NAME.toLowerCase().includes(searchTerm)
      )
    );
    displayRecipe(filteredRecipes);
  });

function createIngredientInput(value = "", amount = "", price = "") {
  const div = document.createElement("div");
  div.classList.add("ingredient-entry");
  div.innerHTML = `
        <input type="text" class="ingredient-input" placeholder="Ing.Name" value="${value}" required>
        <input type="text" class="ingredient-amount" placeholder="Amount" value="${amount}" required>
        <input type="text" class="ingredient-price" placeholder="Price" value="${price}" required>
    `;
  return div;
}

const ingredientContainer = document.getElementById("ingredient-container");
for (let i = 0; i < 5; i++) {
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

const timerInput = document.getElementById("timerInput");
const startButton = document.getElementById("startTimer");
const timerDisplay = document.getElementById("timerDisplay");
timerInput.addEventListener("focus", () => {
  if (timerInput.value === "") {
    timerInput.placeholder = "";
  }
});

const alertSound = new Audio("beep.wav");

let countdown;

startButton.addEventListener("click", function () {
  let timeLeft = parseInt(timerInput.value, 10);
  if (isNaN(timeLeft) || timeLeft <= 0) {
    alert("Please enter a valid number of seconds.");
    return;
  }

  clearInterval(countdown);
  timerDisplay.textContent = `Time left: ${timeLeft} seconds`;

  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      timerDisplay.textContent = "Time's up!";

      alertSound.play();

      setTimeout(() => {
        alert("Time's up!");
      }, 100);
    }
  }, 1000);
});

const timeSpentDisplay = document.createElement("p");
document.body.appendChild(timeSpentDisplay);

let timeSpent = 0;

function updateTimeSpent() {
  timeSpent++;
  timeSpentDisplay.textContent = `Time spent on this page: ${timeSpent} seconds`;
}

setInterval(updateTimeSpent, 1000);

// Fetch and display recipes on page load
fetchRecipes();
