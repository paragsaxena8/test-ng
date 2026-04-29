import { practiceSections } from '../../components/practice-registry';

export const data = {
	user: {
		name: 'Practice Workspace',
		email: 'components@test-ng.local',
		avatar: '/assets/avatar.png',
	},
	navMain: practiceSections.map((section, sectionIndex) => ({
		title: section.title,
		url: section.items[0] ? `/${section.items[0].path}` : '/',
		icon: section.icon,
		isActive: sectionIndex === 0,
		...(section.items.length > 1
			? {
				items: section.items.map((item) => ({
					title: item.title,
					url: `/${item.path}`,
				})),
			}
			: {}),
	})),
};
