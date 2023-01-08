import TeamArticles, { TeamArticleMember } from '../../types/inline-mode/team-article.type';
import TeamList from '../../types/inline-mode/team-list.type';

function getTeamList(teamList: TeamList): TeamArticles {
	const users = teamList.reduce((res, el, index) => {
		const user: TeamArticleMember = {
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
	}, [] as Partial<TeamArticles>);

	return users as TeamArticles;
}

export default getTeamList;
