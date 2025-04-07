import { Icon, type IconNames } from '@fck/components/ui/Icon';
import { Skeleton } from '@fck/components/ui/Skeleton';
import Color from 'color';
import Link from 'next/link';
import '@fck/styles/globals.css';
import colors from 'tailwindcss/colors';

interface ModuleCardProps {
  color: string;
  id: string;
  name: string;
  icon: IconNames;
  credits: number;
}

export default function ModuleCard({
  id,
  color,
  name,
  icon,
  credits,
}: ModuleCardProps) {
  const moduleColor =
    color === 'default' ? colors.zinc : colors[color as keyof typeof colors];

  return (
    <li className="shrink-0 basis-full lg:basis-[250px]">
      <Link
        href={`/app/module/${id}`}
        className="flex flex-col gap-2 rounded-xl p-6"
        style={{
          background: `linear-gradient(135deg, ${Color(moduleColor['500'])
            .alpha(0.08)
            .toString()} 0%, ${Color(moduleColor['700'])
            .alpha(0.05)
            .toString()} 100%)`,
          border: `1px solid ${Color(moduleColor['500'])
            .alpha(0.1)
            .toString()}`,
        }}
      >
        <Icon name={icon} strokeWidth={2} size={20} />
        <h3 className="mt-2 font-medium text-lg">{name}</h3>
        <p className="text-gray-foreground-muted text-xs">{credits} Credits</p>
      </Link>
    </li>
  );
}

ModuleCard.Skeleton = function ModuleCardSkeleton({
  animate = true,
  opacity = 100,
}: {
  animate?: boolean;
  opacity?: number;
}) {
  return (
    <li
      className="shrink-0 basis-full lg:basis-[250px]"
      style={{ opacity: `${opacity.toString()}%` }}
    >
      <div className="flex flex-col gap-2 rounded-xl border bg-gray-subtle p-6">
        <Skeleton className="size-5" />
        <Skeleton className="mt-2 h-6 w-full" />
        <Skeleton className="mt-1 h-4 w-[50px]" />
      </div>
    </li>
  );
};
