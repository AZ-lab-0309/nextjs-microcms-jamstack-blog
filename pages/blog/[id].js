import Link from "next/link";
import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";

//SSG
export const getStaticProps = async (context)=>{
    const id = context.params.id;
    const data = await client.get({endpoint: "blog", contentId: id});
    
    return {
        props:{
            blog: data,//既にcontentIdで配列として固有のidを取得しているから.contentsをつけなくても良い
        },
    };
};

export const getStaticPaths = async () => {
    const data = await client.get({endpoint: "blog"});

    const paths = data.contents.map((content) => `/blog/${content.id}`);
    return {
        paths,
        fallback: false,
    };
};

export default function BlogId({ blog }){
    return(
        <main className={styles.main}>
            <h1 className={styles.title}>{blog.title}</h1>
            <p className={styles.publishedAt}>{blog.publishedAt}</p>
            <div dangerouslySetInnerHTML={{__html: blog.body}} className={styles.post}></div>
            {/* dangerouslySetInnerHTMLはJavascriptを入れ込まれて脆弱になる可能性がある */}
            <Link href={"../"}>→ホームへ戻る</Link>
        </main>
    );
}
