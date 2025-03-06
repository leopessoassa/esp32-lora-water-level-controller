import React, { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import ViewButton from "./ui/ViewButton";
import EditButton from "./ui/EditButton";
import DeleteButton from "./ui/DeleteButton";
import { UseMutationResult } from "@tanstack/react-query";

interface IProps extends PropsWithChildren {
  id: number;
  hasView?: boolean;
  hasUpdate?: boolean;
  hasDelete?: boolean;
  onDelete?:  UseMutationResult<any, Error, any, unknown>;
}

export default function TableActions({
  id,
  hasView = true,
  hasUpdate = true,
  hasDelete = true,
  onDelete,
  children,
}: IProps) {
  const pathname = usePathname();

  return (
    <>
      {hasView && (
        <ViewButton id={id} />
      )}
      {hasUpdate && (
        <EditButton id={id} />
      )}
      {hasDelete && onDelete && (
        <DeleteButton id={id} onDelete={onDelete} />
      )}
      <div>{children}</div>
    </>
  );
}
