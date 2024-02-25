// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getValidSubdomain } from '@/app/utils/subdomain';
import { getToken } from 'next-auth/jwt';
import * as jose from 'jose'

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: any) {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return;

  // const res = NextResponse.rewrite(url)
  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/` header.
 
  const pattern = /^(\/login|\/plan|\/account\/first-started)(?!\/plan\/\w+)?$/;

  if(
      pattern.test(url.pathname)
      // || url.pathname == "/account/first-started"
    ){
    // console.log("test")
    const token = await getToken({ req })
    if(token != null){
      const response = NextResponse.next()
      const user: any = token.user;
      // console.log(user.study_status.university)
      
      if(user.study_status.university){
        if(url.pathname == '/account/first-started'){
          url.pathname = '/plan'
          return NextResponse.redirect(url)
        } else {
          // console.log(url.searchParams.get('fallbackUrl'))
          if(url.pathname != '/plan'){
            url.pathname = url.searchParams.get('fallbackUrl') || '/plan'
            return NextResponse.redirect(url)
          }
        }
      } else {
        if(url.pathname != '/account/first-started'){
          url.pathname = `/account/first-started`
          return NextResponse.redirect(url)
        }
      }
      
      // return NextResponse.redirect(url)
    } else {
      if(url.pathname != '/login'){
        url.pathname = `/login`
        return NextResponse.redirect(url)
      }
    }
  }

  // const host = req.headers.get('host');
  // const subdomain = getValidSubdomain(host);
  // if (subdomain) {
  //   // Subdomain available, rewriting
  //   console.log(`>>> Rewriting: ${url.pathname} to /${subdomain}/${subdomain}${url.pathname}`);
  //   url.pathname = `/${subdomain}/${subdomain}${url.pathname}`;
  // }
  // return res;
}

export { default } from "next-auth/middleware"