import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";
import { postgres } from "emdash/db";

// totrieu.com plugins
import { tradingPlugin } from "emdash-trading";
import { communityPlugin } from "emdash-community";
import { lmsPlugin } from "emdash-lms";

export default defineConfig({
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	integrations: [
		react(),
		emdash({
			database: postgres({
				connectionString: process.env.DATABASE_URL || "postgres://localhost:5432/emdash_dev",
			}),
			plugins: [
				tradingPlugin(),
				communityPlugin(),
				lmsPlugin(),
			],
		}),
	],
	devToolbar: { enabled: false },
});
