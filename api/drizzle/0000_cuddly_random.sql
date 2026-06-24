CREATE TYPE "public"."product_status" AS ENUM('available', 'made_to_order', 'sold_out', 'coming_soon');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "inquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"product_slug" varchar(255),
	"subject" varchar(255),
	"message" text NOT NULL,
	"handled" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"tagline" varchar(255),
	"description" text,
	"price" numeric(10, 2) DEFAULT '0' NOT NULL,
	"currency" varchar(8) DEFAULT 'USD' NOT NULL,
	"category_id" integer,
	"shape" varchar(64),
	"length" varchar(64),
	"pieces" integer DEFAULT 10,
	"materials" text,
	"status" "product_status" DEFAULT 'available' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"image" varchar(512),
	"gallery" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"theme" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;