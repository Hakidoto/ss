import MultiSelect from "./MultiSelect";

export const RolesForm = () => {
  const defaultRoles = [
    { value: "administrador", label: "Administrador" },
    { value: "recursosHumanos", label: "Recursos Humanos" },
    { value: "usuario", label: "Usuario" },
  ];

  const defaultPermisos = [
    { value: "Crear usuarios", label: "Crear usuarios" },
    { value: "Eliminar usuarios", label: "Eliminar usuarios" },
    { value: "Crear roles", label: "Crear roles" },
    { value: "Eliminar roles", label: "Eliminar roles" },
  ];

  const optionsRoles = [
    { value: "administrador", label: "Administrador" },
    { value: "recursosHumanos", label: "Recursos Humanos" },
    { value: "usuario", label: "Usuario" },
    { value: "Rol 1", label: "Rol 1" },
    { value: "Rol 2", label: "Rol 2" },
    { value: "Rol 3", label: "Rol 3" },
    { value: "Rol 4", label: "Rol 4" },
    { value: "Rol 5", label: "Rol 5" },
  ];

  const optionsPermisos = [
    { value: "Crear usuarios", label: "Crear usuarios" },
    { value: "Eliminar usuarios", label: "Eliminar usuarios" },
    { value: "Crear roles", label: "Crear roles" },
    { value: "Eliminar roles", label: "Eliminar roles" },
    { value: "Permiso 1", label: "Permiso 1" },
    { value: "Permiso 2", label: "Permiso 2" },
    { value: "Permiso 3", label: "Permiso 3" },
    { value: "Permiso 4", label: "Permiso 4" },
    { value: "Permiso 5", label: "Permiso 5" },
  ];

  return (
    <div className="d-flex gap-5">
      <div>
        <label>Roles</label>
        <MultiSelect options={optionsRoles} defaultValue={defaultRoles} />
      </div>
      <div>
        <label>Permisos</label>
        <MultiSelect options={optionsPermisos} defaultValue={defaultPermisos} />
      </div>
    </div>
  );
};
