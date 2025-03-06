import Layout from "@/layout";
import {
  allProducts,
  getCategoryById,
  getProductBySlug,
  getProductVariations,
} from "@/lib/api";
import ProductImages from "@/components/productComponents/ProductImages";
import ProductDetails from "@/components/productComponents/ProductDetails";
import ProductAttributes from "@/components/productComponents/ProductAttributes";
import { useEffect, useState } from "react";
import ProductDescription from "@/components/productComponents/ProductDescription";
import AddToCart from "@/components/productComponents/AddToCart";
import { Label, TextInput } from "flowbite-react";
import { useCart } from "react-use-cart";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

export default function SingleProduct({ product, variations }) {
  const [currentProduct, setCurrentProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { inCart } = useCart();
  const [attributesSelected, setAttributesSelected] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [images, setImages] = useState([]);

  const handleOptionChange = (data) => {
    setAttributesSelected(data);
  };

  useEffect(() => {
    setImages(
      product.images?.length > 0
        ? product.images
        : product.categories?.length > 0
        ? Promise.all(
            product.categories.map((category) =>
              getCategoryById(category.id).then((res) =>
                res.status === 200 ? res.data.image : null
              )
            )
          ).then((images) => images.filter(Boolean))
        : [{ src: "/slider2.jpg", name: "Car web product" }]
    );

    if (product && variations?.length > 0) {
      // set product with available attributes
      let variationsWithPrice = variations.filter((item) => item.price !== "");

      setMin(Math.min(...variationsWithPrice.map((item) => item.price)));
      setMax(Math.max(...variationsWithPrice.map((item) => item.price)));

      let attributes = product.attributes;

      // loop throught attributes and change their options to only have options available in variations
      attributes.forEach((originalAttr) => {
        let tempOptions = [];

        variations.forEach((variation) => {
          variation.attributes.forEach((variationAttr) => {
            if (
              variationAttr?.name === originalAttr?.name &&
              variation.price !== ""
            ) {
              tempOptions.push(variationAttr.option);
            }
          });
        });

        originalAttr.options = tempOptions;
      });

      // remove duplicates
      attributes.forEach((item) => {
        item.options = [...new Set(item.options)];
      });

      attributes.filter((x) => x.options?.length > 0);

      setCurrentProduct({
        ...variations[0],
        images: [variations[0].image] || images,
        attributes: attributes.filter((x) => x.options?.length > 0),
        price: min + " - $" + max,
      });
    }

    if (product && variations?.length === 0) {
      setCurrentProduct({
        ...product,
        price: Number(product.price).toFixed(2),
        sale_price: Number(product.sale_price).toFixed(2),
        regular_price: Number(product.regular_price).toFixed(2),
      });
    }
  }, []);

  useEffect(() => {
    if (product.type === "variable") {
      if (attributesSelected?.length === product.attributes?.length) {
        // Find the variation that matches the selected attribute options
        const matchedVariation = variations.find((variation) => {
          return attributesSelected.every((selectedAttr) => {
            return variation.attributes.some(
              (variationAttr) =>
                variationAttr.id === selectedAttr.id &&
                variationAttr.option === selectedAttr.option
            );
          });
        });

        if (matchedVariation) {
          setCurrentProduct({
            ...product,
            id: matchedVariation.id,
            price: Number(matchedVariation.price).toFixed(2),
            regular_price: Number(matchedVariation.regular_price).toFixed(2),
            on_sale: matchedVariation.on_sale,
            sale_price: Number(matchedVariation.sale_price).toFixed(2),
            manage_stock: matchedVariation.manage_stock,
            stock_quantity: matchedVariation.stock_quantity,
            stock_status: matchedVariation.stock_status,
            images: [matchedVariation.image],
            description: matchedVariation.description,
            variation_attributes: matchedVariation.attributes,
            sku: matchedVariation.sku,
            meta_data: matchedVariation.meta_data,
          });
        } else if (!matchedVariation) {
          setCurrentProduct((curr) => ({
            ...curr,
            id: null,
            price:
              "<span class='text-sm'>à partir de:</span> $" + min.toFixed(2),
            brands: product.brands,
          }));
        }
      } else {
        setCurrentProduct((curr) => ({
          ...curr,
          id: null,
          price: "<span class='text-sm'>à partir de:</span> $" + min.toFixed(2),
          brands: product.brands,
        }));
      }
    }
  }, [attributesSelected]);

  useEffect(() => {
    product.images?.length > 0 && setImages(product.images);
  }, [currentProduct, product?.id]);

  useEffect(() => {
    if(product.manage_stock){
      if (quantity > currentProduct.stock_quantity) {
        setQuantity(currentProduct.stock_quantity);
      }
    }
  }, [quantity]);

  return (
    <Layout>
      <Head>
        <title key={"produit"}>{`${
          process.env.NEXT_PUBLIC_WEBSITE_TITLE || "Check .ENV"
        } | ${
          product && product?.name + " - " + product.categories[0]?.name
        } `}</title>

        <meta
          name="description"
          content={
            currentProduct?.yoast_head_json?.og_description +
              " - " +
              product.categories[0]?.name ||
            product?.description + " - " + product.categories[0]?.name
          }
          key="desc"
        />
        <meta property="og:title" content={product && product?.name} />
        <meta
          property="og:description"
          content={
            currentProduct?.yoast_head_json?.og_description +
              " - " +
              product.categories[0]?.name ||
            product?.description + " - " + product.categories[0]?.name
          }
          key="desc"
        />
        <meta
          property="og:image"
          content={product?.images?.length > 0 && product?.images[0].src}
        />
      </Head>
      <section className="xl:px-10 py-10 mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <div className="lg:mx-auto flex flex-wrap justify-center gap-y-6 items-start px-4">
          <ProductImages images={images} on_sale={product?.on_sale} />

          <div className="rounded bg-gray-50 md:w-1/2 w-full lg:p-5 lg:py-6 mb-6 lg:mb-0 md:pl-4 xl:pl-10 md:p-2 !pt-0 p-1 lg:pt-1">
            <ProductDetails
              categories={product?.categories}
              name={product?.name}
              sku={currentProduct.sku}
              average_rating={product.average_rating}
              price={currentProduct?.price}
              short_description={product.short_description}
              regular_price={currentProduct.regular_price}
              sale_price={currentProduct.sale_price}
              on_sale={currentProduct.on_sale}
              metadata={currentProduct.meta_data}
              brands={currentProduct.brands}
            />
            {variations?.length > 0 && (
              <ProductAttributes
                defaultSelected={variations[0]?.attributes}
                attributes={product?.attributes}
                updated={handleOptionChange}
                variations={variations}
              />
            )}

            {/*------------------- Add to cart ----------------------- */}
            {
              <div className="flex flex-col justify-start items-start gap-y-4">
                {currentProduct.stock_status === "instock" ? (
                  <div className="flex flex-col items-start">
                    <Label
                      htmlFor="quantity"
                      value="Quantité:"
                      className="mb-2"
                    />
                    <TextInput
                      className="w-20 text-center"
                      id="quantity"
                      min={1}
                      max={
                        currentProduct.manage_stock
                          ? currentProduct.stock_quantity
                          : 99
                      }
                      value={quantity}
                      type="number"
                      onChange={(e) => {
                        if (currentProduct.manage_stock && currentProduct.stock_quantity < e.target.value) {
                          setQuantity(currentProduct.stock_quantity);
                        }
                        if (e.target.value < e.target.min) {
                          setQuantity(e.target.min);
                        }

                        setQuantity(e.target.value);
                      }}
                    />
                    <span className="mt-2 text-sm text-green-600">
                      {currentProduct.manage_stock &&
                        currentProduct?.stock_quantity + " en stock"}
                    </span>
                  </div>
                ) : (
                  <></>
                )}

                <AddToCart
                  productData={{
                    id: currentProduct.id,
                    price: currentProduct.price,
                    quantity: Number(quantity),
                    slug: product.slug,
                    shortDescription: product.short_description,
                    name: product?.name + " - "+(currentProduct?.sku ? "UGS: "+currentProduct.sku : "ID: "+currentProduct?.id),
                    image: product?.images[0],
                  }}
                  maxQuantity={currentProduct.stock_quantity}
                  disabled={!currentProduct.id}
                />
              </div>
            }
          </div>
        </div>
        <ProductDescription
          description={currentProduct.description}
          additionalInfos={product.attributes}
        />

        {/* {product.reviews_allowed && (
          <Reviews
            productId={product.id}
            averageRating={product.average_rating}
            ratingCount={product.rating_count}
          />
        )} */}
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const products = await allProducts();
  const paths = products.map((prod) => ({ params: { slug: prod.slug } }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const data = await getProductBySlug(slug);
  if (data && data?.length === 0) {
    return {
      notFound: true,
    };
  }
  const id = data[0].id || null;
  let variations = [];

  if (id) {
    variations = await getProductVariations(id);
  }
  return {
    props: {
      product: data[0] || {},
      variations: variations || [],
    },
    revalidate: 30,
  };
}
