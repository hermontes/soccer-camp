// "use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";


// export async function getStaticProps(params) {
//   const response = await fetch("https://api.github.com/repos/vercel/next.js");
//   const res = await response.json();

//   return { props: { res } };
// }

export default function Page() {
  const routerParams = useSearchParams();
  const postName = routerParams.get("postName");

  return (
    <div>
      <Link href="/blog">
        <button className="cursor-grab my-[2rem]">Go Back</button>
      </Link>

      <h1>Hello, Blog Post Page! </h1>
      <p>The passed in query is: {postName}</p>
      <p>The api response: {res.full_name}</p>

    </div>
  );
}
