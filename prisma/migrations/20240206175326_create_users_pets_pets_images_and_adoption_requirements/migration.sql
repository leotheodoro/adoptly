-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "energy_level" INTEGER NOT NULL,
    "independence_level" INTEGER NOT NULL,
    "ambient_type" TEXT NOT NULL,
    "is_adopted" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet_images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pet_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoption_requirements" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "adoption_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_images" ADD CONSTRAINT "pet_images_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption_requirements" ADD CONSTRAINT "adoption_requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
