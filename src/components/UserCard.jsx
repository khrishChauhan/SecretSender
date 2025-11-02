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
        } catch (err) {
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
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to Redirect",
                variant: "destructive",
            });
        }
    };



    return (
        <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 rounded-2xl bg-white">
            <CardContent className="px-5 md:p-5">
                <h1 className="text-2xl sm:text-left sm:text-2xl text-center font-semibold warp-break-words text-gray-800">
                    @{username}
                </h1>

                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pt-4">
                    <p className="text-sm bg-[#101828] rounded-md px-2 py-1 text-gray-200 break-all text-center sm:text-left">
                        {profileUrl}
                    </p>

                    <div className="flex justify-center sm:justify-end gap-2">
                        <Button
                            onClick={copyToClipboard}
                            className="rounded-md px-3 py-1"
                            variant="default"
                        >
                            🔗
                        </Button>
                        <Button
                            onClick={goToSendMessage}
                            className="rounded-md px-3 py-1"
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
