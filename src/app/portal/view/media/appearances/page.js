import ViewPosts from "@/app/portal/view/posts/viewPosts";

export default async function ViewMediaApps() {
    const type = "media-appearance";
    return await ViewPosts(type, "/media/appearances");
}

