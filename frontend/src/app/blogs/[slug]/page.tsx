import { notFound } from "next/navigation";

async function getPost(slug: string) {
    let res = await fetch(`http://localhost:8000/api/v1/blogs/${slug}`)
    console.log("get_post")
    let post = await res.json()
    if (!post) notFound()
    return post
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    let post = await getPost(params.slug)

    return {
        title: post.meta_title,
        description: post.meta_description,
        keyword: post.meta_keyword,
    }
}


const BlogDetail = async ({ params }: any) => {
    // let post = await getPost(params.slug)
    // console.log("detail", post)
    // return (
    //     <div>
    //         <h1>{post.title}</h1>
    //         <p>{post.content}</p>
    //     </div>
    // );
    return (
        <div className={"container"}>
            <div className={""}></div>
        </div>
    )
};

// export async function getServerSideProps({params}) {
//     console.log(params)
//     const res = await fetch(`http://localhost:8000/api/v1/blogs/${params.slug}`);
//     const post = await res.json();
//
//     return {
//         props: {
//             post,
//         },
//     };
// }

export default BlogDetail;