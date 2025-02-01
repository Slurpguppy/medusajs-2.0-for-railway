NODE_ENV=development
# REDIS_URL=redis://localhost:6379 # Optional - falls back to simulated redis
ADMIN_CORS=http://localhost:7000,http://localhost:7001,https://docs.medusajs.com
STORE_CORS=http://localhost:8000,https://docs.medusajs.com
AUTH_CORS=http://localhost:7000,http://localhost:7001,https://docs.medusajs.com
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
DATABASE_URL=postgresql://postgres:kuAWQhHGODPtLItYwncCHydNBqUHYaqu@junction.proxy.rlwy.net:31513/railway

MEDUSA_ADMIN_EMAIL=admin@yourmail.com
MEDUSA_ADMIN_PASSWORD=supersecret

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

SENDGRID_API_KEY=
SENDGRID_FROM=

# MinIO Storage Configuration (Optional - falls back to local storage)
# MINIO_ENDPOINT=your-minio-endpoint
# MINIO_ACCESS_KEY=your-access-key
# MINIO_SECRET_KEY=your-secret-key
# MINIO_BUCKET=custom-bucket-name # Optional - defaults to 'medusa-media'

# Meilisearch Configuration (Optional)
# MEILISEARCH_HOST=your-meilisearch-host # e.g. http://localhost:7700
# MEILISEARCH_API_KEY=your-master-key



# To run localy, remove .template from .env, the copy this file to .env.
# if you get npm install error, use :npm install --legacy-peer-deps: insted

#run in order.

#npm run build
#npm run start

