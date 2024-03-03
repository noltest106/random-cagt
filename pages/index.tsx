import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

type Props = {
  initialImageUrl: string;
};

const IndexPage: NextPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImage().then((newImage) => {
      setImageUrl(newImage.url);
      setLoading(false);
    });
  }, []);

  // ボタンクリック時の画像読み込み処理
  const handClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };
  return (
    <div className={styles.page}>
      <button onClick={handClick}>
        他のにゃんこも見る
      </button>
      <div className={styles.frame}>
        {loading || <img src={imageUrl} className={styles.img}/>}
      </div>
    </div>
  );
};
export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

type Image = {
  url: string;
}

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
