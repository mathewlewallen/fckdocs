import { api } from "@fck/server/trpc/server";
import Link from "next/link";
import { WelcomeMessage } from "@fck/components/welcome-message";
import { RecentPosts } from "@fck/components/recent-posts";

type PageProps = {
  params: { userId: string };
};

export default async function DashboardHome({ params }: PageProps) {
  const userPosts = await api.post.list({ text: params.userId });

  if (!userPosts?.items?.length) {
    return (
      <div className="flex flex-col items-center">
        <div>No posts found by this user.</div>
        <Link href="/" className="mt-2 text-primary underline">
          &larr; Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 gap-6">
      <div className="flex-1">
        <WelcomeMessage />
        <RecentPosts posts={userPosts.items.slice(0, 4)} />
      </div>
      <div className="min-w-[280px] rounded-lg border p-4">Right side</div>
    </div>
  );
}