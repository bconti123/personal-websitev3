import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

type UploadUrlRequest = {
  filename?: string;
  contentType?: string;
  folder?: string;
  key?: string;
};

const region = process.env.AWS_REGION;
const bucket = process.env.AWS_S3_BUCKET;

function getS3Client() {
  if (!region || !bucket) {
    throw new Error("Missing AWS_REGION or AWS_S3_BUCKET environment variables");
  }

  return new S3Client({
    region,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function sanitizeKey(key: string) {
  return key
    .replace(/\\/g, "/")
    .replace(/[^a-zA-Z0-9/_-]/g, "_")
    .replace(/^\/+/, "");
}

function buildPublicUrl(key: string) {
  const baseUrl = process.env.NEXT_PUBLIC_S3_PUBLIC_BASE_URL;
  if (baseUrl) {
    return `${baseUrl.replace(/\/$/, "")}\/${key}`;
  }

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UploadUrlRequest;

    const filename = body.filename?.trim();
    const contentType = body.contentType?.trim() || "application/octet-stream";
    const folder = body.folder?.trim() || "uploads";
    const providedKey = body.key?.trim();

    if (!filename && !providedKey) {
      return NextResponse.json(
        { error: "filename or key is required" },
        { status: 400 }
      );
    }

    const key = providedKey
      ? sanitizeKey(providedKey)
      : `${folder}/${Date.now()}-${randomUUID()}-${sanitizeFilename(
          filename || "upload"
        )}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(getS3Client(), command, {
      expiresIn: 60,
    });

    return NextResponse.json({
      key,
      signedUrl,
      publicUrl: buildPublicUrl(key),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
