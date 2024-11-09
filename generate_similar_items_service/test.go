package main

var amazonMockProducts = []Product{
	{
		Title:       "Catlink Automatic Self Cleaning Litter Box",
		Price:       "$299.99",
		Image:       "https://images-na.ssl-images-amazon.com/images/I/91vWjA7+JjL._AC_SL1500_.jpg",
		ProductLink: "https://www.amazon.com/dp/B08L8J8DHK",
	},
	{
		Title:       "PetSafe ScoopFree Ultra Self-Cleaning Litter Box",
		Price:       "$169.95",
		Image:       "https://images-na.ssl-images-amazon.com/images/I/71RP-Fng6BL._AC_SL1500_.jpg",
		ProductLink: "https://www.amazon.com/dp/B01N33ZGQX",
	},
	{
		Title:       "Litter-Robot 3 Connect",
		Price:       "$499.00",
		Image:       "https://images-na.ssl-images-amazon.com/images/I/81OHqR6uRjL._AC_SL1500_.jpg",
		ProductLink: "https://www.amazon.com/dp/B07N5WBX4F",
	},
	{
		Title:       "PetSafe Simply Clean Self-Cleaning Litter Box",
		Price:       "$169.99",
		Image:       "https://images-na.ssl-images-amazon.com/images/I/51TKgE0IZ7L._AC_SL1000_.jpg",
		ProductLink: "https://www.amazon.com/dp/B01N6CGF4C",
	},
	{
		Title:       "Omega Paw Self Cleaning Litter Box",
		Price:       "$89.99",
		Image:       "https://images-na.ssl-images-amazon.com/images/I/71m0%2B7h2OqL._AC_SL1500_.jpg",
		ProductLink: "https://www.amazon.com/dp/B0002DHRYO",
	},
}

var ebayMockProducts = []Product{
	{
		Title:       "CATLINK Automatic Self Cleaning Cat Litter Box",
		Price:       "$389.99",
		Image:       "https://i.ebayimg.com/images/g/W8gAAOSw2JFnKIGM/s-l500.webp",
		ProductLink: "https://www.ebay.com/itm/123456789",
	},
	{
		Title:       "Litter-Robot 3 Self-Cleaning Litter Box",
		Price:       "$550.00",
		Image:       "https://i.ebayimg.com/images/g/xyzAAOSw2JFnKIGM/s-l500.webp",
		ProductLink: "https://www.ebay.com/itm/987654321",
	},
	{
		Title:       "PetSafe ScoopFree Ultra Self-Cleaning Litter Box",
		Price:       "$169.99",
		Image:       "https://i.ebayimg.com/images/g/abcAAOSw2JFnKIGM/s-l500.webp",
		ProductLink: "https://www.ebay.com/itm/135792468",
	},
	{
		Title:       "Catit SmartSift Self-Cleaning Litter Box",
		Price:       "$249.95",
		Image:       "https://i.ebayimg.com/images/g/DEFgAAOSw2JFnKIGM/s-l500.webp",
		ProductLink: "https://www.ebay.com/itm/456123789",
	},
	{
		Title:       "Omega Paw Self-Cleaning Litter Box",
		Price:       "$85.00",
		Image:       "https://i.ebayimg.com/images/g/GHHgAAOSw2JFnKIGM/s-l500.webp",
		ProductLink: "https://www.ebay.com/itm/789456123",
	},
}

// Prepare the response
var MockResponse = Response{
	AmazonProducts: amazonMockProducts,
	EbayProducts:   ebayMockProducts,
}