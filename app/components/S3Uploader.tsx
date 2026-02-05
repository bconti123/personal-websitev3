"use client";

import * as React from "react";
import { uploadFileToS3 } from "@/lib/s3-upload";

type S3UploaderProps = {
  label?: string;
  folder?: string;
  accept?: string;
  onUploaded?: (result: { key: string; publicUrl: string }) => void;
};

function S3Uploader({
  label = "Upload",
  folder = "uploads",
  accept = "image/*",
  onUploaded,
}: S3UploaderProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [lastUrl, setLastUrl] = React.useState<string | null>(null);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const result = await uploadFileToS3(file, { folder });
      setLastUrl(result.publicUrl);
      onUploaded?.({ key: result.key, publicUrl: result.publicUrl });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50">
        {isUploading ? "Uploading..." : label}
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
          disabled={isUploading}
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {lastUrl ? (
        <p className="text-sm text-slate-600">
          Uploaded: <span className="break-all">{lastUrl}</span>
        </p>
      ) : null}
    </div>
  );
}

export { S3Uploader };
