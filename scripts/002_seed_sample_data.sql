-- Insert sample products
INSERT INTO public.products (name, description, category, price, image_url) VALUES
('Steam Gift Card $10', 'Steam digital gift card worth $10 USD', 'game', 10.00, '/placeholder.svg?height=200&width=200'),
('Steam Gift Card $25', 'Steam digital gift card worth $25 USD', 'game', 25.00, '/placeholder.svg?height=200&width=200'),
('Steam Gift Card $50', 'Steam digital gift card worth $50 USD', 'game', 50.00, '/placeholder.svg?height=200&width=200'),
('Microsoft Office 365', 'Microsoft Office 365 Personal - 1 Year Subscription', 'business_app', 69.99, '/placeholder.svg?height=200&width=200'),
('Adobe Creative Cloud', 'Adobe Creative Cloud All Apps - 1 Month Subscription', 'business_app', 54.99, '/placeholder.svg?height=200&width=200'),
('Spotify Premium', 'Spotify Premium - 3 Months Gift Card', 'business_app', 29.97, '/placeholder.svg?height=200&width=200'),
('PlayStation Store $20', 'PlayStation Store digital gift card worth $20 USD', 'game', 20.00, '/placeholder.svg?height=200&width=200'),
('Xbox Live Gold', 'Xbox Live Gold - 3 Months Membership', 'game', 24.99, '/placeholder.svg?height=200&width=200'),
('Nintendo eShop $15', 'Nintendo eShop digital gift card worth $15 USD', 'game', 15.00, '/placeholder.svg?height=200&width=200'),
('Zoom Pro', 'Zoom Pro - 1 Month Subscription', 'business_app', 14.99, '/placeholder.svg?height=200&width=200');

-- Insert sample voucher codes for each product
INSERT INTO public.voucher_codes (product_id, code) 
SELECT id, 'STEAM10-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8))
FROM public.products WHERE name = 'Steam Gift Card $10'
UNION ALL
SELECT id, 'STEAM10-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8))
FROM public.products WHERE name = 'Steam Gift Card $10'
UNION ALL
SELECT id, 'STEAM10-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8))
FROM public.products WHERE name = 'Steam Gift Card $10';

INSERT INTO public.voucher_codes (product_id, code) 
SELECT id, 'STEAM25-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8))
FROM public.products WHERE name = 'Steam Gift Card $25'
UNION ALL
SELECT id, 'STEAM25-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8))
FROM public.products WHERE name = 'Steam Gift Card $25'
UNION ALL
SELECT id, 'STEAM25-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8))
FROM public.products WHERE name = 'Steam Gift Card $25';

INSERT INTO public.voucher_codes (product_id, code) 
SELECT id, 'OFFICE365-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 10))
FROM public.products WHERE name = 'Microsoft Office 365'
UNION ALL
SELECT id, 'OFFICE365-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 10))
FROM public.products WHERE name = 'Microsoft Office 365';

INSERT INTO public.voucher_codes (product_id, code) 
SELECT id, 'ADOBE-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 12))
FROM public.products WHERE name = 'Adobe Creative Cloud'
UNION ALL
SELECT id, 'ADOBE-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 12))
FROM public.products WHERE name = 'Adobe Creative Cloud';
