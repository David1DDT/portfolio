import { notFound } from 'next/navigation'

async function BlogPostPage() {


    if (process.env.ISACTIVE !== 'true') {
        return notFound()
    }

    return (
        true
    )
}

export default BlogPostPage