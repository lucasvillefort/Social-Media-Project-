import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { PostMain } from "./main";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: PostMain;
}

interface Like {
  likeId: string;
  userId: string;
}

export const PostGet = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [like, setLike] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes"); // you will put here db name and which colletion that you created will be used
  const likesDoc = query(likesRef, where("postId", "==", post.id)); // it will search for all like ofr this post

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLike(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
  };

  const addLikes = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLike((prev) => (prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }]));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeLikes = async () => {
    try {
      const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid)); // it will search for all like ofr this post

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);

      await deleteDoc(likeToDelete);
      if (user) {
        setLike((prev) => prev && prev.filter((like) => like.likeId !== likeId));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const hasUserLiked = like?.find((like) => like.userId === user?.uid); // it looking for user that already had liked this post
  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
        <button onClick={hasUserLiked ? removeLikes : addLikes}> {hasUserLiked ? <> &#128078;</> : <>&#128077;</>}</button>
        {like && <p>Likes:{like.length}</p>}
      </div>
    </div>
  );
};
