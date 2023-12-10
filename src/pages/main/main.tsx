import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { PostGet } from "./post";

export interface PostMain {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}
export const Main = () => {
  const [postList, sePostList] = useState<PostMain[] | null>(null);

  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    sePostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PostMain[]);
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      {postList?.map((post) => (
        <PostGet post={post} />
      ))}
    </div>
  );
};
