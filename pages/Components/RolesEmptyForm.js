import MultiSelect from "./MultiSelect";

export const RolesEmptyForm = () => {
  const optionsUsr = [
    { value: "Juan Perez", label: "Juan Perez" },
    { value: "Maria Durán", label: "Maria Durán" },
    { value: "Juan Pancracio", label: "Juan Pancracio" },
  ];

  const optionsPermisos = [
    { value: "Crear usuarios", label: "Crear usuarios" },
    { value: "Eliminar usuarios", label: "Eliminar usuarios" },
    { value: "Crear roles", label: "Crear roles" },
    { value: "Permiso 1", label: "Permiso 1" },
    { value: "Permiso 2", label: "Permiso 2" },
    { value: "Permiso 3", label: "Permiso 3" },
    { value: "Permiso 4", label: "Permiso 4" },
    { value: "Permiso 5", label: "Permiso 5" },
  ];

  return (
    <div>
      <div>
        <p>Nombre del rol</p>
        <input className="form-control"></input>
      </div>
      <div>
        <p>Descripción</p>
        <input className="form-control"></input>
      </div>
      <div className="d-flex  gap-5">
        <div style={{ flexBasis: "50%" }}>
          <label>Permisos</label>
          <MultiSelect options={optionsPermisos} />
        </div>
        <div style={{ flexBasis: "50%" }}>
          <label>Usuarios</label>
          <MultiSelect options={optionsUsr} />
        </div>
      </div>
    </div>
  );
};
