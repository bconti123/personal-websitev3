"use client";

import * as React from "react";
import { S3Uploader } from "./S3Uploader";

type S3ImageFieldProps = {
  name: string;
  label: string;
  currentUrl?: string | null;
  hint?: string;
  accept?: string;
  objectKey?: string;
  getObjectKey?: (file: File) => string;
};

function S3ImageField({
  name,
  label,
  currentUrl,
  hint,
  accept = "image/*",
  objectKey,
  getObjectKey,
}: S3ImageFieldProps) {
  const [value, setValue] = React.useState(currentUrl ?? "");

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-4">
        <span className="label">{label}</span>
        {value ? (
          <a
            className="text-sm font-medium text-slate-600 underline-offset-4 hover:text-slate-900"
            href={value}
            target="_blank"
            rel="noreferrer"
          >
            Open image
          </a>
        ) : null}
      </div>

      <input type="hidden" name={name} value={value} />

      <div className="flex flex-wrap items-center gap-4">
        <S3Uploader
          label={value ? "Replace image" : "Upload image"}
          accept={accept}
          objectKey={objectKey}
          getObjectKey={getObjectKey}
          onUploaded={(result) => setValue(result.publicUrl)}
        />
        <span className="text-xs text-slate-500">
          {value ? "Image will be saved on submit." : "No image yet."}
        </span>
      </div>

      {value ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <img src={value} alt="Upload preview" className="h-48 w-full object-cover" />
        </div>
      ) : null}

      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

export { S3ImageField };
