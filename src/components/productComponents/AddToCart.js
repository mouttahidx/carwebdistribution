import { ArrowRightCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Button, Toast } from "flowbite-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
export default function AddToCart({
  id,
  name,
  price,
  quantity,
  image,
  maxQuantity,
  disabled,
  slug,
  shortDescription
}) {

  const { addItem, items, getItem, inCart } = useCart();
  const [aboveStock, setAboveStock] = useState(false);


  useEffect(()=>{
    if(quantity>maxQuantity)
    {
      setAboveStock(true)
    }else{
      setAboveStock(false)
    }
  },[items,quantity])

  const handleClick = () => {

    quantity = Number(quantity)
    maxQuantity = Number(maxQuantity)

    let item = getItem(id)

    if(maxQuantity)
    {
        
        if (
            inCart(id) &&
            item.quantity < maxQuantity
            && quantity + item.quantity <= maxQuantity
          ) {
              setAboveStock(false)
            addItem({ id, name, price, image,maxQuantity,slug,shortDescription }, quantity);
          } else {
              setAboveStock(true)
          }
      
          if (!inCart(id)) {
            addItem({ id, name, price, image,maxQuantity,slug,shortDescription }, quantity);
            setAboveStock(false)
          }
    }else{
       addItem({ id, name, price, image,slug,shortDescription }, quantity);
    }
   

  };
  return (
    <>
      <Button
        className="bg-red-700 text-white hover:bg-rachel-red-900 duration-500 disabled:hover:bg-black"
        onClick={handleClick}
        disabled={aboveStock || disabled}
      >
        <ShoppingCartIcon className="w-6 h-6 mr-3" />
        {disabled ? (!id ? "Sélectionnez les options" : "Déjà dans le panier") : "Ajouter au panier"}
      </Button>
      
      {disabled && <div className="  w-full ">
        <Link href={"/panier"} className="flex items-center  text-blue-800 text-sm underline"><ArrowRightCircleIcon className="w-5 h-5 mr-2"/>Voir le panier</Link></div>}
    </>
  );
}
