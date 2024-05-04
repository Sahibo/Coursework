interface Props {
  params: { id: string };
}

export default function Product({ params }: Props) {
  const { id } = params;
  return (
    <div>
      Hello
      <div>{id}</div>
      world
    </div>
  );
}
