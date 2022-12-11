import React from "react";

class DailyMenu extends React.Component {
    render() {
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
export default DailyMenu;