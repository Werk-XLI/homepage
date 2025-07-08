# Example Product Implementation

This folder will contain individual product pages when the shop is fully implemented.

## Planned Structure

```
/shop/
├── index.astro          (main shop page - already created as /shop.astro)
├── products/
│   ├── t-shirt-logo.astro
│   ├── hoodie-black.astro
│   ├── sticker-pack.astro
│   ├── vinyl-ep.astro
│   └── poster-a2.astro
└── categories/
    ├── clothing.astro
    ├── music.astro
    └── accessories.astro
```

## Example Product Page Template

```astro
---
// shop/products/[slug].astro
import Base from "../../layouts/Base.astro";
import { getProduct } from "../../lib/shop.js";

export async function getStaticPaths() {
  // Will be populated when backend is implemented
  return [
    { params: { slug: "t-shirt-logo" } },
    { params: { slug: "hoodie-black" } },
    // ... more products
  ];
}

const { slug } = Astro.params;
const product = await getProduct(slug);
---

<Base title={`${product.name} - Werk XLI Shop`}>
  <div class="max-w-6xl mx-auto p-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Product Images -->
      <div class="space-y-4">
        <img 
          src={product.mainImage} 
          alt={product.name}
          class="w-full rounded-lg"
        />
        <div class="grid grid-cols-4 gap-2">
          {product.images.map(img => (
            <img src={img} alt="" class="rounded cursor-pointer" />
          ))}
        </div>
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <h1 class="text-3xl font-bold">{product.name}</h1>
        <p class="text-2xl font-bold text-green-400">{product.price}€</p>
        
        <div class="prose prose-invert">
          <p>{product.description}</p>
        </div>

        <!-- Size Selection (for clothing) -->
        {product.variants && (
          <div>
            <label class="block text-sm font-bold mb-2">Größe:</label>
            <select class="bg-neutral-800 p-2 rounded">
              {product.variants.map(variant => (
                <option value={variant.id}>{variant.name}</option>
              ))}
            </select>
          </div>
        )}

        <!-- Add to Cart Button -->
        <button 
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-colors"
          data-product-id={product.id}
        >
          In den Warenkorb - {product.price}€
        </button>

        <!-- Product Details -->
        <div class="border-t border-neutral-700 pt-6">
          <h3 class="font-bold mb-2">Produktdetails</h3>
          <ul class="space-y-1 text-sm text-gray-400">
            <li>Material: {product.material}</li>
            <li>Pflege: {product.care}</li>
            <li>Lieferzeit: {product.deliveryTime}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</Base>
```