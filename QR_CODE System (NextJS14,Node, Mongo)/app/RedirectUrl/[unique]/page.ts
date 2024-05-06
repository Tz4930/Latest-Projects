interface Params {
  unique: string;
}

export default async function RedirectPage({ params }: { params: Params }) {
  const { unique } = params;
console.log("Url",unique)

  return null;
}
