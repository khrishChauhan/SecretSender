"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function UserCard({ username }) {
  const profileUrl = `${window.location.origin}/u/${username}`;
  const router = useRouter();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      toast({
        title: "Link Copied!",
        description: "Profile link copied to clipboard.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to copy link.",
        variant: "destructive",
      });
    }
  };

  const goToSendMessage = async () => {
    try {
      router.push(`/u/${username}`);
      toast({
        title: "Redirecting...",
        description: `Opening ${username}'s message page.`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to redirect.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl border border-gray-700/40 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 bg-gray-900 text-white transition-all duration-300">
      <CardContent className="px-5 py-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center sm:text-left text-indigo-300 break-words">
          @{username}
        </h1>

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <p className="text-sm bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-gray-300 text-center sm:text-left break-all">
            {profileUrl}
          </p>

          <div className="flex justify-center sm:justify-end gap-2">
            <Button
              onClick={copyToClipboard}
              className="rounded-md px-3 bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200"
              variant="default"
            >
              🔗
            </Button>
            <Button
              onClick={goToSendMessage}
              className="rounded-md px-3 bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200"
              variant="default"
            >
              Send Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
