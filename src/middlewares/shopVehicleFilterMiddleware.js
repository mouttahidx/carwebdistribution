import { NextResponse } from "next/server";

export default function middlewareShop(req) {
  const data = req.cookies.get("user-vehicle")?.value;

  if (data && !req.nextUrl.search.includes("par_vehicule")) {
    
    const vehicle = JSON.parse(data);
    const currentSearchParams = new URLSearchParams(req.nextUrl.search);

    currentSearchParams.set("par_vehicule", "1");
    currentSearchParams.set("year", vehicle.year);
    currentSearchParams.set("make", vehicle.make);
    currentSearchParams.set("model", vehicle.model);
    currentSearchParams.set("submodel", vehicle.subModel);

    return NextResponse.redirect(
      `${req.nextUrl.origin}/boutique?${currentSearchParams.toString()}`
    );

  } else if(!data){
    const currentSearchParams = new URLSearchParams(req.nextUrl.search);
    currentSearchParams.delete("par_vehicule");
    currentSearchParams.delete("year");
    currentSearchParams.delete("make");
    currentSearchParams.delete("model");
    currentSearchParams.delete("submodel");
    return NextResponse.next();
  }

}
