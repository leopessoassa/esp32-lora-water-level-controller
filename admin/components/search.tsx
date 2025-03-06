import { Loader, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { useState } from "react";

interface IProps {
  onSearch: (params: string) => Promise<any>;
}

export default function Search({ onSearch }: IProps) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = useDebouncedCallback(async (query: string) => {
    setLoading(true);
    onSearch(query).then(() => setLoading(false));
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    handleSearch(event.currentTarget.value);
  };

  return (
    <>
      <TextInput
        value={search}
        onChange={handleChange}
        placeholder="Busca..."
        rightSection={loading && <Loader size={20} />}
      />
    </>
  );
}
