

async function Products() {

    const products = [];
    let minPrice = 0; // Start of price range
    let maxPrice = 100000; // End of price range

    // Calling the function SiteProducts
    await SiteProducts(minPrice, maxPrice, products);

    // Output the length of the products array (the number of products)
    console.log(`Total products: ${products.length}`);
    return products;

}

// Function for collecting products
async function SiteProducts(minPrice, maxPrice, products) {
    const link = `https://api.ecommerce.com/products?minPrice=${minPrice}&maxPrice=${maxPrice}`;

    // Calling the function API
    const dataFromAPI = await API(link, minPrice, maxPrice);
    const total = dataFromAPI.total; // means how many products there are on the API for this price range
    console.log(`total: ${total}`);
    const count = dataFromAPI.count; // means how many were returned on this API call (max is 1000)
    console.log(`count: ${count}`);


    //If total > 1000
    if (total > 1000) {
        const middlePrice = ((minPrice + maxPrice) / 2);
        await SiteProducts(minPrice, middlePrice, products); // First half
        console.log(`products: ${products.length}`);

        await SiteProducts(middlePrice, maxPrice, products); // Second half
    } else {
        products.push(...dataFromAPI.products); //I expand the array of products from the API (dataFromAPI.products) using the ... operator and add each product from this array to the end of the products array
    }
}

// Simulate API request
async function API(link, minPrice, maxPrice) {
    console.log(/*link: ${link},*/`min: ${minPrice}, max: ${maxPrice}`);
    // Simulation of a situation where the width of the range affects the number of products and the larger the range, the more likely it is that there will be more products
    const total = (maxPrice - minPrice > 5000) ? 2000 : 950; // If the price range is more than 5000, then I assume there are 1500 items in that range, and if less than that, then 999
    const count = Math.min(total, 1000);  // No more than 1000 products are returned because the API has a limit of 1000 products
    const products = Array(count).fill({});  // An array of length count (from 1 to 1000) is created and filled with empty objects {} - this is product emulation

    return {
        total: total,  // Total number of products in the range
        count: count,  // How many products are in this request
        products: products  // Products returns
    };
}

Products();