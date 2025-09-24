# GeoProp AI - Railway Deployment Dockerfile (Fixed)
FROM python:3.11-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set working directory
WORKDIR /app

# Copy ALL files from repository root
COPY . .

# Install any Python dependencies if requirements exist
RUN pip install --no-cache-dir --upgrade pip
RUN if [ -f requirements.txt ]; then pip install --no-cache-dir -r requirements.txt; fi
RUN if [ -f backend/requirements.txt ]; then pip install --no-cache-dir -r backend/requirements.txt; fi

# Make Python files executable
RUN chmod +x *.py 2>/dev/null || true

# Create non-root user
RUN useradd --create-home --shell /bin/bash geoprop && \
    chown -R geoprop:geoprop /app
USER geoprop

# Start the full GeoProp AI application
CMD ["python", "main.py"]