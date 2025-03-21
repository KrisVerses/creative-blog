import Image from "next/image";
import PostIndex from "./post/page";

export default function Home() {
  return (
    <div>
      <header>
        <h1>Header</h1>
      </header>
      <main>
        <PostIndex />
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}
