import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Lightbulb } from 'lucide-react';

interface ExplanationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
}

export function ExplanationDialog({ 
  isOpen, 
  onOpenChange, 
  title = "شرح الإجابة",
  children 
}: ExplanationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-right" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full text-amber-600 dark:text-amber-500">
              <Lightbulb className="w-5 h-5" />
            </div>
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed pt-4">
          {children}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
