
export const AddJobForm = () => {
    return (
        <div className="d-flex flex-column  flex-nowrap gap-3">
            <div>
                <p>Nombre del empleo anterior</p>
                <input className="form-control"></input>
            </div>
            <div>
                <p>Permanencia</p>
                <input className="form-control"></input>
            </div>
            <div>
                <p>Jefe anterior</p>
                <input type="text" className="form-control"></input>
            </div>
            <div>
                <p>Número</p>
                <input type="text" className="form-control"></input>
            </div>
        </div>
    )
}