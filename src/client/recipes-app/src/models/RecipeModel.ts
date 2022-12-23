import IngredientModel from "./IngredientModel";

type RecipeModel = {
    id: string,
    name: string,
    description: string,
    steps: Array<string>,
    ingredients: Array<IngredientModel>,
    imageUrl: string
}

export default RecipeModel;