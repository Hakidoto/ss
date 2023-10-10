import { LockIcon } from "@/app/components/icons/LockIcon";
import { MailIcon } from "@/app/components/icons/MailIcon";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";

export default function EditarCuestionario() {
  return (
    <>
      <Card >
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">NextUI</p>
            <p className="text-small text-default-500">nextui.org</p>
          </div>
        </CardHeader>
        <CardBody>
          <Input
            autoFocus
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
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
    </>
  );
}
