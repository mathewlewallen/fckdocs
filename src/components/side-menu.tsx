import { api } from '@fck/server/trpc/server';
import {
  CircleHelpIcon,
  DiamondIcon,
  HomeIcon,
  MessageSquareMore,
  PenLineIcon,
} from 'lucide-react';
import Image from 'next/image';
import { ActiveButton } from './active-button';
import { CreateModulePopover } from './create-module-popover';
import type { IconNames } from '@fck/components/ui/icon';
import { Icon } from '@fck/components/ui/icon';
import { Button } from '@fck/components/ui/button';
import { constants } from '@fck/constants';

const iconSize = 15;

const sideMenuStaticLinks = [
  {
    icon: <HomeIcon size={iconSize} />,
    label: 'Home',
    href: '/app',
  },
  {
    icon: <PenLineIcon size={iconSize} />,
    label: 'Notebooks',
    href: '/app/notes',
  },
  {
    icon: <DiamondIcon size={iconSize} />,
    label: 'Flashcards',
    href: '/app/flashcards',
  },
];

export async function SideMenu() {
  const posts = await api.post.getPostsByUser();

  return (
    <aside className="flex w-[200px] flex-col justify-between gap-8">
      <div>
        <div className="flex items-center gap-3 pl-3 pt-4">
          <Image src="/logo.svg" width={35} height={35} alt="Noodle Logo" />
          <span>Noodle</span>
        </div>

        <ul className="mt-8 flex flex-col">
          {sideMenuStaticLinks.map(({ icon, label, href }) => (
            <li key={label} className="flex flex-1 flex-col">
              <ActiveButton icon={icon} label={label} href={href} />
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between pl-4">
            <h3 className="text-xs text-gray">Posts</h3>
            <CreateModulePopover />
          </div>
          <ul className="flex flex-col">
            {posts
              .sort((a, b) => {
                return (
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
                );
              })
              .map((post) => (
                <li key={post.id} className="flex flex-1 flex-col">
                  <ActiveButton
                    href={`/app/module/${post.id}`}
                    icon={
                      <Icon
                        name={
                          post.icon === 'default'
                            ? 'Folder'
                            : (post.icon as IconNames)
                        }
                        size={15}
                        strokeWidth={1.5}
                      />
                    }
                    label={post.name}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="mb-6 flex flex-col">
        <Button
          variant="ghost"
          className="justify-start gap-3 font-normal"
          asChild
        >
          <a
            href={constants.feedback}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquareMore size={15} strokeWidth={1.5} /> Feedback
          </a>
        </Button>
        <Button
          variant="ghost"
          className="justify-start gap-3 font-normal"
          asChild
        >
          <a href={constants.support} target="_blank" rel="noopener noreferrer">
            <CircleHelpIcon size={15} strokeWidth={1.5} /> Help & Support
          </a>
        </Button>
      </div>
    </aside>
  );
}
