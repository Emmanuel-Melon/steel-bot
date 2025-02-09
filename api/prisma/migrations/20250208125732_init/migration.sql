-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('QUESTION', 'FEEDBACK', 'FEATURE_REQUEST');

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "MessageType" NOT NULL DEFAULT 'QUESTION',
    "categories" TEXT[],
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "solution" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_messageId_key" ON "Message"("messageId");
