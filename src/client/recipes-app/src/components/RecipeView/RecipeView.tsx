// @ts-nocheck
import React from "react";
import RecipeModel from "../../models/RecipeModel";
import RecipeViewStepItem from "./RecipeViewStepItem";
import RecipeViewIngredientItem from "./RecipeViewIngredientItem";

class RecipeView extends React.Component {

    recipeId: string | null = null;
    apiUrl: string = `https://getrecipesfunc.azurewebsites.net/api/GetRecipesFunc?code=${process.env.REACT_APP_API_KEY}`;

    constructor(props: any) {
        super(props);
        this.extractRecipeId();

        this.state = {
            error: null,
            isLoaded: false,
            item: null
        };
    }

    extractRecipeId() {
        let result = window.location.pathname.match("([^/]*)$");

        if (result != null && result[0] != null) {
            this.recipeId = result[0];
        }
        else {
            console.error("Cannot read recipe ID");
        }

        console.log("Recipe ID", this.recipeId);
    }

    componentDidMount(): void {
        fetch(this.apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    let desiredRecipe = this.extractReceiptFromSource(result, this.recipeId);
                    if (desiredRecipe != null) {
                        this.setState({
                            isLoaded: true,
                            item: desiredRecipe
                        });
                    }
                    else {
                        this.setState({
                            isLoaded: true,
                            error: { message: "Cannot find recipe with given ID" }
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    extractReceiptFromSource(items: Array<RecipeModel>, recipeId: string | null): RecipeModel | null {
        if (this.recipeId == null) {
            return null;
        }

        for (var recipe of items) {
            console.log(recipe);
            if (recipe.id == recipeId) {
                return recipe;
            }
        }

        return null;
    }

    render() {

        const { error, isLoaded, item } = this.state;

        if (error) {
            return (
                <>
                    <div className="alert alert-danger" role="alert">
                        <strong>Error:</strong> {error.message}
                    </div>
                </>
            );
        }
        else if (!isLoaded) {
            return <div>Loading...</div>
        }
        else {
            return (
                <>
                    <h1 className="display-6">{item.name}</h1>
                    <p className="lead">{item.description}</p>

                    <div style={{ display: "block", height: "3em" }}></div>

                    <p className="lead">Ingredients</p>
                    <ul className="list-group list-group-flush">
                        {item.ingredients.map((ingredient) => (
                            <RecipeViewIngredientItem
                                key={ingredient.name}
                                name={ingredient.name}
                                quantity={ingredient.value}>
                            </RecipeViewIngredientItem>
                        ))}
                    </ul>

                    <div style={{ display: "block", height: "3em" }}></div>

                    <p className="lead">Steps</p>
                    <ol className="list-group list-group-numbered">
                        {item.steps.map((step) => (
                            <RecipeViewStepItem key={step} content={step}></RecipeViewStepItem>
                        ))}
                    </ol>
                </>
            );
        }

    }
}
export default RecipeView;