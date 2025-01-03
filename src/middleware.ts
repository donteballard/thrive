import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the wallet address from cookies
  const walletAddress = request.cookies.get('wallet_address');

  // Check if the path starts with /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // If no wallet address is found or it's invalid, redirect to home page
    if (!walletAddress?.value || typeof walletAddress.value !== 'string') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: '/dashboard/:path*',
}; 