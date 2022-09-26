-- CreateEnum
CREATE TYPE "UserRoleEnum" AS ENUM ('SUPERADMIN', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "LibraryUserAccountRoleEnum" AS ENUM ('OWNER', 'LIBRARIAN', 'MEMBER');

-- CreateEnum
CREATE TYPE "GenderEnum" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'UNSPECIFIED');

-- CreateEnum
CREATE TYPE "BookTypeEnum" AS ENUM ('HARDCOVER', 'PAPERBACK', 'AUDIO_BOOK', 'EBOOK', 'NEWSPAPER', 'MAGAZINE', 'JOURNAL');

-- CreateTable
CREATE TABLE "Library" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deleted" TIMESTAMPTZ(6),
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibraryUserAccount" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deleted" TIMESTAMPTZ(6),
    "userId" UUID NOT NULL,
    "role" "LibraryUserAccountRoleEnum" NOT NULL DEFAULT 'MEMBER',
    "libraryId" UUID NOT NULL,

    CONSTRAINT "LibraryUserAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "prefix" VARCHAR(10) NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "middleName" VARCHAR(50),
    "lastName" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "gender" "GenderEnum" NOT NULL DEFAULT 'UNSPECIFIED',
    "dateOfBirth" DATE,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deleted" TIMESTAMPTZ(6),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" UUID NOT NULL,
    "role" "UserRoleEnum" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deleted" TIMESTAMPTZ(6),
    "userId" UUID NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" UUID NOT NULL,
    "streetAddress" VARCHAR(500) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "zipCode" VARCHAR(10) NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deleted" TIMESTAMPTZ(6),

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibraryBook" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deleted" TIMESTAMPTZ(6),
    "bookId" UUID NOT NULL,
    "libraryId" UUID NOT NULL,
    "createdById" UUID NOT NULL,

    CONSTRAINT "LibraryBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" UUID NOT NULL,
    "isbn" VARCHAR(50) NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "language" VARCHAR(50) NOT NULL,
    "numberOfPages" INTEGER NOT NULL,
    "bookType" "BookTypeEnum" NOT NULL,
    "publishedOn" DATE NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deleted" TIMESTAMPTZ(6),
    "createdById" UUID NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deleted" TIMESTAMPTZ(6),
    "name" VARCHAR(400) NOT NULL,
    "website" VARCHAR(400) NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" UUID NOT NULL,
    "prefix" VARCHAR(20) NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "middleName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "gender" "GenderEnum" NOT NULL DEFAULT 'UNSPECIFIED',
    "dateOfBirth" DATE,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deleted" TIMESTAMPTZ(6),

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookBorrowLog" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deleted" TIMESTAMPTZ(6),
    "dueDate" DATE NOT NULL,
    "returnDate" DATE NOT NULL,
    "borrowedById" UUID NOT NULL,
    "libraryBookId" UUID,

    CONSTRAINT "BookBorrowLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookFineTransaction" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deleted" TIMESTAMPTZ(6),
    "amountPaid" REAL NOT NULL,
    "bookBorrowLogId" UUID NOT NULL,

    CONSTRAINT "BookFineTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AddressToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AddressToLibrary" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AddressToPublisher" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_BookToPublisher" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AuthorToBook" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Author_phone_key" ON "Author"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "BookFineTransaction_bookBorrowLogId_key" ON "BookFineTransaction"("bookBorrowLogId");

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToUser_AB_unique" ON "_AddressToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToUser_B_index" ON "_AddressToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToLibrary_AB_unique" ON "_AddressToLibrary"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToLibrary_B_index" ON "_AddressToLibrary"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToPublisher_AB_unique" ON "_AddressToPublisher"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToPublisher_B_index" ON "_AddressToPublisher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToPublisher_AB_unique" ON "_BookToPublisher"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToPublisher_B_index" ON "_BookToPublisher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToBook_AB_unique" ON "_AuthorToBook"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToBook_B_index" ON "_AuthorToBook"("B");

-- AddForeignKey
ALTER TABLE "LibraryUserAccount" ADD CONSTRAINT "LibraryUserAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryUserAccount" ADD CONSTRAINT "LibraryUserAccount_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryBook" ADD CONSTRAINT "LibraryBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryBook" ADD CONSTRAINT "LibraryBook_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryBook" ADD CONSTRAINT "LibraryBook_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "LibraryUserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "LibraryUserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookBorrowLog" ADD CONSTRAINT "BookBorrowLog_borrowedById_fkey" FOREIGN KEY ("borrowedById") REFERENCES "LibraryUserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookBorrowLog" ADD CONSTRAINT "BookBorrowLog_libraryBookId_fkey" FOREIGN KEY ("libraryBookId") REFERENCES "LibraryBook"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookFineTransaction" ADD CONSTRAINT "BookFineTransaction_bookBorrowLogId_fkey" FOREIGN KEY ("bookBorrowLogId") REFERENCES "BookBorrowLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToUser" ADD CONSTRAINT "_AddressToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToUser" ADD CONSTRAINT "_AddressToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToLibrary" ADD CONSTRAINT "_AddressToLibrary_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToLibrary" ADD CONSTRAINT "_AddressToLibrary_B_fkey" FOREIGN KEY ("B") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToPublisher" ADD CONSTRAINT "_AddressToPublisher_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToPublisher" ADD CONSTRAINT "_AddressToPublisher_B_fkey" FOREIGN KEY ("B") REFERENCES "Publisher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToPublisher" ADD CONSTRAINT "_BookToPublisher_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToPublisher" ADD CONSTRAINT "_BookToPublisher_B_fkey" FOREIGN KEY ("B") REFERENCES "Publisher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToBook" ADD CONSTRAINT "_AuthorToBook_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToBook" ADD CONSTRAINT "_AuthorToBook_B_fkey" FOREIGN KEY ("B") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
