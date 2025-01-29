import axios from "axios";

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WEBSITE_URL,
  consumerKey: process.env.NEXT_PUBLIC_CONSUMER_KEY,
  consumerSecret: process.env.NEXT_PUBLIC_CONSUMER_SECRET,
  version: "wc/v3",
  axiosConfig: {
    headers: {
      "Content-Type": "application/json",
    },
  },
});
export async function allBrands(per_page = 10) {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_WEBSITE_URL +
        "wp-json/wc/v3/marque/all?per_page=" +
        per_page
    );
    return res.data;
  } catch (error) {
    console.warn(error);
  }
}

export async function getSelectedBrands() {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_WEBSITE_URL +
        "wp-json/wc/v3/marque/all?ids=29521,29524,29459,29444,29628,29538,29438,29343,29393,50377,29992"
    );
    return res.data;
  } catch (error) {
    console.warn(error);
  }
}

export async function getBrandsPage(per_page = 5, page = 1) {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_WEBSITE_URL +
        "wp-json/wc/v3/marque/all?per_page=" +
        per_page +
        "&page=" +
        page
    );

    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function getProductsByBrand(
  cat_id,
  brand_id,
  sale = "",
  year,
  make,
  model,
  submodel,
  perPage = 12,
  page = 1,
  orderBy = "date",
  order = "desc"
) {
  try {
    if (Array.isArray(brand_id)) {
      if (brand_id?.length > 1) {
        brand_id = brand_id.filter((x) => x !== undefined);

        brand_id = brand_id.join(",");
      } else if (brand_id?.length == 1) {
        brand_id = brand_id[0] === undefined ? "" : brand_id[0];
      }
    }

    if (Array.isArray(cat_id)) {
      if (cat_id?.length > 1) {
        cat_id = cat_id.filter((x) => x !== undefined);

        cat_id = cat_id.join(",");
      } else if (cat_id?.length == 1) {
        cat_id = cat_id[0] === undefined ? "" : cat_id[0];
      }
    }

    const res = await api.get("products/marques", {
      cat_id,
      brand_id,
      per_page: perPage,
      page,
      orderby: orderBy,
      order,
      year,
      make,
      model,
      submodel,
      sale,
    });
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function browseCategories() {
  try {
    const params = {
      per_page: 100,
      hide_empty: true,
      exclude: 30111,
      include: [
        // audio
        28599, 28613, 28608, 28614, 28616, 28610, 28619, 28620, 28607, 28606,
        28612, 28611,
        // eclairage
        28586, 28594, 28591, 28588, 28593, 28590, 28592, 29861, 29750, 28892,
        //  Électrique
        29235, 29251, 29259, 29257, 29258, 29255, 29254, 29253, 29256, 29618,
        //  interieur
        28598, 28617, 28626, 28929, 28925, 29123, 28927, 28930, 28924,
        // Extérieur
        29658, 29700, 29940, 29659, 29891, 29937, 29864, 29813, 29855, 29664,
        // Outils automobiles
        28603, 28615, 28621, 28622, 28629, 28917, 28942, 28914, 28912, 28913,
        // Outils pneumatique
        28601, 28909, 29942, 28623, 28624, 28625, 29893, 28905, 28901, 29218,
        28907, 28902, 28904,
        // Performance
        28577, 28938, 28597, 28939, 28937, 29835,
        // 	Roues et pneus
        28579, 29760, 28881, 28584, 28585, 29341, 29749, 29345, 29742, 29962,
      ],
    };

    const res = await api.get("products/categories", params);
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function allCategories(perPage = 10, page, parent = -1) {
  try {
    const params =
      parent === -1
        ? { per_page: perPage, page, hide_empty: true, exclude: 30111 }
        : { per_page: perPage, page, hide_empty: true, exclude: 30111, parent };
    const res = await api.get("products/categories", params);
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function allCategoriesOnce() {
  try {
    let allItems = [];
    let page = 1;
    while (true) {
      const res = await api.get("products/categories", {
        per_page: 100,
        page,
        hide_empty: true,
        exclude: 30111,
      });

      if (!res.data || !res.headers || !res.headers["x-wp-totalpages"]) {
        break; // Exit the loop if the response is missing expected properties
      }

      allItems = allItems.concat(res.data);
      page++;

      if (page > parseInt(res.headers["x-wp-totalpages"])) {
        break; // Exit the loop when all pages have been retrieved
      }
    }
    return allItems;
  } catch (error) {
    console.warn(error);
  }
}

export async function getCategoryById(id) {
  try {
    const res = await api.get("products/categories/" + id);
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function getCategoriesPage(perPage = 40, page) {
  try {
    const res = await api.get("products/categories", {
      per_page: perPage,
      page,
      hide_empty: true,
      exclude: 30111,
    });
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function getFeaturedProducts() {
  try {
    const res = await api.get("products", { per_page: 10, featured: true });
    return res.data;
  } catch (error) {
    console.warn(error);
  }
}

export async function getSaleProducts() {
  try {
    const res = await api.get("products", { per_page: 5, on_sale: true });
    return res.data;
  } catch (error) {
    console.warn(error);
  }
}

export async function allProducts() {
  let allItems = [];
  let page = 1;
  
  try {
    while (page <= 20) {
      const res = await api.get("products", {
        per_page: 100,
        status: "publish",
        page,
      });

      if (!res.data || !res.headers || !res.headers["x-wp-totalpages"]) {
        break; // Exit the loop if the response is missing expected properties
      }

      allItems = allItems.concat(res.data);
      page++;

      if (page > parseInt(res.headers["x-wp-totalpages"])) {
        break; // Exit the loop when all pages have been retrieved
      }
    }
    const res = await api.get("products", {
      per_page: 1,
      status: "publish",
      page,
    });

    allItems = res.data;
  } catch (error) {
    console.warn(error);
  }
  return allItems;
}

export async function getProductBySlug(slug) {
  try {
    const res = await api.get("products", { slug });
    return res.data;
  } catch (error) {
    console.warn(error);
  }
}

export async function searchProduct(
  query,
  orderBy = "date",
  page = 1,
  per_page = 15
) {
  try {
    const res = await api.get("products/search/name", {
      term: query,
      orderby: orderBy,
      page,
      per_page,
    });
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function searchProductCustom(
  query,
  orderBy = "title",
  page = 1,
  per_page = 5
) {
  try {
    const res = await api.get("products/search/acf", {
      term: query,
      orderby: orderBy,
      page,
      per_page,
    });
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function searchProductNav(
  query,
  orderBy = "date",
  page = 1,
  per_page = 5
) {
  try {
    const res = await api.get("products/search/name", {
      term: query,
      per_page: 5,
      orderby: orderBy,
      page,
      per_page,
    });
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function searchCategory(query) {
  try {
    const res = await api.get("products/categories", {
      search: query,
      per_page: 15,
      hide_empty: true,
    });
    return res;
  } catch (error) {
    console.warn(error);
  }
}
export async function searchBrand(query) {
  try {
    const res = await api.get("brands/name", {
      term: query,
      per_page: 10,
    });
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function getProductsByCategory(id, perPage, page, orderBy) {
  try {
    if (Array.isArray(id)) {
      if (id?.length > 1) {
        id = id.join(",");
      } else if (id?.length == 1) {
        id = id[0];
      }
    }

    const res = await api.get("products", {
      category: id,
      per_page: perPage,
      page,
      orderby: orderBy,
      order: "asc",
    });
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function getProductVariations(id) {
  try {
    const res = await api.get("products/" + id + "/variations", {
      per_page: 100,
    });
    return res.data;
  } catch (error) {
    console.warn(error);
  }
}

export async function getProductReviews(productId, page, perPage) {
  try {
    const res = await api.get("products/reviews/", {
      product: productId,
      page,
      per_page: perPage,
    });
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function getShippingZones() {
  try {
    const res = await api.get("shipping/zones/");
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function getShippingZoneLocations(id) {
  try {
    const res = await api.get("shipping/zones/" + id + "/locations");
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function getAllTaxes() {
  try {
    const res = await api.get("taxes", { per_page: 20 });
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function getShippingZoneMethods(id) {
  try {
    const res = await api.get("shipping/zones/" + id + "/methods");
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function getCustomerData(id) {
  try {
    const res = await api.get("customers/" + id, { role: "all" });
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function getCustomerByEmail(email) {
  try {
    const res = await api.get("customers/", { role: "all", email });
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function updateCustomerData(id, user) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      auth: {
        username: process.env.NEXT_PUBLIC_CONSUMER_KEY,
        password: process.env.NEXT_PUBLIC_CONSUMER_SECRET,
      },
    };

    const res = await axios.put(
      process.env.NEXT_PUBLIC_WEBSITE_URL + "wp-json/wc/v3/customers/" + id,
      user,
      config
    );
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function getCustomerOrders(id, page) {
  try {
    const res = await api.get("orders", { customer: id, page });
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function createOrder(data) {
  try {
    const res = await api.post("orders", data);
    return res;
  } catch (error) {
    console.warn(error);
  }
}

export async function getPromoCode(code) {
  try {
    const res = await api.get("coupons", { code });
    return res;
  } catch (error) {
    console.warn(error);
  }
}
