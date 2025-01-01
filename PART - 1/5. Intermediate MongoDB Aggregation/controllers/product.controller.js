import Product from "../model/Product.js";

export const insertSampleProducts = async (req, res) => {
    try {
        const sampleProducts = [
            {
                name: "Wireless Headphones",
                category: "Electronics",
                price: 2999,
                inStock: true,
                tags: ["wireless", "bluetooth", "audio"]
            },
            {
                name: "Organic Green Tea",
                category: "Electronics",
                price: 499,
                inStock: true,
                tags: ["organic", "beverages", "healthy"]
            },
            {
                name: "Gaming Laptop",
                category: "Electronics",
                price: 79999,
                inStock: false,
                tags: ["gaming", "high-performance", "electronics"]
            },
            {
                name: "Yoga Mat",
                category: "Fitness",
                price: 999,
                inStock: true,
                tags: ["exercise", "fitness", "accessories"]
            },
            {
                name: "Cookware Set",
                category: "Home & Kitchen",
                price: 3499,
                inStock: true,
                tags: ["kitchen", "cookware", "non-stick"]
            }
        ];

        await Product.insertMany(sampleProducts);
        res.status(201).json({
            success: true,
            message: "Successfully inserted",
            totalProducts: await Product.countDocuments()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal error occurred"
        });
    }
}

export const getProductStat = async (req, res) => {
    try {
        const product = await Product.aggregate([
            // {
            //     $match: {
            //         inStock: true,
            //         price: {
            //             $gte: 1000
            //         }
            //     }
            // },
            // {
            //     $group: {
            //         _id: '$category',
            //         averagePrice: {
            //             $avg: '$price'
            //         },
            //         count: {
            //             $sum: 1
            //         }
            //     }
            // },
            {
                $match: {
                    category: 'Electronics'
                }
            },
            {
                $group: {
                    _id: '$category',
                    totalRevenue: {
                        $sum: '$price'
                    },
                    avgPrice: {
                        $avg: '$price'
                    },
                    maxProductPrice: {
                        $max: '$price'
                    },
                    minProductPrice: {
                        $min: '$price'
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                    maxProductPrice: 1,
                    minProductPrice: 1,
                    avgPrice: 1,
                    priceRange: {
                        $subtract: ['$maxProductPrice', '$minProductPrice'],
                    }
                }
            }
        ])

        res.status(200).json({
            success: true,
            message: "Product stats",
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal error occurred"
        })
    }
}