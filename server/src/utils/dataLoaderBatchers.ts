import prisma from "./prisma";

export const userBatchLoader = (keys: readonly string[]) =>
	prisma.user.findMany({
		where: {
			id: {
				in: keys as string[],
			},
		},
	});
