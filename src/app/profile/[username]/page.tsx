import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/ profile.action";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import ProfilePageClient from "./ProfilePageClient";

type Props = { params: Promise<{ username: string }> };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { username } = await params;
  const user = await getProfileByUsername(username);
  if (!user) return { title: "My Social", description: "Social App" };

  return {
    title: `${user.name ?? user.username}`,
    description: user.bios || `Check out ${user.username}'s profile.`,
  };
}

async function ProfilePageServer({ params }: Props) {
  const { username } = await params;
  const user = await getProfileByUsername(username);

  if (!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}
export default ProfilePageServer;
