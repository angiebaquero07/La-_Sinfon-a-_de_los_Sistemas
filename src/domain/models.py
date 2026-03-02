from pydantic import BaseModel, EmailStr
from typing import Optional, List

class User(BaseModel):
    id: Optional[int] = None
    name: str
    email: EmailStr
    password: str
    role: str = "cliente" # cliente o admin

class Product(BaseModel):
    id: Optional[int] = None
    name: str
    category: str # Deportivos, Casuales, Formales
    size: float
    price: float
    brand: str
    color: str
    stock: int

class CartItemModel(BaseModel):
    product_id: int
    quantity: int

class PaymentRequest(BaseModel):
    cart_id: int
    payment_method: str # "contraentrega", "tarjeta", "paypal"
    amount: float
