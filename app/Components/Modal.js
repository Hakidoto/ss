import Link from "next/link";
import { useEffect, useState } from "react";

export default function Modal({ modalTitulo }) {
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title" id="staticBackdropLabel">
                {modalTitulo}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <input
                  type="hidden"
                  className="IdCuesHidden"
                  name="IdCuestionario"
                  value=""
                />

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    name="Nombre"
                    id="formInput1"
                    className="form-control"
                  />
                  <label className="form-label" for="formInput1">
                    Nombre
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <select
                    className="form-select"
                    aria-label="Selecciona el area"
                  >
                    <option selected>Selecciona el area</option>
                    <option value="1">Administrativo</option>
                    <option value="2">Foo</option>
                    <option value="3">Bar</option>
                  </select>
                  <label className="form-label" for="formInput2">
                    Area asignada
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="date"
                    id="formInput3"
                    name="FechaLimite"
                    className="form-control"
                    min={new Date().toISOString().slice(0, 10)}
                  />

                  <label className="form-label" for="formInput3">
                    Fecha limite
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary text-white"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <Link href="../CrearCuestionario">
                  <button
                    type="submit"
                    className="btn btn-primary text-white"
                    data-bs-dismiss="modal"
                  >
                    Finalizar
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
