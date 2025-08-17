FROM node:20-bullseye-slim
 
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean
 
WORKDIR /app
 
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

# Install Node dependencies
COPY package*.json ./
RUN --mount=type=cache,id=npm,target=/root/.npm \
    npm install \
    npm cache clean --force


COPY . .
 
RUN groupadd -r appgroup && useradd -r -g appgroup appuser && \
    chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000
CMD ["npm", "start"]
