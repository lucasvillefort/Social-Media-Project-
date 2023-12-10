import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface CreateFormDate {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    title: yup.string().required("you must add a title"),
    description: yup.string().required("you must add a description"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormDate>({
    resolver: yupResolver(schema),
  });
  const postsRef = collection(db, "posts"); // you will put here db name and which colletion that you created will be used
  const onCreatePost = async (data: CreateFormDate) => {
    await addDoc(postsRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userId: user?.uid,
    });
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="Title..." {...register("title")} />

      {errors.title && <p style={{ color: "red" }}>{errors.title?.message}</p>}

      <textarea placeholder="Description..." {...register("description")} />
      {errors.description && <p style={{ color: "red" }}>{errors.description?.message}</p>}

      <input type="submit" className="submitForm" />
    </form>
  );
};
