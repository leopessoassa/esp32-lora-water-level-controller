"use client";

import { useState } from "react";
import { Checkbox, Table as MTable } from "@mantine/core";
import TableActions from "./table-actions";
import { UseMutationResult } from "@tanstack/react-query";
import { boolean } from "zod";

interface IAttributesProps {
  label: string;
  attribute: string;
}

interface IProps<T = any> {
  data?: T[];
  attributes?: Array<IAttributesProps>;
  onDelete?:  UseMutationResult<any, Error, any, unknown>;
}

export default function Table({
  data,
  attributes,
  onDelete
}: IProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  
  function getValueAttribute(el:any, attribute: string){
    var attr = attribute.split('.');
    var obj: any = el[attr[0] as string];
        
    for (let i = 1; i < attr.length; i++){
      obj = obj[attr[i] as string];
    }
    
    return typeof obj === "boolean" ? (obj ? 'Sim': 'Não') : obj;
  }

  return (
    <MTable.ScrollContainer minWidth={500}>
      <MTable striped highlightOnHover horizontalSpacing="md">
        <MTable.Thead>
          <MTable.Tr>
            <MTable.Th>#</MTable.Th>
            {attributes?.map((attr, index) => <MTable.Th key={`theader-${index}`}>{attr.label}</MTable.Th>)}
            <MTable.Th>Ações</MTable.Th>
          </MTable.Tr>
        </MTable.Thead>
        <MTable.Tbody>
          {data?.map((el) => (
            <MTable.Tr
              key={`tbody-tr-${el.id}`}
              bg={
                selectedRows.includes(el.id)
                  ? "var(--mantine-color-blue-light)"
                  : undefined
              }
            >
              <MTable.Td key={`tbody-td-select-item`}>
                <Checkbox
                  aria-label="Selecione o item"
                  checked={selectedRows.includes(el.id)}
                  onChange={(event) =>
                    setSelectedRows(
                      event.currentTarget.checked
                        ? [...selectedRows, el.id]
                        : selectedRows.filter((id) => id !== el.id)
                    )
                  }
                />
              </MTable.Td>
              {attributes?.map((attr, index) => <MTable.Td key={`tbody-td-${el.id}-${index}`}>{getValueAttribute(el, attr.attribute)}</MTable.Td>)}
              <MTable.Td>
                <TableActions id={el.id} onDelete={onDelete} />
              </MTable.Td>
            </MTable.Tr>
          ))}

          {!data ||
            (data.length === 0 && (
              <MTable.Tr>
                <MTable.Td colSpan={4} className="text-center">
                  Dados não encontrado
                </MTable.Td>
              </MTable.Tr>
            ))}
        </MTable.Tbody>
      </MTable>
    </MTable.ScrollContainer>
  );
}
