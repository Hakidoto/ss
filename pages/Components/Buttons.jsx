import { Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { EditIcon } from "../Icons/EditIcon";
import { EyeIcon } from "../Icons/EyeIcon";
import { IconButton } from "../Icons/IconButton";
import Link from "next/link";

export const Buttons = ({ mas = true, eliminar=true, callModalVer = true, callModalEditar = true, idModaltoCallVer = '', idModaltoCallEditar = '', routeVer = '', routeEditar = '' }) => {

    const handleConfirm = () => {
        const res = confirm("Confirmar");
    }

    return (
        <div className="container-buttons d-flex gap-2 justify-content-center">
            {
                mas && (
                    callModalVer ? (
                        <Tooltip content="Ver">
                            <IconButton
                                data-bs-toggle="modal"
                                data-bs-target={`#${idModaltoCallVer}`}
                            >
                                <EyeIcon size={20} fill="#979797" />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip content="Ver">
                            <Link href={`${routeVer}`}>
                                <IconButton>
                                    <EyeIcon size={20} fill="#979797" />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    )
                )

            }
            {
                callModalEditar ? (
                    <Tooltip content="Editar">
                        <IconButton
                            data-bs-toggle="modal"
                            data-bs-target={`#${idModaltoCallEditar}`}
                        >
                            <EditIcon size={20} fill="#979797" />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip content="Editar">
                        <Link href={`${routeEditar}`}>
                            <IconButton>
                                <EditIcon size={20} fill="#979797" />
                            </IconButton>
                        </Link>
                    </Tooltip>
                )
            }
            {
                eliminar && (
                    <Tooltip content="Eliminar" color="error">
                        <IconButton onClick={handleConfirm} >
                            <DeleteIcon size={20} fill="#FF0080" />
                        </IconButton>
                    </Tooltip>
                )
            }
        </div>
    );
};