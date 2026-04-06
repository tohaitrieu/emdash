import node from "@astrojs/node";
import react from "@astrojs/react";
import { ecommercePlugin } from "@emdash-cms/plugin-ecommerce";
import { instrumentsPlugin } from "@emdash-cms/plugin-instruments";
import { defineConfig } from "astro/config";
import emdash, { s3 } from "emdash/astro";
import { postgres } from "emdash/db";
import { loadEnv } from "vite";

// Load env vars for config
const env = loadEnv("", process.cwd(), "");

export default defineConfig({
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	integrations: [
		react(),
		emdash({
			database: postgres({
				// Connection string from environment
				connectionString: env.DATABASE_URL,
			}),
			storage: s3({
				endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
				bucket: "totrieu-media",
				accessKeyId: env.R2_ACCESS_KEY_ID,
				secretAccessKey: env.R2_SECRET_ACCESS_KEY,
				publicUrl: "https://media.totrieu.com",
			}),
			plugins: [instrumentsPlugin(), ecommercePlugin()],
		}),
	],
	devToolbar: { enabled: false },
});
