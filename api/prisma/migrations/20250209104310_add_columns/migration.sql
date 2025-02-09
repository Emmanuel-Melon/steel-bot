-- CreateTable
CREATE TABLE "Column" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "MessageType" NOT NULL DEFAULT 'QUESTION',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Column_channelId_key" ON "Column"("channelId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Column"("channelId") ON DELETE RESTRICT ON UPDATE CASCADE;
