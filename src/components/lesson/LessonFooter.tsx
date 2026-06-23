import { Button } from '@/components/ui/button';
import { CheckCircle2, HelpCircle, ArrowLeft, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type LessonStatus = 'idle' | 'correct' | 'incorrect';

interface LessonFooterProps {
  status: LessonStatus;
  onCheck: () => void;
  onContinue: () => void;
  onWhy?: () => void;
  isCheckDisabled?: boolean;
}

export function LessonFooter({
  status,
  onCheck,
  onContinue,
  onWhy,
  isCheckDisabled = false,
}: LessonFooterProps) {
  return (
    // Full-width bar — spans both columns, not nested in either panel
    <div className="h-20 border-t bg-background shrink-0 shadow-[0_-2px_12px_-4px_rgba(0,0,0,0.08)] relative">

      {/* Status feedback — floats on the right side (RTL: left edge visually) */}
      <div className="absolute inset-y-0 right-6 flex items-center">
        <AnimatePresence mode="wait">
          {status === 'correct' && (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-sm"
            >
              <div className="bg-green-100 dark:bg-green-900/40 p-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              عمل رائع!
            </motion.div>
          )}
          {status === 'incorrect' && (
            <motion.div
              key="err"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: [0, -4, 4, -4, 4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm"
            >
              <div className="bg-red-100 dark:bg-red-900/40 p-1.5 rounded-full">
                <XCircle className="w-4 h-4" />
              </div>
              حاول مرة أخرى
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons — absolutely centered across the full footer width */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {status !== 'correct' ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
            >
              <Button
                className="min-w-[140px] font-bold h-10 rounded-xl bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/25 disabled:opacity-40"
                onClick={onCheck}
                disabled={isCheckDisabled}
              >
                تحقق
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="continue"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="flex items-center gap-3"
            >
              {onWhy && (
                <Button
                  variant="outline"
                  className="h-10 px-4 rounded-xl border-2 border-violet-300 font-bold gap-1.5 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 dark:text-violet-400 dark:border-violet-700"
                  onClick={onWhy}
                >
                  <HelpCircle className="w-4 h-4" />
                  لماذا؟
                </Button>
              )}
              <Button
                className="min-w-[140px] font-bold h-10 rounded-xl bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/25 gap-1.5"
                onClick={onContinue}
              >
                تابع
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
