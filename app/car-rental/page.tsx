import { notFound } from 'next/navigation'

async function BlogPostPage() {


    if (process.env.ISACTIVE !== 'true') {
        return (
            <h1>Not Found</h1>
        )
    }

    return (
        true
    )
}

export default BlogPostPage