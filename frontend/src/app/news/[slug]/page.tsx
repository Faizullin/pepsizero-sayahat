import { notFound } from "next/navigation";

async function getNews(slug: string) {
    let res = await fetch(`http://localhost:8000/api/v1/news/${slug}`)
    let news_item = await res.json()
    if (!news_item) notFound()
    return news_item
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    let news_item = await getNews(params.slug)

    return {
        title: news_item.meta_title,
        description: news_item.meta_description,
        keyword: news_item.meta_keyword,
    }
}


const NewsDetail = async ({ params }: any) => {
    let news_item = await getNews(params.slug)
    return (
        <div>
            <h1>{news_item.title}</h1>
            <p>{news_item.content}</p>
        </div>
    );
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

export default NewsDetail;