#!/bin/bash
echo "=== Testing API response structure ==="

# Прямой запрос к бэкенду
echo ""
echo "1. Direct backend response:"
curl -s "https://keys.foreignpay.ru/webhook/esim-trip/get-products?country=france" | \
  python3 -c "
import sys, json
data = json.load(sys.stdin)
print(f'Type: {type(data)}')
print(f'Keys: {list(data.keys())}')
print(f'best-prices count: {len(data.get(\"best-prices\", []))}')
print(f'prices count: {len(data.get(\"prices\", []))}')
if data.get('best-prices'):
    print('\\nFirst best-price item keys:')
    print(list(data['best-prices'][0].keys()))
    print('\\nFirst best-price item:')
    print(json.dumps(data['best-prices'][0], indent=2, ensure_ascii=False))
"

# Через ваш API route
echo ""
echo "2. Your API route response:"
curl -s "http://localhost:3000/api/esim/country-products?country=france" | \
  python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print(f'Type: {type(data)}')
    print(f'Is array? {isinstance(data, list)}')
    if isinstance(data, list):
        print(f'Array length: {len(data)}')
        if len(data) > 0:
            print('\\nFirst item keys:')
            print(list(data[0].keys()))
            print('\\nFirst item:')
            print(json.dumps(data[0], indent=2, ensure_ascii=False))
    else:
        print('\\nObject keys:')
        print(list(data.keys()))
except Exception as e:
    print(f'Error: {e}')
"
