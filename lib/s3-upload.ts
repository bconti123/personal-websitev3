export type SignedUpload = {
  key: string;
  signedUrl: string;
  publicUrl: string;
};

type UploadRequest = {
  filename: string;
  contentType: string;
  folder?: string;
};

export async function getSignedUploadUrl(
  body: UploadRequest
): Promise<SignedUpload> {
  const response = await fetch("/api/s3/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || "Failed to create upload URL");
  }

  return (await response.json()) as SignedUpload;
}

export async function uploadFileToS3(
  file: File,
  options: { folder?: string } = {}
) {
  const signed = await getSignedUploadUrl({
    filename: file.name,
    contentType: file.type || "application/octet-stream",
    folder: options.folder,
  });

  const putResponse = await fetch(signed.signedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });

  if (!putResponse.ok) {
    throw new Error("Upload to S3 failed");
  }

  return signed;
}
