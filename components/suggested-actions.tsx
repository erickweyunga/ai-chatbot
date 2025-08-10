'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';
import type { VisibilityType } from './visibility-selector';
import type { ChatMessage } from '@/lib/types';

interface SuggestedActionsProps {
  chatId: string;
  sendMessage: UseChatHelpers<ChatMessage>['sendMessage'];
  selectedVisibilityType: VisibilityType;
}

function PureSuggestedActions({
  chatId,
  sendMessage,
  selectedVisibilityType,
}: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'Verify CCM election victory',
      label: 'CCM won 99% of village seats in 2024',
      action:
        "CCM won 99% of all village chairperson positions in Tanzania's November 2024 local government elections, while opposition parties like Chadema barely secured 1% of seats.",
    },
    {
      title: 'Check President Hassan claim',
      label: 'First female president in East Africa',
      action:
        'President Samia Suluhu Hassan is the first female president in East African history and the only current female head of state in Africa.',
    },
    {
      title: 'Fact-check Tundu Lissu case',
      label: 'Opposition leader serving prison sentence',
      action:
        "Under President Samia Hassan's administration, opposition leader Tundu Lissu has been arrested seven times in 2024 and is currently serving a 15-year prison sentence for sedition and money laundering charges handed down by the High Court in December 2024.",
    },
    {
      title: 'Verify electoral commission',
      label: 'Independent commission with full autonomy',
      action:
        'President Samia Hassan established an Independent National Electoral Commission (INEC) in 2024 that has full autonomy from the presidency in appointing commissioners and overseeing elections.',
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className="grid sm:grid-cols-2 gap-2 w-full"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              sendMessage({
                role: 'user',
                parts: [{ type: 'text', text: suggestedAction.action }],
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) return false;
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType)
      return false;

    return true;
  },
);
