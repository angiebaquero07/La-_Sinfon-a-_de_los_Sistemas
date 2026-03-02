# Arquitectura Orientada a la Nube. Usamos multi-stage limits
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

# Copiamos solo los archivos de source
COPY src/ /app/src/
COPY main.py /app/

# Exiliación de configuraciones locales. Listos para Cloud Run, ECS, EKS.
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
