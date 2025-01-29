import Link from "next/link";
import Image from 'next/image';
import { getImageFullUrl_client } from "@/lib/getImgFullUrl";

const BlogPost = ({ post }) => {
  return (
    <div className="md:col-span-4 col-span-12">
      <Link href={`/blog${post.slug}`}>
        <Image className="object-cover border-2 border-white-100" src={getImageFullUrl_client(post.image.data)} quality={100} alt="blog post" width={0} height={0} sizes='100vw' style={{ width: '100%', maxHeight: '220px' }} />
        <h3 className="font-rufina text-3xl text-left pt-5">{post.title}</h3>
        <p>Read more</p>
      </Link>
    </div>
  );
};

const ReadBlog = ({ blogPosts }) => {
  
  return (
    <div className="bg-[#07000E]">
      <div className="container pb-[108px] text-white-100">
        <div className="flex flex-col">
          <div className="grid grid-cols-12">
            <div className="col-span-12 text-left md:mt-160 mt-72 md:mb-88 mb-40">
              <h1 className="font-rufina sm:text-6xl text-4xl sm:leading-4xl leading-3xl">
                Read Our Blog
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-12 md:mb-80 mb-40 md:gap-10 gap-y-10">
            {blogPosts.map(((post, index) => (
              <BlogPost post={post.attributes} key={index} />
            )))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadBlog;