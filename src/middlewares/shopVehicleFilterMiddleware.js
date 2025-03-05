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
  }

  return NextResponse.next();
}
