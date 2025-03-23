import Footer from "@/components/ui/Footer";
import PostIndex from "./post/page";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <header>
        <Navbar />
      </header>
      <main>
        <PostIndex />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
