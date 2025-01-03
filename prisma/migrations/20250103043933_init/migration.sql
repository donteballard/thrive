-- CreateTable
CREATE TABLE "StakingTier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "requiredTokens" INTEGER NOT NULL,
    "benefits" TEXT[],
    "color" TEXT NOT NULL,
    "apy" DOUBLE PRECISION NOT NULL,
    "lockPeriod" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StakingTier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStaking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenBalance" INTEGER NOT NULL,
    "stakedAmount" INTEGER NOT NULL,
    "tierId" TEXT NOT NULL,
    "stakingApy" DOUBLE PRECISION NOT NULL,
    "nextReward" INTEGER NOT NULL,
    "nextRewardDate" TIMESTAMP(3) NOT NULL,
    "lockEndDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStaking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stakingId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RewardTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StakingStats" (
    "id" TEXT NOT NULL,
    "totalStaked" INTEGER NOT NULL,
    "averageApy" DOUBLE PRECISION NOT NULL,
    "totalStakers" INTEGER NOT NULL,
    "tvl" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StakingStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserStaking_userId_idx" ON "UserStaking"("userId");

-- CreateIndex
CREATE INDEX "UserStaking_tierId_idx" ON "UserStaking"("tierId");

-- CreateIndex
CREATE INDEX "RewardTransaction_userId_idx" ON "RewardTransaction"("userId");

-- CreateIndex
CREATE INDEX "RewardTransaction_stakingId_idx" ON "RewardTransaction"("stakingId");

-- AddForeignKey
ALTER TABLE "UserStaking" ADD CONSTRAINT "UserStaking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStaking" ADD CONSTRAINT "UserStaking_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "StakingTier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardTransaction" ADD CONSTRAINT "RewardTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardTransaction" ADD CONSTRAINT "RewardTransaction_stakingId_fkey" FOREIGN KEY ("stakingId") REFERENCES "UserStaking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
