module.exports = {
  apps: [
    {
      name: 'rentoride-backend',
      script: './apps/server/dist/index.js',
      // PM2 will inject these variables directly into your application
      env: {
        NODE_ENV: 'development',
        // --- PASTE YOUR VALUES FROM .env HERE ---
        DATABASE_URL: "postgresql://postgres:mysecretpassword@localhost:5432/rentoride?schema=public",
        AWS_REGION: "ap-south-1",
        AWS_COGNITO_USER_POOL_ID: "ap-south-1_xvXnPl34W",
        AWS_COGNITO_CLIENT_ID: "m0cmdbqt383eq081tvq2fqdvi",
      },
    },
  ],
};