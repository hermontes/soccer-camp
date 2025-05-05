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
    <>
      <Header title="Blog!" />
      <ul>
        {blogs.map((blog, key) => (
          <li key={key}>
            <Link className="underline bg-amber-600" href={`/blog/${blog.title}`}>
              Show me the title of this blog: {blog.name}
            </Link>
          </li>
        ))}
      </ul>
      </>
  );
}

export default function Page() {
  return (
    <div>
      <Blogs></Blogs>
    </div>
  );
}
