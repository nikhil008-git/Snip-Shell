interface SnipShellIntro {
  id: number;
  title: string;
  description: string;
}


export const snipShellIntro: SnipShellIntro[] = [
  {
    id: 1,
    title: "Save Anything Instantly",
    description:
      "Store tweets, YouTube links, articles, or any URL with one click — all in one clean dashboard."
  },
  {
    id: 2,
    title: "Your Personal Watch-Later Hub",
    description:
      "Collect content you want to see later without losing it in bookmarks or DMs."
  },
  {
    id: 3,
    title: "Share Your Saved Collection",
    description:
      "Share a read-only version of your saved URLs with friends — they can view, not edit."
  },
  {
    id: 4,
    title: "Minimal & Fast Interface",
    description:
      "A distraction-free place to store and organize content without ads or noise."
  },
  {
    id: 5,
    title: "All Content Types Supported",
    description:
      "Tweets, threads, YouTube videos, tutorials, blog posts, tools — save anything."
  }
];

export const environment = import.meta.env.VITE_ENV;
export const API_URL = environment === "development" ? "http://localhost:3000" : import.meta.env.VITE_API_URL ;