import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || '5000',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Rjn6X1uHyVkZ@ep-misty-sea-a5sg3n1j-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL || 'https://trusting-killdeer-223052.upstash.io',
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || 'gQAAAAAAA2dMAAIgcDJiMmVmNmY0MmQ2ZjM0ODUzYWQ0MGVmZThmZTVjMDJhNg',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'AQ.Ab8RN6JHAzKtBbIvgmjEjkPNCWwo6FkKd7CIj7Dz9tMPRMUMlg',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',
  HUGGINGFACE_TOKEN: process.env.HUGGINGFACE_TOKEN || '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',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'owocjjt1',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '781682695621497',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'JD8yEvVaxEfNupMqD3fSDopO_d0',
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || 'rzp_test_kala_setu_demo',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_dummy_kala_setu',
  JWT_SECRET: process.env.JWT_SECRET || 'kala_setu_jwt_secure_key_2026_sih_hackathon',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
