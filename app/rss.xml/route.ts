import { generateRegistryRssFeed } from "@wandry/analytics-sdk";
import type { NextRequest } from "next/server";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
    const baseUrl = new URL(request.url).origin;

    const rssXml = await generateRegistryRssFeed({
        baseUrl,
        rss: {
            title: "@glass-ui",
            description: "Subscribe to @glass-ui updates",
            link: "https://glass-ui.crenspire.com",
            pubDateStrategy: "githubLastEdit",
        },
        github: {
            owner: "akshaypjoshi",
            repo: "crenspire/glass-ui",
            token: process.env.GITHUB_TOKEN,
        },
        componentsUrl: '/docs/components'
    });

    if (!rssXml) {
        return new Response("RSS feed not available", {
            status: 404,
            headers: { "Content-Type": "text/plain" },
        });
    }

    return new Response(rssXml, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control":
                "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}
