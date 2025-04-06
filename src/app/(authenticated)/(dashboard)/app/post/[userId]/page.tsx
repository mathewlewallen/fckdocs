import { api } from '@fck/server/trpc/server';
import type { RouterOutputs } from '@fck/server/trpc/shared';
import type { IconNames } from '@fck/components/ui/icon';
import { Icon } from '@fck/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@fck/components/ui/tabs';
import { Textarea } from '@fck/components/ui/textarea';
import {
  ClockIcon,
  DiamondIcon,
  PenLineIcon,
  RadicalIcon,
  WeightIcon,
} from 'lucide-react';
import { redirect } from 'next/navigation';
import { format } from 'timeago.js';

interface Props {
  params: {
    userId: string;
  };
}

type PostByIdOutput = RouterOutputs['post']['list'];

export default async function PostPage(props: {
  params: any; post: PostByIdOutput 
}) {
  let { post } = props;
  try {
    post = await api.post.list({ text: props.params.userId }); 
  } catch {
    redirect('/not-found');
  }

  return (
    <div className="flex flex-1 gap-6">
      <div className="flex-1">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <Icon
              name={
                post.items[0].icon === 'default'
                  ? 'Folder'
                  : (post.items[0].icon as IconNames)
              }
              size={28}
              strokeWidth={1.5}
            />
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <h1 className="text-3xl font-medium">{post.items[0].name}</h1>
            <div className="flex items-start gap-6">
              <p className="flex items-center gap-2 text-sm text-foreground-muted">
                <RadicalIcon size={15} /> {post.items[0].code}
              </p>
              <p className="flex items-center gap-2 text-sm text-foreground-muted">
                <WeightIcon size={15} /> {post.items[0].credits} credits
              </p>
              <p className="flex items-center gap-2 text-sm text-foreground-muted">
                <ClockIcon size={15} /> Created {format(post.items[0].createdAt)}
              </p>
              <p className="flex items-center gap-2 text-sm text-foreground-muted">
                <PenLineIcon size={15} /> 0 Notebooks
              </p>
              <p className="flex items-center gap-2 text-sm text-foreground-muted">
                <DiamondIcon size={15} /> 0 Flashcards
              </p>
            </div>
          </div>
        </div>
        <Tabs defaultValue="notes" className="mt-4 w-full">
          <TabsList className="w-full">
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <PenLineIcon size={15} />
              Notebooks
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="flex items-center gap-2">
              <DiamondIcon size={15} />
              Flashcards
            </TabsTrigger>
          </TabsList>
          <TabsContent value="notes">
            <div>Notes</div>
          </TabsContent>
          <TabsContent value="flashcards">
            <div>Flashcards</div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="min-w-[280px] rounded-lg border p-4">
        <div className="flex flex-col gap-3">
          <h2 className="font-medium">Description</h2>
          <Textarea
            value={post.items[0].text ?? ''}
            readOnly
            className="resize-none"
          />
        </div>
      </div>
    </div>
  );
}
