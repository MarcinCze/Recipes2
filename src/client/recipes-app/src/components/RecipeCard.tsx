// @ts-nocheck
import React from "react";
import { NavLink } from 'react-router-dom';
import { isTemplateExpression } from "typescript";

type RecipeItem = {
    id: string,
    name: string,
    description: string
};

class RecipeCard extends React.Component<RecipeItem> {

    constructor(props: RecipeItem) {
        super(props);
    }

    render() {
        return (
            <>
                <div className="col">
                    <div className="card">
                        <img src="https://dummyimage.com/400x200/cacaca/fff.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{this.props.name}</h5>
                            <p className="card-text">{this.props.description}</p>
                            <NavLink to={`/recipe/${this.props.id}`} className="btn btn-primary stretched-link">View recipe</NavLink>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default RecipeCard;