-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "previewUrl" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "votes" INTEGER NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,
    "revenue" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "launch" TIMESTAMP(3) NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL,
    "genres" TEXT[],

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
