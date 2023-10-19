import { selectorEstatus } from "@/app/components/example/data";
import { LockIcon } from "@/app/components/icons/LockIcon";
import { MailIcon } from "@/app/components/icons/MailIcon";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Link,
  Select,
  SelectItem,
} from "@nextui-org/react";

export default function CardPregunta() {
  return (
    <>
      <div class="flex items-center justify-center">
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-5/6"
        >
          <CardHeader className=" ml-3">
              <div className="flex flex-row justify-between">
                <Input
                  className="max-w-lg"
                  label="Pregunta"
                  placeholder="Ingresa el nombre de la pregunta"
                />
                <Select
                  label="Tipo de pregunta"
                  placeholder="Selecciona un tipo de pregunta"
                  className="max-w-xs ml-4"
                >
                  {selectorEstatus.map((estatus) => (
                    <SelectItem key={estatus.value} value={estatus.value}>
                      {estatus.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
          </CardHeader>
          <CardBody>
            <Input
              autoFocus
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
            />
            <Input
              endContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Password"
              placeholder="Enter your password"
              type="password"
              variant="bordered"
            />
            <div className="flex py-2 px-1 justify-between">
              <Checkbox
                classNames={{
                  label: "text-small",
                }}
              >
                Remember me
              </Checkbox>
              <Link color="primary" href="#" size="sm">
                Forgot password?
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
