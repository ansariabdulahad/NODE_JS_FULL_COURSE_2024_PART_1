import { products } from "../data/product.js";
import Product from "../models/Product.js";

// export const resolvers = {
//     Query: {
//         products: () => products,
//         product: (_, { id }) => products.find(item => item.id === id)
//     },

//     Mutation: {
//         createProduct: (_, { title, category, price, inStock }) => {
//             const newlyCreatedProduct = {
//                 id: String(products.length + 1),
//                 title,
//                 category,
//                 price,
//                 inStock
//             }

//             products.push(newlyCreatedProduct);
//             return newlyCreatedProduct
//         },

//         deleteProduct: (_, { id }) => {
//             const index = products.findIndex(item => item.id === id);

//             if (index === -1) return false;

//             products.splice(index, 1);
//             return true;
//         },

//         updateProduct: (_, {id, ...updatedProduct}) => {
//             const index = products.findIndex(item => item.id === id);

//             if (index === -1) return false;

//             const updated = {
//                 ...products[index], ...updatedProduct
//             }

//             products[index] = updated;
//             return updated;
//         }
//     }
// }

export const resolvers = {
    Query: {
        products: async () => await Product.find({}),
        product: async (_, { id }) => await Product.findById(id)
    },

    Mutation: {
        createProduct: async (_, { title, category, price, inStock }) => {
            const newlyCreatedProduct = new Product({
                title,
                category,
                price,
                inStock
            })

            await newlyCreatedProduct.save()
            return newlyCreatedProduct
        },

        deleteProduct: async (_, { id }) => {
            await Product.findByIdAndDelete(id)
            return true;
        },

        updateProduct: async (_, { id, ...updatedProduct }) => {
            const updatedProducts = await Product.findByIdAndUpdate(id, updatedProduct, {new: true});
            return updatedProducts;
        }
    }
}