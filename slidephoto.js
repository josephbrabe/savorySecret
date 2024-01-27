let currentRecipe = 0;

        function showRecipeInfo(index) {
            const recipeContainers = document.querySelectorAll('.recipe-container');
            const currentContainer = recipeContainers[index];
            const recipeInfo = currentContainer.querySelector('.recipe-info');
            recipeInfo.style.opacity = 1;
            recipeInfo.style.transform = "rotateY(0deg)";
        }

        function hideRecipeInfo(index) {
            const recipeContainers = document.querySelectorAll('.recipe-container');
            const currentContainer = recipeContainers[index];
            const recipeInfo = currentContainer.querySelector('.recipe-info');
            recipeInfo.style.opacity = 0;
            recipeInfo.style.transform = "rotateY(180deg)";
        }

        function nextRecipe() {
            hideRecipeInfo(currentRecipe); // Hide the current recipe info

            const recipeContainers = document.querySelectorAll('.recipe-container');
            currentRecipe = (currentRecipe + 1) % recipeContainers.length;
            const transformValue = `translateX(-${currentRecipe * 100}%) rotateY(0deg)`;

            recipeContainers.forEach(container => container.style.transform = transformValue);

            // Show the new recipe info
            showRecipeInfo(currentRecipe);
        }