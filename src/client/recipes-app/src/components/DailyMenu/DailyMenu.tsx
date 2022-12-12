// @ts-nocheck
import React from "react";

type DailyMenuProps = {
    error: {},
    isLoaded: boolean,
    items: [];
};

class DailyMenu extends React.Component {

    apiUrl: string = `https://getdailymenufunc.azurewebsites.net/api/GetDailyMenuFunc?code=${process.env.REACT_APP_API_KEY_GetDailyMenuFunc}`;

    constructor(props: DailyMenuProps) {
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
        }
        else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            return (
                <>
                    <h1 className="display-6">Daily menu</h1>
                    <div style={{ display: "block", height: "3em" }}></div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Meal</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Monday, 12.12</th>
                                <td>Strogonow</td>
                                <td><a className="btn btn-primary" href="#" role="button">Zobacz przepis</a></td>
                            </tr>
                            <tr>
                                <th scope="row">Tuesday, 13.12</th>
                                <td>Strogonow</td>
                                <td><a className="btn btn-primary" href="#" role="button">Zobacz przepis</a></td>
                            </tr>
                            <tr>
                                <th scope="row">Wednesday, 14.12</th>
                                <td>Strogonow</td>
                                <td><a className="btn btn-primary" href="#" role="button">Zobacz przepis</a></td>
                            </tr>
                            <tr>
                                <th scope="row">Thursday, 15.12</th>
                                <td>Strogonow</td>
                                <td><a className="btn btn-primary" href="#" role="button">Zobacz przepis</a></td>
                            </tr>
                            <tr>
                                <th scope="row">Friday, 16.12</th>
                                <td>Strogonow</td>
                                <td><a className="btn btn-primary" href="#" role="button">Zobacz przepis</a></td>
                            </tr>
                            <tr>
                                <th scope="row">Saturday, 17.12</th>
                                <td>Strogonow</td>
                                <td><a className="btn btn-primary" href="#" role="button">Zobacz przepis</a></td>
                            </tr>
                            <tr>
                                <th scope="row">Sunday, 17.12</th>
                                <td>Strogonow</td>
                                <td><a className="btn btn-primary" href="#" role="button">Zobacz przepis</a></td>
                            </tr>
                        </tbody>
                    </table>
                </>
            );
        }
    }
}
export default DailyMenu;