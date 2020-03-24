

const fetchPost = async (parent, args, ctx, info) => {
	const { id } = args;
    const post = await ctx.prisma.post({ id });
    return post;
}

const updatePost =  async (parent, args, ctx, info) => {
    const { id, input } = args;
    Object.keys(input).forEach((key) => (input[key]) ? input.key : delete input[key]);
    if (input.author) {
        input.author = { connect: { id: input.author } };
    }
    return ctx.prisma.updatePost({
        data: input,
        where: {
            id,
        }
    })
};

const removePost = async (parent, args, ctx, info) => {
	const { id } = args;
    return ctx.prisma.deletePost({id});
};


const postComment = async (parent, args, ctx, info) => {
    const { comment, author, postId } = args.input;
    return ctx.prisma.createComment(
        { author,
            content: comment,
            post: {
                connect: { id: postId }
            }
        });
}

module.exports = {
	fetchPost
};
