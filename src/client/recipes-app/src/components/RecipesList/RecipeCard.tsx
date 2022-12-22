import React from "react";
import { NavLink } from 'react-router-dom';

type RecipeItem = {
    id: string,
    name: string,
    imageUrl: string,
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
                        {/* <img src="https://dummyimage.com/400x200/cacaca/fff.jpg" className="card-img-top" /> */}
                        {this.props.imageUrl != null
                            ? <img style={{maxHeight:"300px"}} src={this.props.imageUrl} className="card-img-top" />
                            : <img style={{maxHeight:"300px"}} src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg" className="card-img-top" />
                        }
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