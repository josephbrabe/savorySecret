document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('recipe');

    console.log('Recipe ID:', recipeId);

    if (recipeId && recipes[recipeId]) {
        const recipe = recipes[recipeId];
        displayRecipe(recipe);
        displayFeedbackSection(recipeId);
    }
});

function displayRecipe(recipe) {
    const recipeContent = document.getElementById('recipe-content');
    if (recipeContent) {
        recipeContent.innerHTML = `
        <section class="section1">
            <header>
                <h1>My Awesome Recipes</h1>
                <p>Delicious homemade recipes for you to enjoy</p>
            </header>
            <h2>${recipe.title}</h2>
        </section>
        <section>
            <div class="image-container">
                <img class="recipe-image" src="${recipe.image}" alt="${recipe.title} Image">
                <img class="recipe-image" src="${recipe.image2}" alt="${recipe.title} Image">
            </div>
        </section>
        <section>
            <div class="recipe-details">
                
                <div class="recipe-section">
                    <h3>Serving:</h3>
                    <p>${recipe.serving}</p>
                    <h3>Cook Time:</h3>
                    <p>${recipe.cookTime}</p>
                </div>
                <div class="recipe-section">
                    <h3>Nutrients:</h3>
                    <ul>
                        <li>Calories: ${recipe.nutrients.calories}</li>
                        <li>Protein: ${recipe.nutrients.protein}</li>
                        <li>Carbs: ${recipe.nutrients.carbs}</li>
                        <li>Fat: ${recipe.nutrients.fat}</li>
                    </ul>
                </div>
            </div>
            <div class="recipe-section">
                    <h3>Ingredients:</h3>
                    <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
                </div>
            <div class="recipe-details">
                <div class="recipe-section2">
                    <h3>Instructions:</h3>
                    <ol>${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}</ol>
                </div>
            </div>
        </section>
        <section>
        <h2>Feedback</h2>
        <div class="feedback-content" id="feedback-section">
            <div class="feedback-container" id="user-feedback">
                <label for="username">Username:</label>
                <input type="text" id="username" placeholder="Enter your username">
                <label for="rating">Rating:</label>
                <div class="star-rating" id="rating">
                    <input type="radio" id="star5" name="rating" value="5" />
                    <label for="star5">&#9733;</label>
                    <input type="radio" id="star4" name="rating" value="4" />
                    <label for="star4">&#9733;</label>
                    <input type="radio" id="star3" name="rating" value="3" />
                    <label for="star3">&#9733;</label>
                    <input type="radio" id="star2" name="rating" value="2" />
                    <label for="star2">&#9733;</label>
                    <input type="radio" id="star1" name="rating" value="1" />
                    <label for="star1">&#9733;</label>
                </div>
                <label for="comment">Comment:</label>
                <textarea id="comment" rows="4" placeholder="Enter your comment"></textarea>
                <button onclick="submitFeedback('${recipe.title}')">Submit Rating</button>
            </div>
            <div class="feedback-container" id="ratings">
                <h3>Recent Ratings and Comments:</h3>
                <ul id="ratings-list"></ul>
            </div>
        </div>
    </section>
        `;
    }
}

function displayFeedbackSection(recipeId) {
    const ratingsList = document.getElementById('ratings-list');
    if (ratingsList) {
        // Fetch and display feedback for the recipe
        const feedbackData = getFeedbackForRecipe(recipeId);
        feedbackData.forEach(feedback => {
            const listItem = document.createElement('li');
            listItem.textContent = `${feedback.username} - Rating: ${feedback.rating}, Comment: ${feedback.comment}`;
            ratingsList.appendChild(listItem);
        });
    }
}

function submitFeedback(recipeTitle) {
    const usernameInput = document.getElementById('username');
    const ratingInput = document.getElementById('rating');
    const commentInput = document.getElementById('comment');

    const username = usernameInput.value.trim() || `Anonymous ${Math.floor(Math.random() * 10000)}`;
    const rating = parseInt(ratingInput.value);
    const comment = commentInput.value.trim();

    // Validate inputs
    if (isNaN(rating) || rating < 1 || rating > 5) {
        alert('Please enter a valid rating between 1 and 5.');
        return;
    }

    // Save feedback
    saveFeedbackForRecipe(recipeTitle, { username, rating, comment });

    // Clear input fields
    usernameInput.value = '';
    ratingInput.value = '';
    commentInput.value = '';

    // Refresh feedback display
    displayFeedbackSection(recipeTitle);
}

function getFeedbackForRecipe(recipeId) {
    // Implement a method to retrieve feedback data for the specified recipeId
    // For simplicity, you can use local storage or any backend service
    // Here's an example using local storage:
    const storedData = localStorage.getItem('recipeFeedback');
    const feedbackData = storedData ? JSON.parse(storedData) : {};
    return feedbackData[recipeId] || [];
}

function saveFeedbackForRecipe(recipeId, feedback) {
    // Implement a method to save feedback data for the specified recipeId
    // For simplicity, you can use local storage or any backend service
    // Here's an example using local storage:
    const storedData = localStorage.getItem('recipeFeedback');
    const feedbackData = storedData ? JSON.parse(storedData) : {};
    if (!feedbackData[recipeId]) {
        feedbackData[recipeId] = [];
    }
    feedbackData[recipeId].push(feedback);
    localStorage.setItem('recipeFeedback', JSON.stringify(feedbackData));
}
