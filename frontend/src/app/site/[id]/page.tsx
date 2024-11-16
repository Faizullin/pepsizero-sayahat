import { notFound } from "next/navigation";

async function getSiteDetail(id: string) {
    let res = await fetch(`http://localhost:8000/api/v1/site-document/${id}`)
    let response = await res.json();
    console.log(response);
    if (!response) {
        return notFound();
    }
    else if(response?.type === 'client_error') {
        console.log("r", response)
        if(response?.errors?.length === 1 && response.errors[0].code === 'not_found') {
            return notFound();
        }
    }
    return response
}

export async function generateMetadata({params}: { params: { id: string } }) {
    let post = await getSiteDetail(params.id)

    return {
        title: post.meta_title,
        description: post.meta_description,
        keyword: post.meta_keyword,
    }
}

const Site = async ({ params }: any) => {
    let siteData = await getSiteDetail(params.id)
    return (
        <div dangerouslySetInnerHTML={{ __html: siteData.html }} />
    );
};

export default Site;