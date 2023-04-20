import {
  Input,
  Dropdown,
  Card,
  Text,
  Spacer,
  Container,
  Radio,
  Button,
  Textarea,
} from "@nextui-org/react";
import React from "react";

export default function CrearCuestionario() {
  const DropdownItems = [
    { key: "Opcion_multiple", name: "Opcion multiple" },
    { key: "Casilla_de_verificacion", name: "Casilla de verificacion" },
    { key: "Respuesta_corta", name: "Respuesta corta" },
  ];

  const [selected, setSelected] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  return (
    <>
      <div className="container">
        <div className="card col-md-6 offset-md-3 card-quiz">
          <div className="row">
            <div className="col-md-6">
              <Input
                className="textbox-input"
                size="md"
                css={{
                  minWidth: "300px",
                }}
                placeholder="Pregunta sin titulo"
              ></Input>
            </div>
            <div className="col-md-6 d-flex justify-content-end ">
              <Dropdown>
                <Dropdown.Button className="dropdown-input" flat>
                  {" "}
                  {selectedValue}{" "}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Dynamic Actions"
                  items={DropdownItems}
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selected}
                  onSelectionChange={setSelected}
                >
                  {(item) => (
                    <Dropdown.Item
                      key={item.key}
                      color={item.key === "delete" ? "error" : "default"}
                    >
                      {item.name}
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="row">
            <div>
              <Radio.Group
                css={{
                  margin: "2vh",
                }}
                label="Opciones"
                defaultValue="A"
              >
                <Radio value="A">
                  <Input placeholder="Opcion A" />
                </Radio>
                <Radio value="B">
                  <Input placeholder="Opcion B" />
                </Radio>
                <Radio value="C">
                  <Input placeholder="Opcion C" />
                </Radio>
                <Radio value="D">
                  <Input placeholder="Opcion D" />
                </Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="card col-md-6 offset-md-3 card-quiz">
          <div className="row">
            <div className="col-md-6">
              <Input
                className="textbox-input"
                size="md"
                css={{
                  minWidth: "300px",
                }}
                placeholder="Pregunta sin titulo"
              ></Input>
            </div>
            <div className="col-md-6 d-flex justify-content-end ">
              <Dropdown>
                <Dropdown.Button className="dropdown-input" flat>
                  {" "}
                  {selectedValue}{" "}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Dynamic Actions"
                  items={DropdownItems}
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selected}
                  onSelectionChange={setSelected}
                >
                  {(item) => (
                    <Dropdown.Item
                      key={item.key}
                      color={item.key === "delete" ? "error" : "default"}
                    >
                      {item.name}
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="row">
            <div>
              <Radio.Group
                css={{
                  margin: "2vh",
                }}
                label="Opciones"
                defaultValue="A"
              >
                <Radio value="A">
                  <Input placeholder="Opcion A" />
                </Radio>
                <Radio value="B">
                  <Input placeholder="Opcion B" />
                </Radio>
                <Radio value="C">
                  <Input placeholder="Opcion C" />
                </Radio>
                <Radio value="D">
                  <Input placeholder="Opcion D" />
                </Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="card col-md-6 offset-md-3 card-quiz">
          <div className="row">
            <div className="col-md-6">
              <Input
                className="textbox-input"
                size="md"
                css={{
                  minWidth: "300px",
                }}
                placeholder="Pregunta sin titulo"
              ></Input>
            </div>
            <div className="col-md-6 d-flex justify-content-end ">
              <Dropdown>
                <Dropdown.Button className="dropdown-input" flat>
                  {" "}
                  {selectedValue}{" "}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Dynamic Actions"
                  items={DropdownItems}
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selected}
                  onSelectionChange={setSelected}
                >
                  {(item) => (
                    <Dropdown.Item
                      key={item.key}
                      color={item.key === "delete" ? "error" : "default"}
                    >
                      {item.name}
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="row">
            <div>
              <Radio.Group
                css={{
                  margin: "2vh",
                }}
                label="Opciones"
                defaultValue="A"
              >
                <Radio value="A">
                  <Input placeholder="Opcion A" />
                </Radio>
                <Radio value="B">
                  <Input placeholder="Opcion B" />
                </Radio>
                <Radio value="C">
                  <Input placeholder="Opcion C" />
                </Radio>
                <Radio value="D">
                  <Input placeholder="Opcion D" />
                </Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
