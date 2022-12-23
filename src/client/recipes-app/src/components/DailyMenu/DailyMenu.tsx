// @ts-nocheck
import React from "react";
import DailyMenuModel from "../../models/DailyMenuModel"
import { NavLink } from 'react-router-dom';
import Loader from "../Loader/Loader";
import PageTitle from "../PageTitle/PageTitle";

type DailyMenuProps = {
    error: {},
    isLoaded: boolean,
    items: DailyMenuModel[];
};

class DailyMenu extends React.Component {

    apiUrl: string = `https://getdailymenufunc.azurewebsites.net/api/GetDailyMenuFunc?code=${process.env.REACT_APP_API_KEY_GetDailyMenuFunc}`;

    constructor(props: DailyMenuProps) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: null
        };
    }

    componentDidMount() {
        fetch(this.apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    const analyzedItems = this.analyzeCurrentWeek(result);
                    this.setState({
                        isLoaded: true,
                        items: analyzedItems
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

    analyzeCurrentWeek(srvDays: DailyMenuModel[]): DailyMenuModel[] {
        const now = new Date();

        const firstDayOfWeek = new Date();
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() - now.getDay() + 1);

        const lastDayOfWeek = new Date();
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + (7 - now.getDay()));

        const currentWeek: DailyMenuModel[] = [];

        for (let day = firstDayOfWeek; day <= lastDayOfWeek; day.setDate(day.getDate() + 1)) {
            const dailyMenuModel: DailyMenuModel = {
                id: Math.random(),
                day: day.getDate(),
                month: day.getMonth() + 1,
                year: day.getFullYear(),
            };

            let providedMenuForDay = srvDays.find(i =>
                i.day === dailyMenuModel.day
                && i.month === dailyMenuModel.month
                && i.year === dailyMenuModel.year);

            if (providedMenuForDay != null) {
                dailyMenuModel.recipeId = providedMenuForDay.recipeId;
                dailyMenuModel.name = providedMenuForDay.name;
            }

            currentWeek.push(dailyMenuModel);
        }

        return currentWeek;
    }

    formatDate = (day: number, month: number, year: number): string => `${day}.${month}`;

    getDayName = (day: number, month: number, year: number, locale: string) => (new Date(year, month - 1, day)).toLocaleDateString(locale, { weekday: 'long' });

    render() {
        const { error, isLoaded, items }: { error: {}, isLoaded: boolean, items: DailyMenuModel[] } = this.state;

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
            return <Loader></Loader>;
        }
        else {
            return (
                <>
                    <PageTitle pageName="Daily menu"></PageTitle>
                    <h1 className="display-6">Daily menu</h1>
                    <div style={{ display: "block", height: "3em" }}></div>

                    <table className="table">
                        <thead>
                            <tr key="hdr_tbl">
                                <th scope="col">Date</th>
                                <th scope="col">Meal</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item: { id }) => (
                                <tr key={item.id}>
                                    <th scope="row">
                                        <figure>
                                            <blockquote className="blockquote">
                                                <p>{this.getDayName(item.day, item.month, item.year, "en-US")}</p>
                                            </blockquote>
                                            <figcaption className="blockquote-footer">
                                                {this.formatDate(item.day, item.month, item.year)}
                                            </figcaption>
                                        </figure>
                                    </th>
                                    {item.name != null
                                        ? <td>{item.name}</td>
                                        : <td>N/A</td>
                                    }
                                    {item.recipeId != null
                                        ? <td><NavLink to={`/recipe/${item.recipeId}`} className="btn btn-primary">View recipe</NavLink></td>
                                        : <td></td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            );
        }
    }
}
export default DailyMenu;