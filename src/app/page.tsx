import { useSession, signIn } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import SignInButton from "@/components/sign-in-button";

const signOutPageCode = `"use client";
import React, { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SignOutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "/" });
  }, []);
  return <p>Signing out...</p>;
}
`;

const signOutWithTimeoutPageCode = `"use client";
import React, { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SignOutWithTimeoutPage() {
  useEffect(() => {
    setTimeout(() => {
      signOut({ callbackUrl: "/" });
    }, 1500);
  }, []);
  return <p>Signing out with timeout...</p>;
}
`;

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <>
        <h1>It appears you are signed out</h1>
        <p>Reload this page to make sure you are actually not signed in</p>
        <br />
        <br />
        <SignInButton />
      </>
    );
  }

  return (
    <>
      <h1>Welcome {session!.user.name}!</h1>
      <p>
        <strong>Email:</strong> {session!.user.email}
      </p>

      <div>
        <br />
        <p>
          NextAuth bug: When visiting the sign-out page the application appears
          to be signed out. <br />
          However, if you reload the page it becomes apparent that the user is
          still signed in.
        </p>
        <pre
          style={{
            backgroundColor: "#f4f4f4",
          }}
        >
          <code>{signOutPageCode}</code>
        </pre>
        <a href="/sign-out" target="_blank">
          /sign-out
        </a>
        <br />

        <br />
        <p>
          This is a workaround for this bug: Wrapping the <code>signOut()</code>{" "}
          function in a <code>setTimeout</code> function.
        </p>
        <pre
          style={{
            backgroundColor: "#f4f4f4",
          }}
        >
          <code>{signOutWithTimeoutPageCode}</code>
        </pre>
        <a href="/sign-out/with-timeout" target="_blank">
          /sign-out/with-timeout
        </a>
      </div>
    </>
  );
}
