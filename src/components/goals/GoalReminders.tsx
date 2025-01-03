'use client';

import { useEffect } from 'react';
import { Goal } from '@/types/goals';

export function useGoalReminders(goals: Goal[]) {
  useEffect(() => {
    if (!goals.length) return;

    // Function to check if a notification should be sent
    const shouldNotify = (goal: Goal) => {
      if (!goal.dueDate) return false;
      
      const now = new Date();
      const dueDate = new Date(goal.dueDate);
      const daysDiff = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      // Notify 7 days before
      if (daysDiff === 7) return true;
      // Notify 1 day before
      if (daysDiff === 1) return true;
      // Notify on due date
      if (daysDiff === 0) return true;
      // Notify if overdue
      if (daysDiff < 0 && goal.status !== 'Completed') return true;
      
      return false;
    };

    // Function to send notification
    const sendNotification = (goal: Goal) => {
      if (!('Notification' in window)) return;
      
      const getDueMessage = (goal: Goal) => {
        const dueDate = new Date(goal.dueDate);
        const now = new Date();
        const daysDiff = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 7) return 'due in 7 days';
        if (daysDiff === 1) return 'due tomorrow';
        if (daysDiff === 0) return 'due today';
        if (daysDiff < 0) return `overdue by ${Math.abs(daysDiff)} days`;
        return 'upcoming';
      };

      const message = `${goal.title} is ${getDueMessage(goal)}`;
      
      new Notification('Goal Reminder', {
        body: message,
        icon: '/favicon.ico'
      });
    };

    // Check goals and send notifications
    goals.forEach(goal => {
      if (shouldNotify(goal)) {
        sendNotification(goal);
      }
    });

    // Set up daily check
    const checkInterval = setInterval(() => {
      goals.forEach(goal => {
        if (shouldNotify(goal)) {
          sendNotification(goal);
        }
      });
    }, 24 * 60 * 60 * 1000); // Check every 24 hours

    return () => {
      clearInterval(checkInterval);
    };
  }, [goals]);
} 