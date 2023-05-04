import MultiSelect from "@/pages/Components/MultiSelect";
import { Container } from "@nextui-org/react";
import { useState } from "react";
import { TableAsignacion } from "@/pages/Components/TableAsignacion";
import { TableRoles } from "@/pages/Components/TableRoles";

export default function Roles() {
  const [filter, setFilter] = useState("asignacion");

  const opciones = [
    {
      value: "asignacion",
      label: "Asignar roles y permisos",
      componente: <TableAsignacion />,
    },
    { value: "roles", label: "Roles", componente: <TableRoles /> },
  ];

  const handleChangeSelect = (selected) => {
    setFilter(selected);
  };

  return (
    <Container className="p-4">
      <div className="d-flex justify-content-between mb-5 gap-3">
        <div className="w-25">
          <MultiSelect
            isMulti={false}
            defaultValue={opciones.find(
              (opcion) =>
                opcion.value === filter && {
                  value: opcion.value,
                  label: opcion.label,
                },
            )}
            getValue={handleChangeSelect}
            options={opciones.map((opcion) => ({
              value: opcion.value,
              label: opcion.label,
            }))}
          />
        </div>
        {filter === "asignacion" && (
          <div>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Busca un usuario"
              aria-label="Buscar"
            />
          </div>
        )}
      </div>
      {opciones.find((opcion) => opcion.value === filter)?.componente}
    </Container>
  );
}
