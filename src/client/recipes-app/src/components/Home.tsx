import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="px-4 pt-5 my-5 text-center border-bottom">
                <h1 className="display-4 fw-bold">Recipes</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Bunch of recipes from different cusines that were tested, are super easy to prepare and are not too expensive.</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                        <NavLink to="/recipes" className="btn btn-primary btn-lg px-4 me-sm-3">Check out!</NavLink>
                    </div>
                </div>
                <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
                    <div className="container px-5">
                        <img src="https://www.wallpapertip.com/wmimgs/77-776716_high-resolution-pizza-background.jpg" className="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy" />
                    </div>
                </div>
            </div>

        </>
    );
}
export default Home;