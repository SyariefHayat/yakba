"use client";

import { toast } from "sonner";
import { useState } from "react";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const Page = () => {
  const [contentHtml, setContentHtml] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    if (!contentHtml.trim()) {
      alert("Konten artikel masih kosong.");
      return;
    }

    try {
      setIsPublishing(true);

      const parser = new DOMParser();
      const doc = parser.parseFromString(contentHtml, "text/html");

      const firstImg = doc.querySelector("img");
      const thumbnailUrl = firstImg?.getAttribute("src") || "";

      if (firstImg) {
        firstImg.remove();
      }

      const firstH1 = doc.querySelector("h1");
      const title = firstH1?.textContent?.trim() || "Artikel Tanpa Judul";

      if (firstH1) {
        firstH1.remove();
      }

      let tags: string[] = [];
      const paragraphs = Array.from(doc.querySelectorAll("p"));
      for (const p of paragraphs) {
        const text = p.textContent?.trim() || "";
        if (/^tags?\s*[:\-]/i.test(text)) {
          const cleaned = text.replace(/^tags?\s*[:\-]\s*/i, "");

          tags = cleaned
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

          p.remove();
          break;
        }
      }

      const cleanedContentHtml = doc.body.innerHTML.trim();

      const plainText = doc.body.textContent?.trim() || "";
      const excerpt =
        plainText.length > 200 ? plainText.slice(0, 200) + "..." : plainText;

      const payload = {
        title,
        slug: slugify(title),
        excerpt,
        contentHtml: cleanedContentHtml || contentHtml,
        thumbnailUrl,
        tags,
        author: "6924670cb10f0bd7f9b3381e",
      };

      const res = await fetch("/api/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));

        console.error("Gagal publish artikel:", error);
        toast.error(error.message || "Gagal publish artikel", {
          duration: 3000,
        });
        return;
      }

      toast.success("Artikel berhasil dipublish!");
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat publish artikel.", {
        duration: 3000,
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-4 flex flex-col gap-4">
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={handlePublish}
          disabled={isPublishing || !contentHtml.trim()}
          className="rounded-lg px-4 py-2 text-sm font-medium text-white bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPublishing ? "Publishing..." : "Publish Artikel"}
        </button>
      </div>

      <div className="flex-1">
        <SimpleEditor
          initialContent={contentHtml}
          onChange={(html) => setContentHtml(html)}
        />
      </div>
    </div>
  );
};

export default Page;
