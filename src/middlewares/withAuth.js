
import { getToken } from "next-auth/jwt";
import {NextFetchEvent, NextRequest, NextResponse, NextMiddleware} from 'next/server'

const onlyAdmin = ['admin'];
const authPage = ['login', 'register'];

export default function WithAuth(middleware, requireAuth){
    return async (req, next)=>{
      const pathname = req.nextUrl.pathname.split('/')[1];
        if(requireAuth.includes(pathname)){
            const token = await getToken({
                req,
                secret: process.env.NEXTAUTH_SECRET,
            });
            if(!token && !authPage.includes(pathname)){
                const url = new URL('/login', req.url);
                url.searchParams.set('callbackUrl', encodeURI(req.url));
                return NextResponse.redirect(url);
            }

            if(token){
                if(authPage.includes(pathname)){
                    return NextResponse.redirect(new URL('/', req.url));
                }

                if(token.role !== 'admin' && onlyAdmin.includes(pathname)){
                    return NextResponse.redirect(new URL('/', req.url));
                }
            }
        }
        return middleware(req, next);
      
    }
}