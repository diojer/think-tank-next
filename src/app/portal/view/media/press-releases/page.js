import ViewPosts from "@/app/portal/view/posts/viewPosts";

export default async function ViewPressReleases() {
    const type = "press-release";
    return await ViewPosts(type, "/media/press-releases");
}

