export interface PriceMarkdown {
	id: number;
	date: string;
	branch_product_id: string;
	markdown_price: string;
	type: 'discount_1' | 'discount_2' | 'regular';
}
