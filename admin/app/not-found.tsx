import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Não encontrada</h2>
      <p>Não foi possível encontrar a página solicitada</p>
      <Link href={"/"} className="text-blue-500">
        Voltar para a Home
      </Link>
    </div>
  );
}
