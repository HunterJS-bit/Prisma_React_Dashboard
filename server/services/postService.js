

const fetchPost = async (parent, args, ctx, info) => {
	const { id } = args;
    const post = await ctx.prisma.post({ id });
    return post;
}


const removePost = async (parent, args, ctx, info) => {
	const { id } = args;
    return await ctx.prisma.deletePost({ id });
}	

module.exports = {
	fetchPost
}