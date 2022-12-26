import { Creators } from '../../types/inline-query.type';

function team(team: Creators) {
	const users = team.reduce((res, el, index) => {
		const user = {
			type: 'article',
			id: String(index),
			document_file_id: String(index),
			title: `${el.name} ${el.last_name}`,
			description: `${el.mission}`,
			input_message_content: {
				message_text: `GitHub of ${el.username_TG} is <a href="https://github.com/${el.username_GH}">here</a>.`,
				parse_mode: 'HTML',
			},
			url: `t.me/${el.username_TG}`,
			thumb_url: `https://avatars.githubusercontent.com/u/${el.photoId_GH}?s=400&v=4`,
			thumb_width: 500,
			thumb_height: 500,
		};

		return [...res, ...[user]];
	}, [] as object[]);

	return users;
}

export default team;
