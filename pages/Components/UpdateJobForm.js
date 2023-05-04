export const UpdateJobForm = () => {
  return (
    <div className="d-flex flex-column  flex-nowrap gap-3">
      <div>
        <p>Nombre del empleo anterior</p>
        <input className="form-control" defaultValue="Taquero"></input>
      </div>
      <div>
        <p>Permanencia</p>
        <input className="form-control" defaultValue="2 años"></input>
      </div>
      <div>
        <p>Jefe anterior</p>
        <input
          type="text"
          className="form-control"
          defaultValue="Luis Sanchez"
        ></input>
      </div>
      <div>
        <p>Número</p>
        <input
          type="text"
          className="form-control"
          placeholder="0"
          defaultValue="9821232343"
        ></input>
      </div>
    </div>
  );
};
