import { Product } from "../types.ts";
import { Request, Response, v4 } from "../deps.ts";

let products: Product[] = [
  {
    id: "1",
    name: "Product One",
    description: "This product one",
    price: 29.99,
  },
  {
    id: "2",
    name: "Product Two",
    description: "This product two",
    price: 29.99,
  },
  {
    id: "3",
    name: "Product Three",
    description: "This product three",
    price: 59.99,
  },
];

/**
 * Get all products
 * `GET /api/v1/products`
 */
export function getProducts({ response }: { response: Response }) {
  response.body = {
    success: true,
    data: products,
  };
}

/**
 * Get single product
 * `GET /api/v1/products/:id`
 */
export function getProduct(
  { params, response }: { params: { id: string }; response: Response },
) {
  const product = products.find((p) => p.id === params.id);

  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No product found",
    };
  }
}

/**
 * Add product
 * `POST /api/v1/products`
 */
export async function addProduct(
  { request, response }: { request: Request; response: Response },
) {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data",
    };
  } else {
    const product = body.value;
    product.id = v4.generate();
    products.push(product);

    response.status = 201;
    response.body = {
      success: true,
      data: product,
    };
  }
}

/**
 * Update product
 * `PUT /api/v1/products/:id`
 */
export async function updateProduct(
  { params, request, response }: {
    params: { id: string };
    request: Request;
    response: Response;
  },
) {
  const product = products.find((p) => p.id === params.id);

  if (product) {
    const body = await request.body();

    const updateData: { name?: string; description?: string; price?: number } =
      body.value;

    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );

    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No product found",
    };
  }
}

/**
 * Delet product
 * `DELETE /api/v1/products/:id`
 */
export function deleteProduct(
  { params, response }: { params: { id: string }; response: Response },
) {
  products = products.filter((p) => p.id !== params.id);
  response.body = {
    success: true,
    msg: "Product removed",
  };
}
