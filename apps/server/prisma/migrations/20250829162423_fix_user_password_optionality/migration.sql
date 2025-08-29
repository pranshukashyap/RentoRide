/*
  Warnings:

  - Added the required column `fuelType` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatingCapacity` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmission` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."CarType" AS ENUM ('SEDAN', 'SUV', 'HATCHBACK', 'LUXURY');

-- CreateEnum
CREATE TYPE "public"."Transmission" AS ENUM ('MANUAL', 'AUTOMATIC');

-- CreateEnum
CREATE TYPE "public"."FuelType" AS ENUM ('PETROL', 'DIESEL', 'ELECTRIC');

-- AlterTable
ALTER TABLE "public"."Car" ADD COLUMN     "description" TEXT,
ADD COLUMN     "fuelType" "public"."FuelType" NOT NULL,
ADD COLUMN     "seatingCapacity" INTEGER NOT NULL,
ADD COLUMN     "transmission" "public"."Transmission" NOT NULL,
ADD COLUMN     "type" "public"."CarType" NOT NULL;
