"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");

type Article = {
  _id: string;
  title: string;
  slug: string;
  contentHtml: string;
  thumbnailUrl?: string;
  tags?: string[];
  author?: string;
};

const Page = () => {
  const params = useParams<{ id: string }>();

  const [article, setArticle] = useState<Article | null>(null);
  const [contentHtml, setContentHtml] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Ambil artikel existing
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/article/${params.id}`);
        if (!res.ok) {
          throw new Error("Gagal mengambil data artikel");
        }

        const data: Article = await res.json();
        setArticle(data);

        // Susun ulang konten untuk editor
        const editorContent = `
          ${data.title ? `<h1>${data.title}</h1>` : ""}
          ${
            data.thumbnailUrl
              ? `<img src="${data.thumbnailUrl}" alt="${data.title}" />`
              : ""
          }
          ${
            data.tags && data.tags.length
              ? `<p>Tags: ${data.tags.join(", ")}</p>`
              : ""
          }
          ${data.contentHtml || ""}
        `.trim();

        setContentHtml(editorContent);
      } catch (error) {
        console.error(error);
        toast.error("Gagal memuat artikel.", { duration: 3000 });
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchArticle();
    }
  }, [params.id]);

  const handleUpdate = async () => {
    if (!contentHtml.trim() || !article) {
      toast.error("Konten artikel masih kosong.");
      return;
    }

    try {
      setIsPublishing(true);

      const parser = new DOMParser();
      const doc = parser.parseFromString(contentHtml, "text/html");

      // Ambil / update thumbnail dari <img> pertama
      const firstImg = doc.querySelector("img");
      const thumbnailUrl =
        firstImg?.getAttribute("src") || article.thumbnailUrl || "";

      if (firstImg) {
        firstImg.remove();
      }

      // Ambil / update title dari <h1> pertama
      const firstH1 = doc.querySelector("h1");
      const title =
        firstH1?.textContent?.trim() || article.title || "Artikel Tanpa Judul";

      if (firstH1) {
        firstH1.remove();
      }

      // Ambil / update tags dari paragraf yang mengandung "Tags:"
      let tags: string[] = article.tags || [];
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
        // author tidak diubah saat edit (pakai author lama di backend saja)
      };

      const res = await fetch(`/api/article/${article._id}`, {
        method: "PUT", // <--- beda dari create yg pakai POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        console.error("Gagal update artikel:", error);
        toast.error(error.message || "Gagal update artikel", {
          duration: 3000,
        });
        return;
      }

      toast.success("Artikel berhasil diupdate!");

      // Optional: redirect balik ke list artikel
      // router.push("/admin/articles");
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat update artikel.", {
        duration: 3000,
      });
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen p-4 flex items-center justify-center">
        Memuat artikel...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="w-full min-h-screen p-4 flex items-center justify-center">
        Artikel tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4 flex flex-col gap-4">
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={handleUpdate}
          disabled={isPublishing || !contentHtml.trim()}
          className="rounded-lg px-4 py-2 text-sm font-medium text-white bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPublishing ? "Menyimpan..." : "Update Artikel"}
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
