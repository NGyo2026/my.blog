import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export const formatDate = (date: Date): string => {
	return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' }).format(date);
};

export const formatMonth = (date: Date): string => {
	return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long' }).format(date);
};

export const getMonthKey = (date: Date): string => {
	const month = String(date.getMonth() + 1).padStart(2, '0');
	return `${date.getFullYear()}-${month}`;
};

export const sortPostsByDate = (posts: BlogPost[]): BlogPost[] => {
	return [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};

export const getCounts = (items: string[]): Record<string, number> => {
	return items.reduce((acc, item) => {
		acc[item] = (acc[item] ?? 0) + 1;
		return acc;
	}, {} as Record<string, number>);
};

export const getTagCounts = (posts: BlogPost[]): Record<string, number> => {
	const tags = posts.flatMap((post) => post.data.tags ?? []);
	return getCounts(tags);
};

export const getCategoryCounts = (posts: BlogPost[]): Record<string, number> => {
	const categories = posts.flatMap((post) => post.data.categories ?? []);
	return getCounts(categories);
};
