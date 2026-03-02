from abc import ABC, abstractmethod

class IPaymentStrategy(ABC):
    """
    Patrón Strategy: Define una familia de algoritmos, los encapsula 
    y los hace intercambiables para los métodos de pago.
    """
    @abstractmethod
    def process_payment(self, amount: float) -> str:
        pass

class ContraentregaStrategy(IPaymentStrategy):
    """Simulación especificada en los requerimientos del Caso de Estudio"""
    def process_payment(self, amount: float) -> str:
        return f"Pago Contraentrega procesado correctamente por el valor de ${amount}. Recoge en casa."

class TarjetaStrategy(IPaymentStrategy):
    """Simulación de pago futuro de la empresa a 6 meses"""
    def process_payment(self, amount: float) -> str:
        return f"Pago procesado por Tarjeta en pasarela bancaria por ${amount}."

class PaymentContext:
    def __init__(self, strategy: IPaymentStrategy):
        self._strategy = strategy

    def set_strategy(self, strategy: IPaymentStrategy):
        self._strategy = strategy

    def execute_payment(self, amount: float) -> str:
        return self._strategy.process_payment(amount)
