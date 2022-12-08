// @ts-nocheck
import React from "react";
import RecipeCard from "./RecipeCard";

type RecipesListProps = {
  error: {},
  isLoaded: boolean,
  items: [];
};

class RecipesList extends React.Component {

  apiUrl: string = `https://getrecipesfunc.azurewebsites.net/api/GetRecipesFunc?code=${process.env.REACT_APP_API_KEY}`;

  constructor(props: RecipesListProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch(this.apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return (
        <>
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error.message}
          </div>
        </>
      );
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {items.map((item: { id }) => (
            <RecipeCard key={item.id} id={item.id} name={item.name} description={item.description} />
          ))}
        </div>
      );
    }
  }
}

export default RecipesList;