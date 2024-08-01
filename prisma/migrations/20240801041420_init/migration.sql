-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "columnId" INTEGER NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "user" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Column" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "boardId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Insert default record into Board
INSERT INTO "Board" ("title", "description", "createdAt", "updatedAt")
VALUES ('Kanban-Prisma-Test', 'Initial default board', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert default records into Column
INSERT INTO "Column" ("id", "title", "position", "boardId", "createdAt", "updatedAt")
VALUES 
    (1, 'To Do', 0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'In Process', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Done', 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'Waiting', 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);