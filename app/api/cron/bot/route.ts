export async function GET() {
  await fetch('http://wabaskin.com');
  return Response.json({ message: 'website fetched' });
}
