import { NextResponse } from "next/server";
import { applyMiddlewares } from "./lib/chainMiddlewares";
import {checkAuth} from "./middlewares/authMiddlware";
import middlewareShop from "./middlewares/shopVehicleFilterMiddleware";

export default function middleware(req){
    
    const { pathname } = req.nextUrl;
    if(pathname.includes('/compte')){
        return checkAuth(req)
    }

    if(pathname.includes('/boutique')){
        return middlewareShop(req)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/compte/:path*','/boutique/:path*']
}