const RecipeViewStepItem = ({ content }: { content: string }) => {
    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Etap</div>
                    {content}
                </div>
                {/* <span className="badge bg-primary rounded-pill">14</span> */}
            </li>
        </>
    );
}

export default RecipeViewStepItem;