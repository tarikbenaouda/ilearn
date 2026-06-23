import React from 'react';
import type { TextBlockData } from '../lesson.types';
import { renderKatex } from '../utils/renderKatex';

interface Props {
  block: TextBlockData;
}

export function TextBlock({ block }: Props) {
  return (
    <div dir="rtl" className="my-5">
      {block.title && (
        <h3 className="text-xl font-bold mb-3 text-foreground tracking-wide">
          {block.title}
        </h3>
      )}

      <div className="text-base leading-8 text-foreground/85">
        {block.image && (
          <img
            src={block.image}
            alt=""
            // float-left = physical left = "end" in RTL — text wraps on the right.
            // mr-4 adds physical right margin (the gap between image and Arabic text).
            className="float-left mr-4 mb-3 rounded-xl max-w-[42%] object-contain shadow-sm"
          />
        )}
        {renderKatex(block.content)}
        {block.image && <div className="clear-both" />}
      </div>
    </div>
  );
}
