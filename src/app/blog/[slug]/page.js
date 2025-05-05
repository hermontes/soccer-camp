
import Link from "next/link";


export default async function BlogPost({params}) {

  const {slug} = params; //param is same as folder name
  const response = await fetch("http://localhost:3001/getContent");
  const res = await response.json()
  
  return (
    <div>
      {/*  */}
      <Link href="/blog">
        <button className="underline cursor-grab my-[2rem]">Go Back</button>
      </Link>

      <h1>Hello, Blog Post Page! </h1>
      <p>The passed in query is: {slug}</p>

      <p>From API I got response: Blog title:{res.title}</p>

    </div>
  );
}
