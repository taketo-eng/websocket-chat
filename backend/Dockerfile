FROM python:3.10

RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8080

ENV PYTHONUNBUFFERED True

WORKDIR /app
COPY main.py .
COPY .env .
COPY config/ ./config/
COPY router/ ./router/
COPY utils/ ./utils/
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]