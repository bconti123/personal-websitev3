"use client";

import { signIn } from "next-auth/react";

export default function AdminLogin() {
  async function onSubmit(formData: FormData) {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: "/admin",
    });
  }

  return (
    <form action={onSubmit} style={{ padding: 32 }}>
      <h1>Admin Login</h1>

      <input name="email" type="email" placeholder="Email" required />
      <br />
      <input name="password" type="password" placeholder="Password" required />
      <br />
      <button type="submit">Sign in</button>
    </form>
  );
}
