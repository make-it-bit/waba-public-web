export async function GET() {
  const result = await fetch('http://wabaskin.com');
  const data = await result.json();
  return Response.json({ datetime: data.datetime });
}
