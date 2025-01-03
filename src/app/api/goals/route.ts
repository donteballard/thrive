import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Goal, GoalFormData } from '@/types/goals';
import { getWalletAddress } from '@/lib/auth';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const walletAddress = await getWalletAddress(request);
    
    let user = await db.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      user = await db.user.create({
        data: { walletAddress },
      });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: Prisma.GoalWhereInput = {
      userId: user.id,
      ...(category && category !== 'All' ? { category } : {}),
      ...(status && status !== 'All' ? { status } : {}),
      ...(search ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
          { description: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
        ],
      } : {}),
    };

    const goals = await db.goal.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(goals);
  } catch (error) {
    console.error('[GOALS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const walletAddress = await getWalletAddress(request);
    
    // Get or create user with mock wallet address
    let user = await db.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      user = await db.user.create({
        data: { walletAddress },
      });
    }

    const body = await request.json();
    const {
      title,
      description,
      category,
      dueDate,
      milestones,
      visibility = 'private',
      allowComments = true,
      allowDuplication = true,
    } = body as GoalFormData;

    if (!title || !description || !category || !dueDate) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const goal = await db.goal.create({
      data: {
        userId: user.id,
        title,
        description,
        category,
        dueDate: new Date(`${dueDate}T23:59:59Z`).toISOString(),
        milestones: milestones || [],
        visibility,
        allowComments,
        allowDuplication,
        progress: 0,
        status: 'Not Started',
      },
    });

    return NextResponse.json(goal);
  } catch (error) {
    console.error('[GOALS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const walletAddress = await getWalletAddress(request);
    
    // Get or create user with mock wallet address
    let user = await db.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      user = await db.user.create({
        data: { walletAddress },
      });
    }

    const { searchParams } = new URL(request.url);
    const goalId = searchParams.get('id');

    if (!goalId) {
      return new NextResponse('Goal ID required', { status: 400 });
    }

    const body = await request.json();
    const goal = await db.goal.findUnique({
      where: {
        id: parseInt(goalId),
        userId: user.id,
      },
    });

    if (!goal) {
      return new NextResponse('Not found', { status: 404 });
    }

    const updatedGoal = await db.goal.update({
      where: {
        id: parseInt(goalId),
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updatedGoal);
  } catch (error) {
    console.error('[GOALS_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const walletAddress = await getWalletAddress(request);
    
    // Get or create user with mock wallet address
    let user = await db.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      user = await db.user.create({
        data: { walletAddress },
      });
    }

    const { searchParams } = new URL(request.url);
    const goalId = searchParams.get('id');

    if (!goalId) {
      return new NextResponse('Goal ID required', { status: 400 });
    }

    const goal = await db.goal.findUnique({
      where: {
        id: parseInt(goalId),
        userId: user.id,
      },
    });

    if (!goal) {
      return new NextResponse('Not found', { status: 404 });
    }

    await db.goal.delete({
      where: {
        id: parseInt(goalId),
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[GOALS_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 