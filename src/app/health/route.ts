export const dynamic = 'force-static';

// Static frontend availability, not a backend/service health claim.
export function GET() {
  return Response.json({ status: 'ok', site: 'Tubely' });
}
