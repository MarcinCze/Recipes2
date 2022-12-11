const RecipeViewIngredientItem = ({ name, quantity }: { name: string, quantity: string }) => {
    return (
        <>
            <li className="list-group-item">{name} | {quantity}</li>
        </>
    );
}

export default RecipeViewIngredientItem;