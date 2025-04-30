import Image from "next/image";
import Link from "next/link";

function Header({ title }) {
  return <h1>{title}</h1>;
}

function Blogs() {
  const blogs = [
    { name: "Ada Lovelace", title: "ada-lovelace" },
    { name: "Grace Hopper", title: "grace-hopper" },
    { name: "Margaret Hamilton", title: "margaret-hamilton" },
  ];

  return (
    <div>
      <Header title="Blog!" />
      <ul>
        {blogs.map((blog, key) => (
          <li key={key}>
            <Link
              className="underline bg-amber-600"
              href={{
                pathname: `/blog/[slug]}`,
                query: { postName: blog.name },
              }}
            >

              Show me the title of this blog: {blog.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <Blogs></Blogs>
    </div>
  );
}
