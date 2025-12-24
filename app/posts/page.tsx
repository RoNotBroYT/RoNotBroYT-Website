"use client";
import { useUser, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Pin, Bold, Italic, Underline, Trash2, Link as LinkIcon } from "lucide-react";
import { useIsEditor } from "@/hooks/use-is-editor";

type Post = {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  author_id: string;
  created_at: string;
  updated_at: string;
};

type Formats = { bold: boolean; italic: boolean; underline: boolean; link: boolean };

function formatContent(content: string, formats: Formats, linkUrl?: string) {
  let formatted = content;
  if (formats.bold) formatted = `<b>${formatted}</b>`;
  if (formats.italic) formatted = `<i>${formatted}</i>`;
  if (formats.underline) formatted = `<u>${formatted}</u>`;
  if (formats.link && linkUrl) formatted = `<a href="${linkUrl}" target="_blank" rel="noopener">${formatted}</a>`;
  return formatted;
}

export default function PostsPage() {
  const { user } = useUser();
  const isEditor = useIsEditor(user);
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [formats, setFormats] = useState<Formats>({ bold: false, italic: false, underline: false, link: false });
  const [linkUrl, setLinkUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });
    setPosts(data || []);
  }

  async function createPost() {
    if (!user) return;
    setLoading(true);
    await supabase.from("posts").insert({
      title,
      content: formatContent(content, formats, linkUrl),
      author_id: user.id,
      pinned: false,
    });
    setTitle("");
    setContent("");
    setFormats({ bold: false, italic: false, underline: false, link: false });
    setLinkUrl("");
    setLoading(false);
    fetchPosts();
  }

  async function pinPost(id: string, pinned: boolean) {
    await supabase.from("posts").update({ pinned: !pinned }).eq("id", id);
    fetchPosts();
  }

  async function deletePost(id: string) {
    await supabase.from("posts").delete().eq("id", id);
    fetchPosts();
  }

  return (
    <div className="flex flex-col items-center py-12 gap-8">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <SignedOut>
        <Card className="p-6 flex flex-col items-center">
          <p className="mb-4">Sign in to create and manage posts.</p>
          <SignInButton mode="modal" />
        </Card>
      </SignedOut>
      <SignedIn>
        {isEditor && (
          <Card className="p-6 flex flex-col gap-4 w-full max-w-xl mb-8">
            <input
              className="border rounded px-3 py-2 mb-2"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div className="flex items-center gap-2 mb-2">
              <ToggleGroup
                type="multiple"
                value={Object.entries(formats).filter(([k, v]) => v).map(([k]) => k)}
                onValueChange={vals => setFormats({
                  bold: vals.includes("bold"),
                  italic: vals.includes("italic"),
                  underline: vals.includes("underline"),
                  link: vals.includes("link"),
                })}
              >
                <ToggleGroupItem value="bold" aria-label="Bold"><Bold className="w-4 h-4" /></ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic"><Italic className="w-4 h-4" /></ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Underline"><Underline className="w-4 h-4" /></ToggleGroupItem>
                <ToggleGroupItem value="link" aria-label="Link">
                  <LinkIcon className="w-4 h-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            {formats.link && (
              <input
                className="border rounded px-3 py-1 mb-2 mt-2"
                placeholder="Paste link URL here"
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
              />
            )}
            <textarea
              className="border rounded px-3 py-2 mb-2 min-h-[80px]"
              placeholder="Write your post..."
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <Button onClick={createPost} disabled={loading || !title || !content}>
              {loading ? "Posting..." : "Post"}
            </Button>
          </Card>
        )}
      </SignedIn>
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {posts.map(post => (
          <Card key={post.id} className="p-6 relative">
            <div className="flex items-center gap-2 mb-2">
              {post.pinned && <Pin className="text-yellow-500" />}
              <h2 className="text-xl font-semibold">{post.title}</h2>
              {isEditor && (
                <>
                  <Button size="icon" variant="ghost" onClick={() => pinPost(post.id, post.pinned)} title={post.pinned ? "Unpin" : "Pin"} className="ml-2">
                    <Pin className={post.pinned ? "text-yellow-500" : "text-zinc-400"} />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => deletePost(post.id)} title="Delete" className="ml-2">
                    <Trash2 className="text-red-500" />
                  </Button>
                </>
              )}
            </div>
            <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />
            <div className="text-xs text-zinc-400 mt-2">{new Date(post.created_at).toLocaleString()}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
