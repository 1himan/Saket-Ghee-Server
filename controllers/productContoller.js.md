Here’s some dummy data for each endpoint, formatted as per the frontend's expectations:

---

### **1. Dashboard Statistics (`/api/admin/statistics`)**
```json
{
  "totalSales": 12500,
  "totalOrders": 450,
  "activeCustomers": 120,
  "pendingDeliveries": 35
}
```

---

### **2. Products (`/api/products`)**
```json
[
  {
    "id": 1,
    "name": "Organic Honey",
    "description": "Pure and natural honey harvested from organic farms.",
    "price": 12.99
  },
  {
    "id": 2,
    "name": "Handmade Ghee",
    "description": "Traditional clarified butter made with care.",
    "price": 9.99
  },
  {
    "id": 3,
    "name": "Natural Almond Oil",
    "description": "Cold-pressed almond oil for cooking and skincare.",
    "price": 15.49
  }
]
```

---

### **3. Orders (`/api/orders`)**
```json
[
  {
    "id": 101,
    "customer": "Alice Johnson",
    "status": "Pending",
    "total": 32.50
  },
  {
    "id": 102,
    "customer": "Bob Williams",
    "status": "Delivered",
    "total": 47.00
  },
  {
    "id": 103,
    "customer": "Charlie Brown",
    "status": "Cancelled",
    "total": 25.75
  }
]
```

---

### **4. Users (`/api/users`)**
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com"
  },
  {
    "id": 2,
    "name": "Bob Williams",
    "email": "bob.williams@example.com"
  },
  {
    "id": 3,
    "name": "Charlie Brown",
    "email": "charlie.brown@example.com"
  }
]
```

---

### **5. Inventory (`/api/inventory`)**
```json
[
  {
    "id": 1,
    "name": "Organic Honey",
    "quantity": 120
  },
  {
    "id": 2,
    "name": "Handmade Ghee",
    "quantity": 75
  },
  {
    "id": 3,
    "name": "Natural Almond Oil",
    "quantity": 50
  }
]
```

---

These datasets are designed to match the expectations of your frontend components and provide realistic, meaningful examples for testing.