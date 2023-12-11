import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Divider,
  Progress,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { EditIcon } from "@/app/components/icons/EditIcon";
import { CheckIcon } from "@/app/components/icons/CheckIcon";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/app/components/icons/SearchIcon";
import { PlusIcon } from "@/app/components/icons/PlusIcon";

export const PanelUsuario = () => {
  const [users, setUsers] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [editPasswordId, setEditPasswordId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const usersPerPage = 5;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const fetchedUsers = await res.json();
          setUsers(fetchedUsers);
          setLoading(false); // Cambiar el estado a falso cuando se hayan cargado los datos
        } else {
          console.error("Error fetching users:", res.statusText);
          setLoading(false); // En caso de error también cambiar el estado
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false); // Manejar errores y cambiar el estado
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    // Mostrar un indicador de carga mientras se están cargando los datos
    return (
      <div  style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh", // Ajusta la altura según tus necesidades
      }}>
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="max-w-md"
        />
      </div>
    );
  }
  const router = useRouter();

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  let usersToShow = users;

  if (filterValue) {
    usersToShow = users.filter((user) =>
      user.username.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  const totalUsers = usersToShow.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  if (currentPage > totalPages && totalPages !== 0) {
    setCurrentPage(totalPages);
  }

  const currentUsers = usersToShow.slice(indexOfFirstUser, indexOfLastUser);

  const handleEditPassword = (userId) => {
    setEditPasswordId(userId);
    setNewPassword("");
  };

  const handleSavePassword = async (userId) => {
    try {
      if (!newPassword.trim()) {
        toast.error("La contraseña no puede estar vacía");
        return;
      }

      const res = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      if (res.ok) {
        setEditPasswordId(null);
        toast.success("Contraseña actualizada con éxito");
      } else {
        console.error("Error updating password:", res.statusText);
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleCreateUser = () => {
    // Lógica para dar de alta usuario
    router.push("/admi/panelusuarios/signup");
    console.log("Dar de alta usuario");
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="w-4/5">
            <Input
              startContent={<SearchIcon />}
              type="text"
              radius="lg"
              placeholder="Filtrar por nombre de usuario"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="mb-4 w-full"
            />
          </div>
          <Button
            auto
            size="lg"
            color="primary"
            radius="lg"
            endContent={<PlusIcon />}
            className="w-30 mb-4"
            onClick={handleCreateUser}
          >
            Dar de Alta
          </Button>
        </div>
      </div>

      <Table bordered>
        <TableHeader>
          <TableColumn align="center">ID</TableColumn>
          <TableColumn>USUARIO</TableColumn>
          <TableColumn>CORREO</TableColumn>
          <TableColumn style={{ width: "200px" }}>CONTRASEÑA</TableColumn>
          <TableColumn style={{ width: "250px" }}>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.correo}</TableCell>
              <TableCell style={{ verticalAlign: "middle" }}>
                {editPasswordId === user.id ? (
                  <Input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    size={"sm"}
                  />
                ) : (
                  "••••••••••••••••••"
                )}
              </TableCell>
              <TableCell style={{ minWidth: "150px" }}>
                {editPasswordId === user.id ? (
                  <div style={{ display: "flex", gap: "5px" }}>
                    <Button
                      color="success"
                      isIconOnly
                      style={{ width: "30px", height: "30px" }}
                      onClick={() => handleSavePassword(user.id)}
                    >
                      <CheckIcon />
                    </Button>
                    <Button
                      color="danger"
                      isIconOnly
                      style={{ width: "30px", height: "30px" }}
                      onClick={() => setEditPasswordId(null)}
                    >
                      x
                    </Button>
                  </div>
                ) : (
                  <Tooltip content="Cambiar contraseña">
                    <Button
                      color="primary"
                      aria-label="Editar contraseña"
                      isIconOnly
                      radius="lg"
                      onClick={() => handleEditPassword(user.id)}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex w-full justify-center">
        <Pagination
          showControls
          className="mt-3"
          color="primary"
          page={currentPage}
          total={totalPages}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};
