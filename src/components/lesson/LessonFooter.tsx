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
    /**
     * Floats above the content — takes NO layout space.
     * absolute + bottom-6 + inset-x-0: pinned to the bottom center of LessonContainer.
     * pointer-events-none on the wrapper lets clicks pass through the empty area;
     * pointer-events-auto is restored on the actual interactive elements.
     */
    <div className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-2 pointer-events-none z-20">

      {/* Status feedback pill */}
      <AnimatePresence mode="wait">
        {status === 'correct' && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="pointer-events-auto flex items-center gap-2 bg-green-50 dark:bg-green-900/40 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-400 font-bold text-sm px-4 py-1.5 rounded-full shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            عمل رائع!
          </motion.div>
        )}
        {status === 'incorrect' && (
          <motion.div
            key="err"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: [0, -5, 5, -5, 5, 0], scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-auto flex items-center gap-2 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 font-bold text-sm px-4 py-1.5 rounded-full shadow-sm"
          >
            <XCircle className="w-4 h-4 shrink-0" />
            حاول مرة أخرى
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <AnimatePresence mode="wait">
        {status !== 'correct' ? (
          <motion.div
            key="check"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="pointer-events-auto"
          >
            <Button
              className="min-w-[140px] font-bold h-10 rounded-full bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/30 disabled:opacity-40 disabled:shadow-none border-none"
              onClick={onCheck}
              disabled={isCheckDisabled}
            >
              تحقق
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="continue"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="pointer-events-auto flex items-center gap-2"
          >
            {onWhy && (
              <Button
                variant="outline"
                className="h-10 px-5 rounded-full border-2 border-violet-300 font-bold gap-1.5 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 dark:text-violet-400 dark:border-violet-700 shadow-md bg-background"
                onClick={onWhy}
              >
                <HelpCircle className="w-4 h-4" />
                لماذا؟
              </Button>
            )}
            <Button
              className="min-w-[140px] font-bold h-10 rounded-full bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/30 gap-1.5 border-none"
              onClick={onContinue}
            >
              تابع
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
