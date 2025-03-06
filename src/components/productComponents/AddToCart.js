import {
  ArrowRightCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { Alert, Button, Toast } from "flowbite-react";
import { max } from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
export default function AddToCart({
  productData: { id, name, price, image, quantity, shortDescription, slug },
  maxQuantity,
  disabled,
}) {
  const [added, setAdded] = useState(false);
  const { addItem, items, getItem, inCart } = useCart();
  const [aboveStock, setAboveStock] = useState(false);

  useEffect(() => {
    console.log("aboveStock:", aboveStock);
  }, [aboveStock]);

  useEffect(() => {
    const item = getItem(id);
    const cartQuantity = item ? item.quantity : 0;

    if (maxQuantity) {
      if (quantity > maxQuantity || quantity + cartQuantity > maxQuantity) {
        setAboveStock(true);
      } else {
        setAboveStock(false);
      }
    }
  }, [items, quantity, maxQuantity, id]);

  const handleClick = () => {
    quantity = Number(quantity);
    maxQuantity = maxQuantity ? Number(maxQuantity) : null;
    let item = getItem(id);

    if (maxQuantity) {
      if (inCart(id)) {
        if (
          item.quantity < maxQuantity &&
          quantity + item.quantity <= maxQuantity
        ) {
          setAboveStock(false);
          addItem(
            { id, name, price, image, maxQuantity, slug, shortDescription },
            quantity
          );
          setAdded(true);
        } else {
          setAboveStock(true);
        }
      } else if (quantity <= maxQuantity) {
        addItem(
          { id, name, price, image, maxQuantity, slug, shortDescription },
          quantity
        );
        setAdded(true)
        setAboveStock(false);
      } else {
        setAboveStock(true);
      }
    } else {
      addItem({ id, name, price, image, slug, shortDescription }, quantity);
      setAdded(true);
      setAboveStock(false);
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
        {disabled
          ? !id
            ? "Sélectionnez les options"
            : "Déjà dans le panier"
          : "Ajouter au panier"}
      </Button>

      {disabled && (
        <div className="w-full">
          <Link
            href={"/panier"}
            className="flex items-center text-blue-800 text-sm underline"
          >
            <ArrowRightCircleIcon className="w-5 h-5 mr-2" />
            Voir le panier
          </Link>
        </div>
      )}

      {added && 
        <Alert color="success" onDismiss={() => setAdded(false)}>
        Le produit a été ajouté à votre panier.
      </Alert>
}
    </>
  );
}
