import style from "../../styles/adminModule.module.css";
export const Mymodal = ({ title, sizeModal = "md", children, id = "" }) => {
  return (
    <div
      className={`modal fade`}
      id={id}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className={`modal-dialog modal-${sizeModal} modal-dialog-centered `}>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {title || "Experiencia laboral"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button type="button" className="btn btn-primary">
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
