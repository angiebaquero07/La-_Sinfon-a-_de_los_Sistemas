from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from src.domain.models import User, Product, PaymentRequest
from src.repository.database import get_db
from src.repository.catalog_repository import CatalogRepository
from src.services.payment_strategy import (
    PaymentContext,
    ContraentregaStrategy,
    TarjetaStrategy
)

router = APIRouter()

# Patrón Factory (Fábrica) / Inyección de Dependencias
# Construimos una instancia unificada solo cuando el cliente web lo requiere 
def get_catalog_repository(db: Session = Depends(get_db)):
    return CatalogRepository(db)

# ================================
# MÓDULO CATÁLOGO Y ADMINISTRATIVO
# ================================
@router.post("/productos/", response_model=Product, tags=['Administrador y Catálogo'])
def add_product(product: Product, repo: CatalogRepository = Depends(get_catalog_repository)):
    """Panel Administrativo: Crear productos."""
    return repo.create(product)

@router.get("/productos/", tags=['Catálogo y Búsqueda'])
def list_products(categoria: str = None, talla: float = None, repo: CatalogRepository = Depends(get_catalog_repository)):
    """Visualización del catálogo filtrando por talla y tipo (Deportivo, Casual)"""
    return repo.get_all(categoria, talla)

# ================================
# MÓDULO DE PAGOS Y CARRITO (STRATEGY PATTERN)
# ================================
@router.post("/checkout/", tags=['Simulación de Pago y Carrito'])
def simulate_checkout(request: PaymentRequest):
    """
    Simulación de Pago Implementando Patrón STRATEGY.
    Recibe el método de pago elegido por el usuario y cambia el algoritmo dinámicamente.
    """
    if request.payment_method == "contraentrega":
        strategy = ContraentregaStrategy()
    elif request.payment_method == "tarjeta":
        strategy = TarjetaStrategy()
    else:
        raise HTTPException(status_code=400, detail="Método de pago no reconocido por ZapatoFlex")

    # Inicia el contexto del patrón de diseño
    payment_context = PaymentContext(strategy)
    response = payment_context.execute_payment(request.amount)
    
    return {
        "cart_id": request.cart_id,
        "message": response,
        "status": "Transacción Exitosa (Simulación)"
    }
